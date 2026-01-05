# 🚀 Professional Employee Management System (EMS)

A premium, secure, and full-stack application designed to manage employee records with modern web standards. Built with **Spring Boot** (Backend) and **React** (Frontend), featuring a sleek glassmorphic design and enterprise-grade security.

---

## 🏛️ System Architecture

The application follows a classic **Client-Server Architecture** with a clear separation of concerns:

### 1. Frontend (The "Face")
- **React 18 + Vite**: High-performance rendering and incredibly fast development builds.
- **Vanilla CSS**: Custom-crafted "Glassmorphism" UI for a premium, modern feel.
- **State Management**: Uses React Hooks (`useState`, `useEffect`, `useRef`) for local state and form handling.

### 2. Backend (The "Brain")
- **Spring Boot 3.2**: Core framework for providing a robust RESTful API.
- **Data Transfer Object (DTO) Pattern**: Decouples the database layer from the client layer for better security and flexibility.
- **Service/Repository Pattern**: Ensures business logic is isolated and the data layer is easily swappable.
- **Java 17/24 Compatibility**: Refactored to work seamlessly with the latest JDK versions.

### 3. Database (The "Memory")
- **MySQL**: Persistent storage for all employee records.
- **Spring Data JPA (Hibernate)**: Simplifies database interactions through object-relational mapping.

---

## ✨ Key Features & Implementation

### 🛠️ Backend Brilliance
- **Financial Precision**: Uses `BigDecimal` for salaries to ensure zero rounding errors in financial data.
- **Centralized CORS**: Restrictive Cross-Origin Resource Sharing (CORS) configuration to prevent unauthorized browsers from calling the API.
- **Security Headers**: A custom Filter adds headers like `X-Frame-Options` and `Content-Security-Policy` to every response to stop Clickjacking and XSS.
- **Generic Error Handling**: A `GlobalExceptionHandler` masks sensitive server details from the user while logging full details for developers.
- **API Documentation**: Integrated **Swagger UI** for real-time API testing and documentation.

### 🎨 Frontend Excellence
- **Smart Validation**: 
  - **Email Typo Detection**: Detects common mistakes like `@gail.com` and suggests `@gmail.com`.
  - **Real-time Sanitization**: Escapes user input to prevent HTML injection (XSS).
- **Responsive Design**: Full glassmorphism UI that looks stunning on all screen sizes.
- **Department Dropdown**: Structured selection with an "Other" option that reveals a custom text input.
- **Submission Rate Limiting**: Prevents accidental double-submissions by enforcing a cool-down period.
- **Accessibility (a11y)**: Fully labeled forms with unique IDs and ARIA labels for screen reader support.

---

## 🔐 Security Highlights
- **Environment Variables**: Sensitive data like database passwords and API URLs are never hardcoded.
- **Input Sanitization**: All user-provided strings are cleaned before being stored or displayed.
- **Strict Data Types**: Validated inputs (e.g., minimum salary) both on frontend and backend.
- **Secure Logs**: Server logs capture detailed trace information without exposing it to the client.

---

## ⚙️ Setup & Installation

### Prerequistes
- **JDK 17 or higher**
- **Node.js (LTS)**
- **MySQL Server**

### 1. Database Setup
Create a database named `ems_db` in your MySQL instance:
```sql
CREATE DATABASE ems_db;
```

### 2. Backend Setup
1. Navigate to `employeemanagementsystem/`
2. Set your environment variables:
   ```bash
   $env:DB_PASSWORD="your_mysql_password"
   ```
3. Run the app:
   ```bash
   .\mvnw.cmd spring-boot:run
   ```

### 3. Frontend Setup
1. Navigate to `employeemanagementsystem/frontend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

### 4. Open in Browser
Visit **`http://localhost:3000`** to see the app in action!

---

## 📄 License
This project is open-source and ready for professional modification.

*Built with ❤️ for High-Quality Employee Management.*
