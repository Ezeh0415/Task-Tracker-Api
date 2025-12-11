const db = require("../Config/DataBase");
const Tasks = require("../Model/TasksSchema");

const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Id is required" });
  }

  try {
    await db.delete(Tasks).where(eq(Tasks.id, id));
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { deleteTask };
