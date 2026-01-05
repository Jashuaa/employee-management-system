import { useEffect, useState } from "react";

function EmployeeList({ reload, onAdd, onEdit, onDelete }) {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await fetch(import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/employees");
        if (!response.ok) {
          throw new Error("Failed to fetch employees.");
        }
        const data = await response.json();
        setEmployees(data);
      } catch (err) {
        setError(err.message || "An error occurred while loading employees.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, [reload]);

  if (isLoading) {
    return (
      <div className="list-container">
        <div className="loading">Loading employees...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="list-container">
        <div className="error-message">{error}</div>
        <button className="retry-btn" onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="list-container">
      <div className="list-header">
        <h2>Employees</h2>
        <button className="add-btn" onClick={onAdd}>
          + Add Employee
        </button>
      </div>

      {employees.length === 0 ? (
        <div className="no-data">No employees found. Add one to get started!</div>
      ) : (
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.department}</td>
                <td>{emp.email}</td>
                <td>{emp.salary}</td>
                <td>
                  <button onClick={() => onEdit(emp)}>Edit</button>
                  <button onClick={() => onDelete(emp)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EmployeeList;