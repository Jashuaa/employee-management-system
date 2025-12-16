import { useState } from "react";

function EmployeeForm({ onEmployeeAdded }) {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(
        "https://employee-management-system-frvx.onrender.com/api/employees",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            department,
            email,
            salary: Number(salary),
          }),
        }
      );

      // clear form
      setName("");
      setDepartment("");
      setEmail("");
      setSalary("");

      // 🔥 trigger GET refresh
      onEmployeeAdded();
    } catch (error) {
      console.error("Error adding employee", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Employee</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />

      <input
        type="text"
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />
      <br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <input
        type="number"
        placeholder="Salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
      />
      <br />

      <button type="submit">Add Employee</button>
    </form>
  );
}

export default EmployeeForm;
