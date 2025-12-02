📝 Task Manager API – Frontend Integration Guide

This document explains how frontend developers can interact with the Task Manager backend API.
All endpoints below require specific headers and, in some cases, authentication tokens.

🔑 Required Headers

1. API Key (Required for all routes) ("coded-by-ezeh-godwin")

Every request must include the API key:

x-api-key: YOUR_API_KEY

2. JWT Token (Required for protected routes)

For routes that modify tasks, include the JWT token returned after login:

Authorization: Bearer <your_jwt_token>

📌 Base URL

Replace with your backend server URL:

project Url http:localhost8080

📚 Routes Overview
1️⃣ User Authentication
Signup

POST /signup
Create a new user account.

Request Body:
{
"username": "example",
"email": "user@example.com",
"password": "password123"
}

Headers:

x-api-key

Login

POST /login
Login and receive a JWT token.

Request Body:
{
"email": "user@example.com",
"password": "password123"
}

Response:
{
"token": "YOUR_JWT_TOKEN",
"user": { ... }
}

Headers:

x-api-key

2️⃣ Task Management Routes

All task routes require:

x-api-key

Authorization: Bearer <token>

Create a Task

POST /create

Request Body:
{
"title": "Buy groceries",
"description": "Milk, eggs, bread",
"priority": "high"
}

Update Task Priority

PUT /update/priority/:id

Request Body:
{
"priority": "low"
}

Update Task Status

PUT /update/status/:id

Request Body:
{
"status": "in-progress"
}

Mark Task as Completed

PUT /update/completed/:id

No body required (unless your backend expects one).

Delete a Task

DELETE /delete/:id

Deletes a task by its ID.

🧭 Example Frontend Usage (Fetch)
Create Task Example
await fetch("/api/create", {
method: "POST",
headers: {
"Content-Type": "application/json",
"x-api-key": process.env.API_KEY,
Authorization: `Bearer ${userToken}`,
},
body: JSON.stringify({
title: "New Task",
description: "Details...",
priority: "medium",
}),
});

📌 Notes for Frontend Developers

Always store JWT tokens securely (ex: localStorage or secure cookie depending on app security level).

Every request must include x-api-key, even public ones like login/signup.

Task modification routes will fail without a valid JWT token.

Handle 401 and 403 responses to force user logout if token expires.

API Key and JWT Token are not interchangeable.
