import { useState } from "react";  // Added this import

function DeleteConfirmModal({ employee, onCancel, onConfirm }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const confirmDelete = async () => {
    setIsDeleting(true);
    setError("");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/${employee.id}`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        throw new Error("Failed to delete employee.");
      }
      onConfirm();
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal small">
        <p className="modal-text">
          Are you sure you want to delete <b>{employee.name}</b>?
        </p>
        {error && <p className="error-message">{error}</p>}
        <div className="modal-actions">
          <button onClick={confirmDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Yes, Delete"}
          </button>
          <button onClick={onCancel} disabled={isDeleting}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;