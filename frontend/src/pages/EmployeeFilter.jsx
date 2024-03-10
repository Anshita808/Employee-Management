import React, { useState } from "react";

function EmployeeFilter({ employees, onFilter }) {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [sortOrder, setSortOrder] = useState("all");

  const handleLocationChange = (event) => {
    const location = event.target.value;
    setSelectedLocation(location);
    onFilter(location, sortOrder); // Call onFilter with updated location and sort order
  };

  const handleSortChange = (event) => {
    const order = event.target.value;
    setSortOrder(order);
    onFilter(selectedLocation, order); // Call onFilter with updated location and sort order
  };

  // Extract unique locations from employees for filtering
  const uniqueLocations = Array.from(
    new Set(employees.map((employee) => employee.location))
  );

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
          {uniqueLocations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
        <label htmlFor="nameSort">Sort by Name:</label>
        <select id="nameSort" value={sortOrder} onChange={handleSortChange}>
          <option value="all">Select</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
}

export default EmployeeFilter;