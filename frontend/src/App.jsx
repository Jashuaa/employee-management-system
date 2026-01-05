import { useState } from "react";
import EmployeeList from "./components/EmployeeList";
import EmployeeFormModal from "./components/EmployeeFormModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import "./App.css";

function App() {
  const [reload, setReload] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const [showDelete, setShowDelete] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const openAddForm = () => {
    setEditingEmployee(null);
    setShowForm(true);
  };

  const openEditForm = (emp) => {
    setEditingEmployee(emp);
    setShowForm(true);
  };

  const openDeleteConfirm = (emp) => {
    setEmployeeToDelete(emp);
    setShowDelete(true);
  };

  return (
    <>
      {/* MAIN PAGE CONTENT */}
      <div className={`app ${showForm || showDelete ? "blurred" : ""}`}>
        <h1 className="title">Employee Management System</h1>

        <EmployeeList
          reload={reload}
          onAdd={openAddForm}
          onEdit={openEditForm}
          onDelete={openDeleteConfirm}
        />
      </div>

      {/* ADD / EDIT MODAL */}
      {showForm && (
        <EmployeeFormModal
          editingEmployee={editingEmployee}
          onClose={() => setShowForm(false)}
          onSaved={() => {
            setShowForm(false);
            setReload(!reload);
          }}
        />
      )}

      {/* DELETE CONFIRM MODAL */}
      {showDelete && (
        <DeleteConfirmModal
          employee={employeeToDelete}
          onCancel={() => setShowDelete(false)}
          onConfirm={() => {
            setShowDelete(false);
            setReload(!reload);
          }}
        />
      )}
    </>
  );
}

export default App;