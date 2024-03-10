import React, { useState, useEffect } from "react";
import CreateDepartment from "../components/CreateDepartment";
import EmployeeFilter from "./EmployeeFilter";
import EmployeeList from "./EmployeeList";
import Navbar from "./Nav";

let BASEURL = "https://chartreuse-green-top-hat.cyclic.app";

function Home() {
  const role = localStorage.getItem("role");
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {
    try {
      const authToken = localStorage.getItem("token");

      const response = await fetch(`${BASEURL}/auth/getAllEmploy`, {
        method: "GET",
        headers: {
          Authorization: authToken,
        },
      });

      if (response.ok) {
        const data = await response.json();

        setEmployees(data.employees);
        setFilteredEmployees(data.employees); // Initially set filtered employees to all employees
      } else {
        console.error("Failed to fetch employees");
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleFilter = async (location, sortOrder) => {
    try {
      const authToken = localStorage.getItem("token");

      let filterUrl = `${BASEURL}/auth/filter-employ`;
      if (location || sortOrder) {
        filterUrl += `?location=${location}`;
        if (sortOrder) {
          filterUrl += `&sort=${sortOrder}`;
        }
      }

      const response = await fetch(filterUrl, {
        method: "GET",
        headers: {
          Authorization: authToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFilteredEmployees(data.employees);
      } else {
        console.error("Failed to fetch filtered employees");
      }
    } catch (error) {
      console.error("Error filtering employees:", error);
    }
  };

  const handleEmployeeUpdate = (updatedEmployee) => {
    const updatedEmployees = employees.map((employee) =>
      employee._id === updatedEmployee._id ? updatedEmployee : employee
    );
    setEmployees(updatedEmployees);
  };

  return (
    <div>
      <Navbar />
      <div className="content">
        {role === "manager" && <CreateDepartment getEmployee={getEmployees} />}
        <EmployeeFilter employees={employees} onFilter={handleFilter} />
        <EmployeeList
          employees={filteredEmployees}
          onUpdate={handleEmployeeUpdate}
          getEmployee={getEmployees}
        />
      </div>
    </div>
  );
}

export default Home;