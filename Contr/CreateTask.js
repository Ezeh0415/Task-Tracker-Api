const db = require("../Config/DataBase");
const sanitizeHtml = require("sanitize-html");

const AddTask = async (req, res) => {
  const { title, description, dueDate, priority, status } = req.body;

  if (!title || !description || !dueDate || !priority || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const query = `INSERT INTO tasks (title, description, due_date, priority, status) VALUES ($1, $2, $3, $4, $5)`;

    const values = [
      sanitizeHtml(title),
      sanitizeHtml(description),
      dueDate,
      sanitizeHtml(priority),
      sanitizeHtml(status),
    ];

    await db.query(query, values);
    db.end();
    return res.status(201).json({ message: "Task added successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error adding task" });
  }
};

module.exports = { AddTask };
