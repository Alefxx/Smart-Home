import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <View style={styles.alertBox}>
      <Text style={styles.alertText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  alertBox: {
    backgroundColor: "rgba(217, 75, 75, 0.1)",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(217, 75, 75, 0.3)",
  },
  alertText: {
    color: "#D94B4B",
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
  },
});
