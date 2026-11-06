import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

export function Header({ online }) {
  const { colors } = useTheme();

  return (
    <View style={styles.header}>
      <View>
        <Text style={[styles.title, { color: colors.text }]}>Smart Home</Text>
        <Text style={{ color: colors.muted }}>Controle sua casa</Text>
      </View>
      <Text style={{ color: online ? colors.online : colors.offline, fontWeight: "bold" }}>
        {online ? "Online" : "Offline"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
});
