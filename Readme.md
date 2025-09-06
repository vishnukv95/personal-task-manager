# Task Manager (MERN)

A full-stack task manager application built using **MongoDB, Express.js, React, and Node.js**.  
Users can register, log in, and manage their tasks (add, edit, delete, mark complete).

---

## 🚀 Features
- User authentication (JWT + Cookies)
- Secure password hashing with bcrypt
- Add, edit, delete, and update tasks
- Protected routes (only logged-in users can access dashboard)
- Responsive design with Tailwind CSS
- Reusable components (Header, Footer, etc.)

---

##  Tech Stack
**Frontend:**
- React
- Axios
- React Router
- Tailwind CSS

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- JWT Authentication
- Cookie Parser

---

##  Project Structure


task-manager/
│
├── backend/
│ ├── controllers/ # Business logic
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API routes
│ ├── middlewares/ # Auth middleware
│ └── server.js # Entry point
│
├── frontend/
│ ├── src/
│ │ ├── components/ # Header, Footer etc.
│ │ ├── pages/ # Login, Register, Dashboard
│ │ └── App.jsx
│ └── package.json
│
└── README.md

## API Endpoints

# Auth

POST /api/auth/register → Register new user

POST /api/auth/login → Login user

GET /api/auth/profile → Get logged-in user

POST /api/auth/logout → Logout

# Tasks

GET /api/tasks → Get all tasks of logged-in user

POST /api/tasks → Add new task

PATCH /api/tasks/:id → Update task

DELETE /api/tasks/:id → Delete task