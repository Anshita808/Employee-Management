// EmployeeFilter.jsx

import React, { useState } from "react";

function EmployeeFilter({ employees, onFilter }) {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
    onFilter(event.target.value, sortOrder);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    onFilter(selectedLocation, event.target.value);
  };

  return (
    <div className="employee-filter">
      <h2>Employee Filter</h2>
      <div className="filter-options">
        <label htmlFor="location">Filter by Location:</label>
        <select
          id="location"
          value={selectedLocation}
          onChange={handleLocationChange}
        >
          <option value="">All Locations</option>
          {/* Assuming locations are dynamically populated */}
          {employees.map((employee) => (
            <option key={employee.id} value={employee.location}>
              {employee.location}
            </option>
          ))}
        </select>
        <label htmlFor="nameSort">Sort by Name:</label>
        <select id="nameSort" value={sortOrder} onChange={handleSortChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
}

export default EmployeeFilter;
