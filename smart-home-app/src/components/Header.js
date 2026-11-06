import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { useAuthContext } from "../contexts/AuthContext";

export function Header({ online }) {
  const { colors } = useTheme();
  const { user } = useAuthContext();

  return (
    <View style={styles.header}>
      <View>
        <Text style={[styles.title, { color: colors.text }]}>
          Olá, {user?.name ? user.name : "Bem-vindo"} 👋
        </Text>
        <Text style={{ color: colors.muted }}>Smart Home • Controle sua casa</Text>
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
    marginVertical: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
