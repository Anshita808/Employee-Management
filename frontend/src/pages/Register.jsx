import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the registration endpoint
      const response = await axios.post("http://localhost:8080/auth/register", {
        name,
        email,
        password,
        location,
        role,
      });

      if (response.status === 200) {
        toast.success("Registration successful!"); // Show success message
      } else {
        toast.error("Registration failed. Please try again."); // Show error message
      }
    } catch (error) {
      console.error("Error occurred:", error.message);
      toast.error("Registration failed. Please try again later."); // Show error message
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2 className="register-heading">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            <label htmlFor="location">Location</label>
            <input
              id="location"
              type="text"
              placeholder="Enter your location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
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
          <NavLink to={"/login"}>Already Registered? Login</NavLink>
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
