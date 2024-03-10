import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    // Navigate to login page
    alert("Logout Successfull..")
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <h1>Employee Management</h1>
        </div>
        <ul className="nav-menu">
          <li className="nav-item"><a href="/">Home</a></li>
          <li className="nav-item"><a href="/about">About</a></li>
          <li className="nav-item"><a href="/services">Services</a></li>
          <li className="nav-item"><a href="/contact">Contact</a></li>
          <li className="nav-item" onClick={handleLogout} style={{ cursor: "pointer" }}>
            <FaSignOutAlt style={{ color: "red", marginRight: "5px" }} />
            Logout
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
