import React, { useState } from "react";

function CreateDepartment() {
  const [dept, setDept] = useState("");
  const [departments, setDepartments] = useState([]);

  const handleSubmitDept = (e) => {
    e.preventDefault();

    if (dept.trim() !== "") {
      setDepartments([...departments, dept]);
      setDept(""); // Clear input field after submission
    }
  };

  const handleDeleteDept = (index) => {
    const updatedDepartments = departments.filter((_, i) => i !== index);
    setDepartments(updatedDepartments);
  };

  const handleUpdateDept = (index, updatedDept) => {
    const updatedDepartments = [...departments];
    updatedDepartments[index] = updatedDept;
    setDepartments(updatedDepartments);
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
        <input type="submit" value={"Create Department"} />
      </form>
      <div className="departments-container">
        {departments.map((department, index) => (
          <div key={index} className="department-card">
            <p>{department}</p>
            <div className="buttons">
              <button
                onClick={() =>
                  handleUpdateDept(
                    index,
                    prompt("Enter updated department name", department)
                  )
                }
              >
                Update
              </button>
              <button onClick={() => handleDeleteDept(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CreateDepartment;