import { useState } from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";

function App() {
  const [reload, setReload] = useState(false);

  const triggerReload = () => {
    setReload((prev) => !prev);
  };

  return (
    <div>
      <h1>Employee Management System</h1>

      <EmployeeForm onEmployeeAdded={triggerReload} />

      <EmployeeList reload={reload} />
    </div>
  );
}

export default App;
