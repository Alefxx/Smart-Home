import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext({});

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(true);

  const theme = {
    dark,
    toggleTheme: () => setDark(!dark),
    colors: {
      bg: dark ? "#020408" : "#F4F6F8",       // Preto profundo e absoluto no dark, gelo no light
      card: dark ? "#0D1626" : "#FFFFFF",     // Azul escuro profundo e sofisticado para os cards
      text: dark ? "#F8FAFC" : "#111827",     // Branco gelo de altíssimo contraste
      muted: dark ? "#94A3B8" : "#6B7280",    // Cinza elegante para textos secundários
      online: "#10B981",                      // Verde esmeralda vibrante
      offline: "#EF4444",                     // Vermelho alerta moderno
      primary: "#3B82F6",                     // Azul elétrico tecnológico
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

