import React from "react";
import { SafeAreaView, Text, StyleSheet, StatusBar, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { useSmartHome } from "../hooks/useSmartHome";

// Importando os componentes
import { Header } from "../components/Header";
import { LedCard } from "../components/LedCard";
import { DoorCard } from "../components/DoorCard";
import { ActionGridButton } from "../components/ActionGridButton";
import { Footer } from "../components/Footer";

export function HomeScreen({ navigation }) {
  const { dark, toggleTheme, colors } = useTheme();
  const { led, door, doorAction, online, loading, toggleLed, operateDoor } = useSmartHome();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <StatusBar barStyle={dark ? "light-content" : "dark-content"} />
      
      <Header online={online} />
      
      <View style={styles.actionGrid}>
        <ActionGridButton
          icon={dark ? "☀️" : "🌙"}
          label={dark ? "Modo Claro" : "Modo Escuro"}
          onPress={toggleTheme}
        />
        <ActionGridButton
          icon="📋"
          label="Histórico"
          textColor={colors.primary}
          onPress={() => navigation.navigate("Logs")}
        />
      </View>
      
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Controle de Dispositivos</Text>
      
      <View style={styles.deviceContainer}>
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
      </View>
      
      <Footer />
      
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
});
