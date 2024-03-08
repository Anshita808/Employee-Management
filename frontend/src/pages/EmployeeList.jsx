// EmployeeList.jsx

import React from "react";

function EmployeeList({ employees, onInsert, onUpdate, onDelete }) {
  return (
    <div className="employee-list">
      <h2>All Employees</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.location}</td>
              <td>
                <button onClick={() => onUpdate(employee)}>Update</button>
                <button onClick={() => onDelete(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
