const db = require("../Config/DataBase");
const generateToken = require("../Middleware/JWT-Token");
const { eq } = require("drizzle-orm");
const Users = require("../Model/UsersSchema");
const bcrypt = require("bcrypt");

const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and Password are required" });
  }

  try {
    const users = await db.select().from(Users).where(eq(Users.email, email));
    const user = users[0];
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found, please sign up" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    console.log(user);

    const token = generateToken(user);

    res.status(200).json({
      message: "User login successfully",
      data: { id: user.id, name: user.name, email: user.email },
      token: token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { Login };
