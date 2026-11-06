import React from "react";
import { View, Text, Switch, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

export function LedCard({ led, online, loading, onToggle, onSettingsPress }) {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.iconContainer, { backgroundColor: "rgba(241, 196, 15, 0.1)" }]}>
            <Text style={[styles.icon, { color: led ? "#F1C40F" : colors.muted }]}>💡</Text>
          </View>
          <Text style={[styles.title, { color: colors.text }]}>Iluminação</Text>
        </View>
        <TouchableOpacity style={styles.settingsBtn} onPress={onSettingsPress} activeOpacity={0.7}>
          <Text style={[styles.settingsIcon, { color: colors.muted }]}>⚙️</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.controlRow}>
        <Text style={[styles.status, { color: colors.muted }]}>
          {led === null ? "Sincronizando..." : led ? "Sistema Ativo" : "Sistema Inativo"}
        </Text>
        <Switch
          value={led === true}
          onValueChange={onToggle}
          disabled={led === null || !online || loading}
          trackColor={{ false: "rgba(0,0,0,0.2)", true: colors.primary }}
          thumbColor="#FFFFFF"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 24,
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  icon: {
    fontSize: 18,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  settingsBtn: {
    padding: 6,
  },
  settingsIcon: {
    fontSize: 18,
  },
  controlRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  status: {
    fontSize: 14,
    fontWeight: "500",
  },
});

