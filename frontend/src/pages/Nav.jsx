// Navbar.jsx

import React from "react";


function Navbar() {
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
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
