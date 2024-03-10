import React, { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Initialize the token from local storage on component mount
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isAuth, setAuth] = useState(!!token); // Check if token exists

  const setVerifiedToken = (newToken) => {
    setToken(newToken);
    setAuth(!!newToken); // Update isAuth immediately after setting the token
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setVerifiedToken,
        isAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };