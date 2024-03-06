import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if email is empty
    if (email.trim() === "") {
      toast.error("Email is required");
      return;
    }

    // Check if email is in correct format
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Check if password is empty
    if (password.trim() === "") {
      toast.error("Password is required");
      return;
    }

    // Check if password is incorrect (for demonstration purposes)
    if (password !== "password") {
      toast.error("Incorrect password");
      return;
    }

    // If all validations pass, proceed with login functionality
    // For demonstration, let's assume login is successful
    toast.success("Login successful!");
  };

  // Function to validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleSubmit}>
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
          <NavLink to="/register">Don't have an account ? Register</NavLink>
          <button type="submit" className="submit-button">
            Login
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

export default Login;