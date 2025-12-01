const db = require("../Config/DataBase");
const sanitizeHtml = require("sanitize-html");
const generateToken = require("../Config/JWT-Token");

const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and Password are required" });
  }

  try {
    const user = await db.query("SELECT * FROM users WHERE email = $1", [
      sanitizeHtml(email),
    ]);
    if (user.email !== email) {
      return res.status(400).json({ message: "user not found sign up" });
    }

    const isValidPassword = bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "User login successfully",
      data: user,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { Login };
