const router = require("express").Router();
const Require_Api_key = require("../Config/Api-key");
const AuthSignup = require("../Auth/Signup");
const AuthLogin = require("../Auth/Login");
const CreateTask = require("../Contr/CreateTask");
const UpdateTask = require("../Contr/UpdateTask");
const DeleteTask = require("../Contr/DeleteTask");

router.post("/signup", AuthSignup.SignUp);
router.post("/login", AuthLogin.Login);

router.post("/create", Require_Api_key, CreateTask.AddTask);

router.put("/update/priority/:id", Require_Api_key, UpdateTask.updatePriority);
router.put("/update/status/:id", Require_Api_key, UpdateTask.updateStatus);
router.put("/update/completed/:id", Require_Api_key, UpdateTask.taskCompleted);

router.delete("/delete/:id", Require_Api_key, DeleteTask.deleteTask);

module.exports = router;
