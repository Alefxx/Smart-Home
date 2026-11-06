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

      <View style={styles.rowButtons}>
        <TouchableOpacity
          style={[styles.smallCard, { backgroundColor: colors.card, flex: 1, marginRight: 6 }]}
          onPress={toggleTheme}
        >
          <Text style={{ color: colors.text, fontWeight: "500", textAlign: "center" }}>
            {dark ? "☀️ Claro" : "🌙 Escuro"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.smallCard, { backgroundColor: colors.card, flex: 1, marginLeft: 6 }]}
          onPress={() => navigation.navigate("Logs")}
        >
          <Text style={{ color: colors.primary, fontWeight: "bold", textAlign: "center" }}>
            📋 Histórico
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.section, { color: colors.text }]}>Dispositivos</Text>

      <LedCard 
        led={led} 
        online={online} 
        loading={loading} 
        onToggle={toggleLed} 
      />

      <DoorCard 
        door={door} 
        doorAction={doorAction} 
        online={online} 
        loading={loading} 
        onOperate={operateDoor} 
      />

      <Text style={[styles.footer, { color: colors.muted }]}>
        ESP32 • MQTT • Smart Home
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  rowButtons: { flexDirection: "row", marginBottom: 14 },
  smallCard: { padding: 14, borderRadius: 12, justifyContent: "center" },
  section: { fontSize: 19, fontWeight: "bold", marginBottom: 10, marginTop: 10 },
  footer: { textAlign: "center", marginTop: "auto", padding: 15 },
});
