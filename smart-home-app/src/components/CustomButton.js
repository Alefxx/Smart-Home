import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

export function CustomButton({ title, onPress, disabled, loading }) {
  const { colors } = useTheme();
  const isUnavailable = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.submitButton,
        { backgroundColor: colors.primary, opacity: isUnavailable ? 0.7 : 1 }
      ]}
      onPress={onPress}
      disabled={isUnavailable}
      activeOpacity={0.8}
    >
      <Text style={styles.submitButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  submitButton: {
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});
