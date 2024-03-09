import React, { useState, useEffect } from "react";

let BASEURL = "https://chartreuse-green-top-hat.cyclic.app"

function CreateDepartment() {
  const [dept, setDept] = useState("");
  const [departments, setDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const response = await fetch(
        `${BASEURL}/manager/get-department`,
        {
          method: "GET",
          headers: {
            Authorization: authToken,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setDepartments(data.departments);
      } else {
        console.error("Failed to fetch departments");
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleSubmitDept = async (e) => {
    e.preventDefault();

    try {
      const authToken = localStorage.getItem("token");
      const response = await fetch(
        `${BASEURL}/manager/create-department`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken,
          },
          body: JSON.stringify({ name: dept }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setDepartments([...departments, data.department]);
        setDept("");
        console.log("Department created:", data.department);
      } else {
        console.error("Failed to create department");
      }
    } catch (error) {
      console.error("Error creating department:", error);
    }
  };

  const handleDeleteDept = async (id, index) => {
    try {
      const authToken = localStorage.getItem("token");
      const response = await fetch(
        `${BASEURL}/manager/delete-department/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authToken,
          },
        }
      );

      if (response.ok) {
        setDepartments(departments.filter((_, i) => i !== index));
        console.log("Department deleted");
      } else {
        console.error("Failed to delete department");
      }
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  const handleUpdateDept = async (id, newName) => {
    try {
      const authToken = localStorage.getItem("token");
      const response = await fetch(
        `${BASEURL}/manager/update-department/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken,
          },
          body: JSON.stringify({ name: newName }),
        }
      );

      if (response.ok) {
        setDepartments(
          departments.map((dept) =>
            dept._id === id ? { ...dept, name: newName } : dept
          )
        );
        console.log("Department updated");
      } else {
        console.error("Failed to update department");
      }
    } catch (error) {
      console.error("Error updating department:", error);
    }
  };

  const handleAssignDepartment = (departmentId) => {
    setSelectedDepartmentId(departmentId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedDepartmentId(""); // Reset selected department ID
    setShowModal(false);
  };

  const handleSubmitModal = async (e) => {
    e.preventDefault();
    console.log(employeeId, selectedDepartmentId);
    try {
      const authToken = localStorage.getItem("token");
      const response = await fetch(
        `${BASEURL}/manager/assign-department/${employeeId}/${selectedDepartmentId}`,
        {
          method: "POST",
          headers: {
            Authorization: authToken,
          },
        }
      );
      if (response.ok) {
        alert("Department assigned successfully");
        setShowModal(false);
      } else {
        alert("Failed to assign department");
      }
    } catch (error) {
      console.error("Error assigning department:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmitDept}>
        <input
          type="text"
          placeholder="Enter Department"
          value={dept}
          onChange={(e) => setDept(e.target.value)}
        />
        <input type="submit" value="Create Department" />
      </form>
      <div className="departments-container">
        {departments.map((department, index) => (
          <div key={department._id} className="department-card">
            <p>{department.name}</p>
            <div className="buttons">
              <button onClick={() => handleAssignDepartment(department._id)}>
                Assign Department
              </button>
              <button
                onClick={() =>
                  handleUpdateDept(
                    department._id,
                    prompt("Enter updated department name", department.name)
                  )
                }
              >
                Update
              </button>
              <button onClick={() => handleDeleteDept(department._id, index)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <form onSubmit={handleSubmitModal}>
              <input
                type="text"
                placeholder="Enter Employee ID"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
              />
              <input type="submit" value="Assign Department" />
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateDepartment;