import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import "./App.css";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CreateDepartment from "./components/CreateDepartment"; // Import the CreateDepartment component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle login
  const handleLogin = (token, role) => {
    // Store the token and role in local storage
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    // Set isLoggedIn to true
    setIsLoggedIn(true);
  };

  // Function to retrieve the user's role from local storage
  const getUserRole = () => {
    return localStorage.getItem("role");
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Home />
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
          />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/create-department"
            element={
              isLoggedIn && getUserRole() === "manager" ? (
                <CreateDepartment />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
