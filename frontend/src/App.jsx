import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import "./App.css";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  // Check if the user is authenticated based on token presence
  

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={ <Home />}
          />
          
          <Route path="/register" element={<Register />} />
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
