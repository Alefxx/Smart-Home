import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { useAuthContext } from "../contexts/AuthContext";

export function Header({ online }) {
  const { colors } = useTheme();
  const { user } = useAuthContext();

  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.greeting, { color: colors.text }]}>
          Olá, {user?.name ? user.name.split(" ")[0] : "Usuário"}
        </Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>Painel de Controle</Text>
      </View>
      <View style={[
        styles.statusBadge, 
        { backgroundColor: online ? "rgba(39, 174, 96, 0.15)" : "rgba(217, 75, 75, 0.15)" }
      ]}>
        <View style={[
          styles.statusDot, 
          { backgroundColor: online ? colors.online : colors.offline }
        ]} />
        <Text style={[
          styles.statusText, 
          { color: online ? colors.online : colors.offline }
        ]}>
          {online ? "ONLINE" : "OFFLINE"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 32,
    paddingTop: 10,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginTop: 4,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});

