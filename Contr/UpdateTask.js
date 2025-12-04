const { eq } = require("drizzle-orm");
const db = require("../Config/DataBase");
const sanitizeHtml = require("sanitize-html");

const updatePriority = async (req, res) => {
  const { id } = req.params;
  const { priority } = req.body;

  if (!id || !priority) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  if (priority !== "high" && priority !== "medium" && priority !== "low") {
    res.status(400).json({
      error: "Invalid priority value. Allowed values: high, medium, low",
    });
  }

  try {
    await db
      .update(tasks)
      .set({ priority: sanitizeHtml(priority) })
      .where(eq(tasks.id, id));

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
    await db
      .update(tasks)
      .set({ status: sanitizeHtml(status) })
      .where(eq(tasks.id, id));

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
    await db.update(tasks).set({ status: "completed" }).where(eq(tasks.id, id));

    return res.status(200).json({ message: "Task completed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { updatePriority, updateStatus, taskCompleted };
