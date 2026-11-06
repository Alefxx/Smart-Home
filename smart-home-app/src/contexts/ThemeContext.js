import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext({});

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);

  const theme = {
    dark,
    toggleTheme: () => setDark(!dark),
    colors: {
      bg: dark ? "#0B1220" : "#F5F7F8",
      card: dark ? "#141F2D" : "#FFFFFF",
      text: dark ? "#F4F7FA" : "#172126",
      muted: "#89949A",
      online: "#27AE60",
      offline: "#D94B4B",
      primary: "#3478D4",
    },
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
