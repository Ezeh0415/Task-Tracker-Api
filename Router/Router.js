const router = require("express").Router();
const Require_Api_key = require("../Config/Api-key");
const Require_jwt_key = require("../Config/JWT-key");
const AuthSignup = require("../Auth/Signup");
const AuthLogin = require("../Auth/Login");
const CreateTask = require("../Contr/CreateTask");
const UpdateTask = require("../Contr/UpdateTask");
const DeleteTask = require("../Contr/DeleteTask");

router.post("/signup", Require_Api_key, AuthSignup.SignUp);
router.post("/login", Require_Api_key, AuthLogin.Login);

router.post("/create", Require_Api_key, Require_jwt_key, CreateTask.AddTask);

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

module.exports = router;
