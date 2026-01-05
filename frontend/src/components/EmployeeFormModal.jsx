import { useEffect, useState, useRef } from "react";
import { sanitizeInput, RateLimiter } from "../utils/security";

const DEPARTMENTS = [
  "Engineering",
  "Human Resources",
  "Marketing",
  "Sales",
  "Finance",
  "Operations",
];

function EmployeeFormModal({ editingEmployee, onClose, onSaved }) {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [otherDepartment, setOtherDepartment] = useState("");
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // SECURITY: Rate limiter to prevent rapid form submissions
  const rateLimiter = useRef(new RateLimiter(1000));


  useEffect(() => {
    if (editingEmployee) {
      setName(editingEmployee.name || "");
      const isPreset = DEPARTMENTS.includes(editingEmployee.department);
      if (isPreset) {
        setDepartment(editingEmployee.department);
        setIsOtherSelected(false);
        setOtherDepartment("");
      } else {
        setDepartment("Other");
        setOtherDepartment(editingEmployee.department || "");
        setIsOtherSelected(true);
      }
      setEmail(editingEmployee.email || "");
      setSalary(editingEmployee.salary || "");
    } else {
      // Reset form for adding new employee
      setName("");
      setDepartment("");
      setOtherDepartment("");
      setIsOtherSelected(false);
      setEmail("");
      setSalary("");
      setErrors({});
      setSubmitError("");
    }
  }, [editingEmployee]);


  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required.";

    if (isOtherSelected) {
      if (!otherDepartment.trim()) newErrors.department = "Please specify department.";
    } else if (!department) {
      newErrors.department = "Department is required.";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const emailLower = email.toLowerCase().trim();
      const gmailTypos = ["@gmil.com", "@gail.com", "@gmal.com", "@gnail.com", "@gmial.com"];

      if (gmailTypos.some(typo => emailLower.endsWith(typo))) {
        newErrors.email = "Did you mean @gmail.com?";
      } else if (emailLower.endsWith("@yaho.com")) {
        newErrors.email = "Did you mean @yahoo.com?";
      } else if (!emailRegex.test(email)) {
        newErrors.email = "Please enter a valid email address.";
      }
    }

    if (!salary.toString().trim()) newErrors.salary = "Salary is required.";
    else if (isNaN(salary) || Number(salary) <= 0) newErrors.salary = "Salary must be a positive number.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    // SECURITY: Rate limiting to prevent rapid submissions
    if (!rateLimiter.current.canSubmit()) {
      setSubmitError("Please wait before submitting again.");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const finalDepartment = isOtherSelected ? otherDepartment.trim() : department;

      // SECURITY: Sanitize all user inputs before sending to server
      const payload = {
        name: sanitizeInput(name.trim()),
        department: sanitizeInput(finalDepartment),
        email: email.trim().toLowerCase(), // Email doesn't need HTML sanitization
        salary: Number(salary),
      };


      const response = await fetch(
        editingEmployee
          ? `${import.meta.env.VITE_API_BASE_URL}/${editingEmployee.id}`
          : import.meta.env.VITE_API_BASE_URL,
        {
          method: editingEmployee ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to ${editingEmployee ? "update" : "add"} employee.`);
      }

      onSaved();
    } catch (error) {
      setSubmitError(error.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{editingEmployee ? "Update Employee" : "Add Employee"}</h3>

        {submitError && <p className="error-message">{submitError}</p>}

        <form onSubmit={handleSubmit}>
          <input
            id="employee-name"
            aria-label="Employee Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className={errors.name ? "input-error" : ""}
          />
          {errors.name && <span className="field-error">{errors.name}</span>}

          <select
            id="employee-department"
            aria-label="Department"
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setIsOtherSelected(e.target.value === "Other");
            }}
            className={errors.department ? "input-error" : ""}
          >
            <option value="">Select Department</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
          {errors.department && <span className="field-error">{errors.department}</span>}

          {isOtherSelected && (
            <>
              <input
                id="employee-other-department"
                aria-label="Specify Department"
                value={otherDepartment}
                onChange={(e) => setOtherDepartment(e.target.value)}
                placeholder="Specify Department"
                className={errors.department ? "input-error" : ""}
              />
            </>
          )}

          <input
            id="employee-email"
            aria-label="Employee Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && <span className="field-error">{errors.email}</span>}

          <input
            id="employee-salary"
            aria-label="Employee Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="Salary"
            type="number"
            className={errors.salary ? "input-error" : ""}
          />
          {errors.salary && <span className="field-error">{errors.salary}</span>}

          <div className="modal-actions">
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </button>
            <button type="button" onClick={onClose} disabled={isLoading}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeFormModal;