const db = require("../Config/DataBase");
const sanitizeHtml = require("sanitize-html");

const AddTask = async (req, res) => {
  const { title, email, description, due_Date, priority, status } = req.body;

  if (!title || !email || !description || !due_Date || !priority || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const query = `INSERT INTO tasks (title,email, description, due_date, priority, status) VALUES ($1, $2, $3, $4, $5, $6)`;

    const values = [
      sanitizeHtml(title),
      sanitizeHtml(email),
      sanitizeHtml(description),
      due_Date,
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
