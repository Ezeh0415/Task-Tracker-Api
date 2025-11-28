const valid_api_key = "coded-by-ezeh-godwin";

const Require_Api_key = (req, res, next) => {
  const apikey = req.query.key || req.body.key || req.headers["x-api-key"];

  if (!apikey) {
    return res.status(401).json({
      error: "API key is required",
      message: "Add API key in query or body or header",
    });
  }

  if (apikey !== valid_api_key) {
    return res.status(401).json({
      error: "Invalid API key",
      message: "Add valid API key in query or body or header",
    });
  }
  next();
};

module.exports =  Require_Api_key ;
