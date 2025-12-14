const crypto = require("crypto");

const Webhook = (req, res) => {
  // Compute hash from raw body
  //   const hash = crypto
  //     .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
  //     .update(req.rawBody)
  //     .digest("hex");

  //   // Verify signature
  //   if (hash !== req.headers["x-paystack-signature"]) {
  //     return res.status(401).send("Invalid signature");
  //   }

  //   const event = req.body;

  //   // Handle different event types
  //   switch (event.event) {
  //     case "charge.success":
  //       console.log("Payment successful:", event.data.reference);
  //       // TODO: Update DB, fulfill order, etc.
  //       break;

  //     case "transfer.success":
  //       console.log("Transfer successful:", event.data.id);
  //       // TODO: Update transfer status
  //       break;

  //     default:
  //       console.log("Unhandled event:", event.event);
  //   }

  //   res.sendStatus(200); // Acknowledge receipt

  const event = req.body;

  console.log(event);

  res.send(200);
};
module.exports = { Webhook };
