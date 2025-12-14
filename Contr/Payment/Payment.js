// ACCEPT PAYMENT SECTION

const https = require("https");
const db = require("../../Config/DataBase");
const Payment = (req, res) => {
  const { email, amount } = req.body;

  if (!email || !amount) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const amountInKobo = amount * 100;

  const params = JSON.stringify({ email, amount: amountInKobo });

  const options = {
    hostname: "api.paystack.co",
    path: "/transaction/initialize",
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  };

  const paystackReq = https.request(options, (paystackRes) => {
    let data = "";

    paystackRes.on("data", (chunk) => {
      data += chunk;
    });

    paystackRes.on("end", async () => {
      try {
        const response = JSON.parse(data);
        const { status, message, data: payResponse } = response;
        if (!status) {
          return res.status(400).json({
            success: false,
            error: message || "Payment initialization failed",
          });
        }

        console.log(req.user);

        const id = req.user.id;

        console.log(id);

        // await db.insert(payment).values({

        // });

        return res.json(payResponse);
      } catch (err) {
        return res.status(500).json({ error: "Invalid JSON from Paystack" });
      }
    });
  });

  paystackReq.on("error", (error) => {
    console.error(error);
    return res.status(500).json({ error: "Request failed", details: error });
  });

  paystackReq.write(params);
  paystackReq.end();
};

module.exports = { Payment };
