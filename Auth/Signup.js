const db = require("../Config/DataBase");
const sanitizeHtml = require("sanitize-html");
const bcrypt = require("bcrypt");
const generateToken = require("../Config/JWT-Token");
const { eq } = require("drizzle-orm");
const { UsersSchema } = require("../Model/Schema");
const saltRound = 10;

const SignUp = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Please fill in all fields" });
  }

  if (password < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters" });
  }

  const hashedpwd = bcrypt.hash(password, saltRound);

  try {

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser.email === email) {
      return res.status(400).json({ error: "user already exists" });
    }

    const inputs = {
      name: sanitizeHtml(name),
      email: sanitizeHtml(email),
      password: sanitizeHtml(hashedpwd),
    };

    await db.insert(UsersSchema).values(inputs);

    const user = await db.select().from(users).where(eq(users.email, email));

    const token = generateToken(user.email);

    res.status(200).json({
      message: "User created successfully",
      data: user,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { SignUp };
