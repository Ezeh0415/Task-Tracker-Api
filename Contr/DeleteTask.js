const db = require("../Config/DataBase");

const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Id is required" });
  }

  try {
    const query = `DELETE FROM tasks WHERE id = ? VALUES ($1)`;

    const values = [id];

    await db.query(query, values);
    db.end();
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { deleteTask };
