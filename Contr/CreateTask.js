const db = require("../Config/DataBase");
const sanitizeHtml = require("sanitize-html");
const Tasks = require("../Model/TasksSchema");


const AddTask = async (req, res) => {
  const { title, email, description, due_Date, priority, status } = req.body;

  if (!title || !email || !description || !due_Date || !priority || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await db.insert(Tasks).values({
      title: sanitizeHtml(title),
      email: sanitizeHtml(email),
      description: sanitizeHtml(description),
      due_date: sanitizeHtml(due_Date),
      priority: sanitizeHtml(priority),
      status: sanitizeHtml(status),
    });
    return res.status(201).json({ message: "Task added successfully" });
  } catch (error) {
    return res.status(500).json({ error: error, message: "Error adding task" });
  }
};

module.exports = { AddTask };
