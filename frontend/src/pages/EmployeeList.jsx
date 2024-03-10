import React, { useState } from "react";
let BASEURL = "https://chartreuse-green-top-hat.cyclic.app";

function EmployeeList({ employees, onUpdate, getEmployee }) {
  const [editableFields, setEditableFields] = useState({});
  const [isEditing, setIsEditing] = useState({});

  const handleUpdate = async (id) => {
    try {
      const res = await fetch(`${BASEURL}/auth/update-employ/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(editableFields[id] || {}),
      });

      if (res.status === 200) {
        const updatedEmployee = await res.json();
        alert("Employee Updated");
        setEditableFields((prevFields) => ({
          ...prevFields,
          [id]: {}, // Clear editable fields for the updated employee
        }));
        onUpdate(updatedEmployee);
        setIsEditing((prevEditing) => ({
          ...prevEditing,
          [id]: false, // Exit editing mode for the updated employee
        }));
        getEmployee();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${BASEURL}/auth/delete-employ/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });

      if (res.status === 200) {
        alert("Employee Deleted");
        getEmployee();
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleFieldChange = (id, field, value) => {
    setEditableFields((prevFields) => ({
      ...prevFields,
      [id]: {
        ...prevFields[id],
        [field]: value,
      },
    }));
  };

  const startEditing = (id) => {
    setIsEditing((prevEditing) => ({
      ...prevEditing,
      [id]: !prevEditing[id], // Toggle editing mode for the selected employee
    }));
  };

  return (
    <div className="employee-list">
      <h2>All Employees</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Department</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee._id}</td>
              <td>
                {isEditing[employee._id] ? (
                  <input
                    type="text"
                    value={editableFields[employee._id]?.name || ""}
                    onChange={(e) =>
                      handleFieldChange(employee._id, "name", e.target.value)
                    }
                  />
                ) : (
                  employee.name
                )}
              </td>
              <td>
                {isEditing[employee._id] ? (
                  <input
                    type="text"
                    value={editableFields[employee._id]?.role || ""}
                    onChange={(e) =>
                      handleFieldChange(employee._id, "role", e.target.value)
                    }
                  />
                ) : (
                  employee.role
                )}
              </td>
              <td>
                {employee?.department ? employee.department.name : "Unassigned"}
              </td>
              <td>
                {isEditing[employee._id] ? (
                  <input
                    type="text"
                    value={editableFields[employee._id]?.location || ""}
                    onChange={(e) =>
                      handleFieldChange(
                        employee._id,
                        "location",
                        e.target.value
                      )
                    }
                  />
                ) : (
                  employee.location
                )}
              </td>
              <td>
                {isEditing[employee._id] ? (
                  <button onClick={() => handleUpdate(employee._id)}>
                    Save
                  </button>
                ) : (
                  <button onClick={() => startEditing(employee._id)}>
                    Update
                  </button>
                )}
                <button onClick={() => handleDelete(employee._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;