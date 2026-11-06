import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext({});

export function ThemeProvider({ children }) {
  // Inicia no modo escuro por padrão para combinar com a identidade da apresentação
  const [dark, setDark] = useState(true);

  const theme = {
    dark,
    toggleTheme: () => setDark(!dark),
    colors: {
      bg: dark ? "#050B14" : "#F4F6F8",       // Fundo super profundo no dark, gelo no light
      card: dark ? "#111827" : "#FFFFFF",     // Contraste sofisticado para os cards
      text: dark ? "#F9FAFB" : "#111827",     // Branco gelo e preto asfalto para os textos
      muted: dark ? "#9CA3AF" : "#6B7280",    // Cinza balanceado para textos secundários
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

