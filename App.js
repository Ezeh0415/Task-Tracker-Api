require("dotenv").config();
const express = require("express");
const Router = require("./Router/Router");
const morgan = require("morgan");
const ngrok = require('@ngrok/ngrok');

const app = express();

app.use(express.json({ limit: "70mb" }));
app.use(morgan("dev"));
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf; // Save raw request body
    },
  })
);

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

// Get your endpoint online
ngrok.connect({ addr: process.env.PORT, authtoken_from_env: true })
	.then(listener => console.log(`Ingress established at: ${listener.url()}`));

module.exports = app;
