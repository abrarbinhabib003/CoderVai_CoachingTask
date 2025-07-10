# Coaching Management System (Mini Version)

A mini full-stack web application for managing students, batches, and basic administration tasks. Built using **React.js**, **Tailwind CSS**, **DaisyUI**, **Node.js**, **Express.js**, **Prisma**, **PostgreSQL**, and **Firebase Authentication**.

---

##  Live Website
 [https://codervai-coaching.web.app/](https://codervai-coaching.web.app/)


## Project Overview
This web app allows administrators to manage students and batches, perform CRUD operations, and navigate a functional dashboard. The app also includes Firebase-based authentication and future plans for attendance and notice features.

---

## 🖥Client Side
###  Technologies Used
- React.js
- Tailwind CSS
- DaisyUI
- Firebase Authentication
- SweetAlert2

###  Pages Included
- **Home Page**: Main landing page rendering key UI components.
- **Admin Dashboard**: Contains student/batch management features and a responsive sidebar (tab layout for mobile).
- **App Routes**: Defined using `react-router-dom`.
- **Error Page**: Simple fallback route.

###  Authentication
- Firebase used for `register`, `login`, `logout`
- Sensitive data handled via `.env` variables
- Custom Auth Context + `useAuth` hook for global access

###  Main Components
- **Banner**: Simple homepage header
- **Student Management**:
  - CRUD functionality with confirmation alerts
  - Table view with filtering
- **Batch Management**:
  - Add/Edit/Delete batches
  - Student count per batch fetched from backend
  - (Planned: batch-wise student list)
- **Dashboard Overview**:
  - General overview/summary
- **Notice & Attendance (Planned)**:
  - Admin post & read notices
  - Attendance by date and batch

###  Limitations
- Role-based routes not completed due to Firebase console issues
- Login/Register forms not connected to navbar
- No README at original submission time

---

##  Server Side
###  Technologies Used
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL (hosted on Neon.tech)
- Vercel for deployment

###  Security
- `.env` for secrets
- CORS for origin control
- `cookie-parser` for session handling
- `bcrypt` for password hashing

###  Folder Structure
- **Controllers**: Business logic and all CRUD functionality
- **Routes**: Endpoint definitions
- **app.js / server.js**: App and server configuration
- **Middleware**: (Planned) Role-based auth for Admin/User

###  Limitations
- Firebase role-based auth failed in final deployment phase
- Attendance and Notice modules not implemented due to time limits
- README coudld not implement



