import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

export function Footer() {
  const { colors } = useTheme();

  return (
    <View style={styles.footerContainer}>
      <Text style={[styles.footerText, { color: colors.muted }]}>Fatec Atibaia</Text>
      <Text style={[styles.footerText, { color: colors.muted, fontSize: 12 }]}>
        ESP32 • MQTT • React Native
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    paddingVertical: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    fontWeight: "500",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
});
