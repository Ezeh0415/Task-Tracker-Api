# Task-Tracker-Api

trying to create a task tracker api wit the functionality of create update delete and progress status

📌 Task Management API

A simple REST API built with Node.js, Express, and PostgreSQL for creating, updating, and deleting tasks.
All routes are protected using an API Key middleware, ensuring only authorized clients can access the API.

🚀 Features

Create Tasks

Update Task Priority

Update Task Status

Mark Tasks as Completed

Delete Tasks

API Key Middleware Protection

Organized MVC-style structure (Controllers + Routes)

📂 Project Structure
/project
│
├── Config/
│ └── Api-key.js # API key authentication middleware
│
├── Contr/
│ ├── CreateTask.js # Handles creating tasks
│ ├── UpdateTask.js # Handles updating tasks
│ └── DeleteTask.js # Handles deleting tasks
│
├── Routes/
│ └── TaskRoute.js # All task-related endpoints
│
└── app.js # Main Express server

🔒 API Key Authentication

Every route uses the API key middleware:

router.post("/create", APIKEY, CreateTask.AddTask);

The client must send the API key in request headers:

api-key: "coded-by-ezeh-godwin"

If the key is missing or invalid, the request is rejected.

📡 API Endpoints
➕ Create a Task

POST /task/create

Request Headers
api-key: YOUR_API_KEY

Body (JSON)
{
"title": "Finish project",
"description": "Work on task manager API",
"due_date": "2025-02-20",
"priority": "High",
"status": "Pending"
}

🔧 Update Task Priority

PUT /task/update/priority/:id

Example
PUT /task/update/priority/5

Body
{
"priority": "Medium"
}

🔧 Update Task Status

PUT /task/update/status/:id

Example
PUT /task/update/status/5

Body
{
"status": "In Progress"
}

✔️ Mark Task as Completed

PUT /task/update/completed/:id

Example
PUT /task/update/completed/5

Body
{
"completed": true
}

🗑️ Delete a Task

DELETE /task/delete/:id

Example
DELETE /task/delete/5

📝 How It Works

The router defines all task endpoints.

Before each controller runs, the APIKEY middleware validates the incoming API key.

Controllers perform database operations (create/update/delete tasks).

Responses are returned in JSON format.

This setup keeps your API modular, secure, and easy to expand.
