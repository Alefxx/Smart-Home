import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

export function LogCard({ item }) {
  const { colors } = useTheme();
  const isOpen = item.action === "OPEN";

  const formatDateTime = (isoString) => {
    if (!isoString) return { date: "-", time: "-" };
    const dateObj = new Date(isoString);
    const date = dateObj.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
    const time = dateObj.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    return { date, time };
  };

  const { date, time } = formatDateTime(item.createdAt || item.timestamp);

  return (
    <View style={[styles.logItem, { backgroundColor: colors.card }]}>
      <View style={styles.logAvatar}>
        <Text style={styles.avatarIcon}>👤</Text>
      </View>
      <View style={styles.logDetails}>
        <Text style={[styles.logUser, { color: colors.text }]}>
          {item.userName || "Usuário do Sistema"}
        </Text>
        <Text style={[styles.logTime, { color: colors.muted }]}>
          {date} às {time}
        </Text>
      </View>
      <View 
        style={[
          styles.statusBadge, 
          { backgroundColor: isOpen ? "rgba(39, 174, 96, 0.1)" : "rgba(217, 75, 75, 0.1)" }
        ]}
      >
        <Text style={[styles.statusText, { color: isOpen ? colors.online : colors.offline }]}>
          {isOpen ? "ABERTO" : "FECHADO"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  logAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarIcon: {
    fontSize: 20,
  },
  logDetails: {
    flex: 1,
  },
  logUser: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  logTime: {
    fontSize: 13,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});
