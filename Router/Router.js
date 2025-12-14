const router = require("express").Router();
const Require_Api_key = require("../Middleware/Api-key");
const Require_jwt_key = require("../Middleware/JWT-key");
const AuthSignup = require("../Auth/Signup");
const AuthLogin = require("../Auth/Login");
const CreateTask = require("../Contr/CreateTask");
const UpdateTask = require("../Contr/UpdateTask");
const DeleteTask = require("../Contr/DeleteTask");
const Payment = require("../Contr/Payment/Payment");
const Webhook = require("../Contr/Payment/Webhook");

router.post("/signup", Require_Api_key, AuthSignup.SignUp);
router.post("/login", Require_Api_key, AuthLogin.Login);

router.post("/create", Require_Api_key, CreateTask.AddTask);

router.put(
  "/update/priority/:id",
  Require_Api_key,
  Require_jwt_key,
  UpdateTask.updatePriority
);
router.put(
  "/update/status/:id",
  Require_Api_key,
  Require_jwt_key,
  UpdateTask.updateStatus
);
router.put(
  "/update/completed/:id",
  Require_Api_key,
  Require_jwt_key,
  UpdateTask.taskCompleted
);

router.delete(
  "/delete/:id",
  Require_Api_key,
  Require_jwt_key,
  DeleteTask.deleteTask
);

// payment routes
router.post("/payment", Require_Api_key, Require_jwt_key, Payment.Payment);

router.post("/webhook/paystack", Webhook.Webhook);

module.exports = router;
