API Documentation - Task Management System

Base URL: `http://localhost:5000/api`

1. Authentication

Register a new user
URL:`/auth/register`
Method: `POST`
Auth Required:No
Body:
  json
  {
      "name": "User Name",
      "email": "user@example.com",
      "password": "password123",
      "role": "ADMIN" // Roles: ADMIN, PM, MEMBER
  }


// Login
URL: /auth/login

Method: POST

Auth Required: No

Body:
{
    "email": "user@example.com",
    "password": "password123"
}

Response: Returns a JWT Token.

2. Projects
Create a Project
URL: /projects

Method: POST

Auth Required: Yes (Bearer Token) - ADMIN or PM only
Body:
{
    "name": "Project Name",
    "description": "Project details"
}

Get All Projects
URL: /projects

Method: GET

Auth Required: Yes (Bearer Token)

3. Tasks
Create a Task
URL: /tasks

Method: POST

Auth Required: Yes (Bearer Token) - ADMIN or PM only

Body:
{
    "title": "Task Title",
    "description": "Task description",
    "project_id": 1,
    "assigned_to": 2
}

Get Tasks by Project ID
URL: /tasks/project/:projectId

Method: GET

Auth Required: Yes (Bearer Token)

Update Task Status
URL: /tasks/:taskId/status

Method: PUT

Auth Required: Yes (Bearer Token)

Body:
{
    "status": "IN_PROGRESS" // Statuses: TODO, IN_PROGRESS, DONE
}

