const router = require("express").Router();
const Require_Api_key = require("../Config/Api-key");
const CreateTask = require("../Contr/CreateTask");
const UpdateTask = require("../Contr/UpdateTask");
const DeleteTask = require("../Contr/DeleteTask");

router.post("/create", Require_Api_key, CreateTask.AddTask);

router.put("/update/priority/:id", Require_Api_key, UpdateTask.updatePriority);
router.put("/update/status/:id", Require_Api_key, UpdateTask.updateStatus);
router.put("/update/completed/:id", Require_Api_key, UpdateTask.taskCompleted);

router.delete("/delete/:id", Require_Api_key, DeleteTask.deleteTask);

module.exports = router;
