const jwt = require("jsonwebtoken");

const Require_jwt_key = async (req, res, next) => {
  const authHeader = req.headers.authorization; // always lowercase in Express
  if (!authHeader) {
    return res.status(401).json({
      message: "Authorization header is missing",
    });
  }

  // Expected format: "Bearer <token>"
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Authorization token is missing",
    });
  }

  // You may want to verify token later
  const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

  if (!decoded) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  req.user = decoded; // optional: pass token along for controllers

  next();
};

module.exports = Require_jwt_key;
