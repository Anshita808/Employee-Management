import React, { useState } from "react";
import CreateDepartment from "../components/CreateDepartment";
import EmployeeFilter from "./EmployeeFilter";
import EmployeeList from "./EmployeeList";

const employees = [
  { id: 1, name: "John Doe", location: "New York" },
  { id: 2, name: "Jane Smith", location: "Los Angeles" },
  { id: 3, name: "Alice Johnson", location: "Chicago" },
  { id: 4, name: "Bob Williams", location: "San Francisco" },
  { id: 5, name: "Emily Brown", location: "Miami" },
  { id: 6, name: "Michael Davis", location: "Seattle" },
  { id: 7, name: "Olivia Wilson", location: "Boston" },
  { id: 8, name: "William Rodriguez", location: "Houston" },
  { id: 9, name: "Sophia Martinez", location: "Philadelphia" },
  { id: 10, name: "David Lopez", location: "Phoenix" },
  { id: 11, name: "Emma Lee", location: "Denver" },
  { id: 12, name: "James Taylor", location: "Austin" },
  // Add more employee objects as needed
];

function Home() {
  const role = localStorage.getItem("role");
  const [filteredEmployees, setFilteredEmployees] = useState(employees);

  const handleFilter = (location, sortOrder) => {
    let filteredList = employees;

    // Filter employees based on location
    if (location) {
      filteredList = employees.filter(
        (employee) => employee.location === location
      );
    }

    // Sort employees based on sort order
    if (sortOrder === "asc") {
      filteredList.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      filteredList.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredEmployees(filteredList);
  };
  return (
    <div>
      <h1>Home Page</h1>
      <div className="content">
        {role === "manager" && <CreateDepartment />}
        <EmployeeFilter employees={employees} onFilter={handleFilter} />
        <EmployeeList employees={filteredEmployees} />
      </div>
    </div>
  );
}

export default Home;