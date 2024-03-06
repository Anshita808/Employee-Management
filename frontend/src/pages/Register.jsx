import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if email, password, and role are provided
    if (email.trim() === "" || password.trim() === "" || role.trim() === "") {
      toast.error("Email, password, and role are required");
      return;
    }

    // If all validations pass, proceed with registration functionality
    // For demonstration, let's assume registration is successful
    toast.success("Registration successful!");
  };

  // Function to validate email format
  // const validateEmail = (email) => {
  //   const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return re.test(email);
  // };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2 className="register-heading">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label htmlFor="email">Name</label>
            <input
              id="email"
              type="text"
              placeholder="Enter your name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Location</label>
            <input
              id="password"
              type="text"
              placeholder="Enter your location"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="input-field">
            <label>Role</label>
            <div className="radio-container">
              <input
                type="radio"
                id="employee"
                name="role"
                value="employee"
                checked={role === "employee"}
                onChange={() => setRole("employee")}
              />
              <label htmlFor="employee" className="radio-label">
                Employee
              </label>
              <input
                type="radio"
                id="manager"
                name="role"
                value="manager"
                checked={role === "manager"}
                onChange={() => setRole("manager")}
              />
              <label htmlFor="manager" className="radio-label">
                Manager
              </label>
            </div>
          </div>
          <NavLink to={"/login"}>Already Register ? Login</NavLink>
          <button type="submit" className="submit-button">
            Register
          </button>
        </form>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
};

export default Register;