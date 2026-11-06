import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

export function CustomButton({ label, onPress, disabled, loading, online }) {
  const { colors } = useTheme();
  const unavailable = disabled || loading || !online;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={unavailable}
      style={[
        styles.button,
        { backgroundColor: colors.primary },
        unavailable && { opacity: 0.45 }
      ]}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});
