import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

export function DoorCard({ door, doorAction, online, loading, onOperate }) {
  const { colors } = useTheme();

  const getStatusText = () => {
    if (doorAction === "opening") return "Acionando abertura...";
    if (doorAction === "closing") return "Acionando fechamento...";
    if (door === null) return "Sincronizando sistema...";
    return door ? "Destrancada" : "Trancada";
  };

  const isActionActive = doorAction !== null || loading;
  const isDisabled = door === null || isActionActive || !online;

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <View style={styles.headerRow}>
        <View style={[styles.iconContainer, { backgroundColor: door ? "rgba(39, 174, 96, 0.1)" : "rgba(217, 75, 75, 0.1)" }]}>
          <Text style={styles.icon}>{door ? "🔓" : "🔒"}</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: colors.text }]}>Fechadura Principal</Text>
          <Text style={[styles.status, { color: colors.muted }]}>{getStatusText()}</Text>
        </View>
      </View>
      
      <TouchableOpacity
        style={[
          styles.actionBtn,
          { backgroundColor: door ? "rgba(217, 75, 75, 0.1)" : "rgba(52, 120, 212, 0.1)" },
          isDisabled && { opacity: 0.5 }
        ]}
        onPress={onOperate}
        disabled={isDisabled}
        activeOpacity={0.7}
      >
        {isActionActive ? (
          <ActivityIndicator color={door ? colors.offline : colors.primary} />
        ) : (
          <Text style={[
            styles.actionBtnText, 
            { color: door ? colors.offline : colors.primary }
          ]}>
            {door ? "TRANCAR FECHADURA" : "DESTRANCAR FECHADURA"}
          </Text>
        )}
      </TouchableOpacity>
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
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  icon: {
    fontSize: 20,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    fontWeight: "500",
  },
  actionBtn: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  actionBtnText: {
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
});

