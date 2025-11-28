const db = require("../Config/DataBase");
const sanitizeHtml = require("sanitize-html");

const updatePriority = async (req, res) => {
  const { id } = req.params;
  const { priority } = req.body;

  if (!id || !priority) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  try {
    const query = `UPDATE tasks SET priority = ? WHERE id = ? VALUES ($1, $2)`;

    const values = [sanitizeHtml(priority), id];

    await db.query(query, values);
    db.end();

    return res.status(200).json({ message: "Priority updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!id || !status) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  try {
    const query = `UPDATE tasks SET status = ? WHERE id = ? VALUES ($1, $2)`;

    const values = [sanitizeHtml(status), id];

    await db.query(query, values);
    db.end();

    return res.status(200).json({ message: "Status updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const taskCompleted = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  try {
    const query = `UPDATE tasks SET status = 'completed' WHERE id = ?`;

    const values = [id];

    await db.query(query, values);
    db.end();

    return res.status(200).json({ message: "Task completed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { updatePriority, updateStatus, taskCompleted };
