require('dotenv').config(); // make sure to load env variables

const Require_Api_key = (req, res, next) => {
  const apiKey = req.query.key || req.body.key || req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({
      error: "API key is required",
      message: "Add API key in query, body, or header",
    });
  }

  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({
      error: "Invalid API key",
      message: "Add a valid API key to access this route",
    });
  }

  // If key is valid, proceed
  next();
};

module.exports = Require_Api_key;
