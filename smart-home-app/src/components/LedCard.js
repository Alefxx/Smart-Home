import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

export function LedCard({ led, online, loading, onToggle }) {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <Text style={[styles.name, { color: colors.text }]}>💡 Iluminação</Text>
      <View style={styles.row}>
        <Text style={{ color: colors.text }}>
          {led === null ? "Verificando..." : led ? "Ligada" : "Desligada"}
        </Text>
        <Switch
          value={led === true}
          onValueChange={onToggle}
          disabled={led === null || !online || loading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 18, borderRadius: 16, marginBottom: 14 },
  name: { fontSize: 18, fontWeight: "bold" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
});
