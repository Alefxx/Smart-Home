import React from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { useSmartHome } from "../hooks/useSmartHome";
import { Header } from "../components/Header";
import { LedCard } from "../components/LedCard";
import { DoorCard } from "../components/DoorCard";

export function HomeScreen() {
  const { dark, toggleTheme, colors } = useTheme();
  
  // Extrai toda a lógica limpa do nosso hook customizado
  const { led, door, doorAction, online, loading, toggleLed, operateDoor } = useSmartHome();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <StatusBar barStyle={dark ? "light-content" : "dark-content"} />

      <Header online={online} />

      <TouchableOpacity
        style={[styles.themeCard, { backgroundColor: colors.card }]}
        onPress={toggleTheme}
      >
        <Text style={{ color: colors.text, fontWeight: "500" }}>
          {dark ? "☀️ Mudar para Modo Claro" : "🌙 Mudar para Modo Escuro"}
        </Text>
      </TouchableOpacity>

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
  themeCard: { padding: 18, borderRadius: 16, marginBottom: 14, alignItems: 'center' },
  section: { fontSize: 19, fontWeight: "bold", marginBottom: 10, marginTop: 10 },
  footer: { textAlign: "center", marginTop: "auto", padding: 15 },
});
