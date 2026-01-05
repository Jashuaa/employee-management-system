# Employee Management System

A full-stack CRUD application for managing employee records.

## 🛠️ Tech Stack
- **Backend:** Spring Boot, Spring Data JPA, MySQL.
- **Frontend:** React, Vite, Vanilla CSS.

## 🚀 Key Features Implemented

### Backend
- **Data Handling:** Used DTO (Data Transfer Object) pattern for clean API responses.
- **Precision:** Used `BigDecimal` for salaries to prevent rounding errors.
- **Security:**
  - Added security headers (X-Frame-Options, CSP, etc.) via a custom Filter.
  - Centralized CORS configuration to allow only the React app frontend.
  - Used Environment Variables for database credentials and sensitive settings.
- **Error Handling:** Centralized exception handling that returns safe messages to the client.

### Frontend
- **Modern UI:** Responsive glassmorphic design using custom CSS.
- **Improved Forms:** 
  - Department dropdown with a dynamic "Other" input field.
  - Email typo suggestion (e.g., catching `@gail.com` and suggesting `@gmail.com`).
- **Security & Validation:**
  - Real-time XSS sanitization for all user inputs.
  - Frontend rate limiting to prevent double submissions.
- **Accessibility:** Added aria-labels and field IDs for better screen reader support.

## 📁 System Flow
The React frontend (port 3000) communicates with the Spring Boot REST API (port 8080) to perform Create, Read, Update, and Delete operations on the MySQL database.
