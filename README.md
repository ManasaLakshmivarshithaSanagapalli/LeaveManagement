📌 Leave Management System — Project Overview

The Leave Management System is a full-stack application built using ASP.NET Core Web API (backend) and Next.js (frontend) with secure JWT authentication and role-based access control for Employees, Managers, and HR. The system enables employees to submit leave requests, managers to review and approve/reject them, and HR to manage leave types and overall system data. The application includes a clean and responsive UI, reusable components, and a structured API layer for scalable development.

✅ Key Features
🔐 Authentication & Authorization

Secure login with JWT tokens

Role-based routing (Employee / Manager )

Password reset flow with email-based token

Signup with validation and identity storage in ASP.NET Identity

👨‍💼 Employee Features

Apply for leave with custom date range

See available leave types

Track request status (Pending / Approved / Rejected)

View leave history and total leave days

🧑‍✈️ Manager Features

Review all pending leave requests

Approve / Reject requests

View employee leave usage and request details

📊 Dashboard

Role-based dashboard

Summary cards showing leave count, pending requests, approvals

Clean UI using TailwindCSS

📨 Email Notifications

Forgot password email with secure token (SendGrid / SMTP)

Alerts during critical account actions (optional)

⚙️ Backend (ASP.NET Core Web API)

ASP.NET Identity for user + role management

Repository + DTO pattern for clean architecture

JWT issuance and token validation

Leave request & leave type CRUD operations

Validation using FluentValidation (if included)

🎨 Frontend (Next.js)

Server & client components

Protected routes based on roles

API wrapper with Axios + token interceptor

Custom hooks for authentication state

Clean and responsive UI components
