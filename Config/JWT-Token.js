const jwt = require("jsonwebtoken");

function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email }, // payload
    process.env.JWT_SECRET_KEY, // secret key from .env
    { expiresIn: "1d" } // token lifetime
  );
}

module.exports = generateToken;
