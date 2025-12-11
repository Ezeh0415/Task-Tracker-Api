require("dotenv").config();
const express = require("express");
const Router = require("./Router/Router");
const morgan = require("morgan");

const app = express();

app.use(express.json({ limit: "70mb" }));
app.use(morgan("dev"));

// Handle preflight OPTIONS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(Router);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
