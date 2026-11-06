import React from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, StatusBar, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { useSmartHome } from "../hooks/useSmartHome";
import { Header } from "../components/Header";
import { LedCard } from "../components/LedCard";
import { DoorCard } from "../components/DoorCard";

export function HomeScreen({ navigation }) {
  const { dark, toggleTheme, colors } = useTheme();
  const { led, door, doorAction, online, loading, toggleLed, operateDoor } = useSmartHome();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <StatusBar barStyle={dark ? "light-content" : "dark-content"} />
      <Header online={online} />
      <View style={styles.actionGrid}>
        <TouchableOpacity
          style={[styles.gridItem, { backgroundColor: colors.card }]}
          onPress={toggleTheme}
          activeOpacity={0.8}
        >
          <Text style={[styles.gridIcon, { color: colors.text }]}>{dark ? "☀️" : "🌙"}</Text>
          <Text style={[styles.gridLabel, { color: colors.text }]}>{dark ? "Modo Claro" : "Modo Escuro"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.gridItem, { backgroundColor: colors.card }]}
          onPress={() => navigation.navigate("Logs")}
          activeOpacity={0.8}
        >
          <Text style={[styles.gridIcon, { color: colors.primary }]}>📋</Text>
          <Text style={[styles.gridLabel, { color: colors.primary }]}>Histórico</Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Controle de Dispositivos</Text>
      <View style={styles.deviceContainer}>
        <LedCard led={led} online={online} loading={loading} onToggle={toggleLed} />
        <DoorCard door={door} doorAction={doorAction} online={online} loading={loading} onOperate={operateDoor} />
      </View>
      <View style={styles.footerContainer}>
        <Text style={[styles.footerText, { color: colors.muted }]}>Fatec Atibaia</Text>
        <Text style={[styles.footerText, { color: colors.muted, fontSize: 12 }]}>ESP32 • MQTT • React Native</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  actionGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
    gap: 16,
  },
  gridItem: {
    flex: 1,
    paddingVertical: 20,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  gridIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  gridLabel: {
    fontWeight: "600",
    fontSize: 14,
    letterSpacing: 0.5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  deviceContainer: {
    flex: 1,
  },
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

