import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

export function ActionGridButton({ icon, label, textColor, onPress }) {
  const { colors } = useTheme();
  
  // Se não passar uma cor específica, usa a cor de texto padrão do tema
  const displayColor = textColor || colors.text;

  return (
    <TouchableOpacity
      style={[styles.gridItem, { backgroundColor: colors.card }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.gridIcon, { color: displayColor }]}>{icon}</Text>
      <Text style={[styles.gridLabel, { color: displayColor }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    paddingVertical: 20,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  gridIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  gridLabel: {
    fontWeight: "600",
    fontSize: 14,
    letterSpacing: 0.5,
  },
});
