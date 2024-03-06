import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import "./App.css";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle login
  const handleLogin = () => {
    // Assume login is successful, set isLoggedIn to true
    setIsLoggedIn(true);
  };

  // Function to handle logout
  // const handleLogout = () => {
  //   // Assume logout is successful, set isLoggedIn to false
  //   setIsLoggedIn(false);
  // };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;