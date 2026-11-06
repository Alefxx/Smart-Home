import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Guarda { id, name, email }

  const loginState = (userData) => {
    setUser(userData);
  };

  const logoutState = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginState, logoutState }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
