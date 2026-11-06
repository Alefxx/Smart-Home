import React, { useState } from "react";
import { SafeAreaView, Text, StyleSheet, StatusBar, View, TouchableOpacity, Alert, Platform } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { useSmartHome } from "../hooks/useSmartHome";
import { useAuthContext } from "../contexts/AuthContext";

import { Header } from "../components/Header";
import { LedCard } from "../components/LedCard";
import { DoorCard } from "../components/DoorCard";
import { ActionGridButton } from "../components/ActionGridButton";
import { Footer } from "../components/Footer";
import { LightScheduleModal } from "../components/LightScheduleModal";

export function HomeScreen({ navigation }) {
  const { dark, toggleTheme, colors } = useTheme();
  const { led, door, doorAction, online, loading, toggleLed, operateDoor } = useSmartHome();
  const { logoutState } = useAuthContext();
  const [isScheduleModalVisible, setIsScheduleModalVisible] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      "Encerrar Sessão",
      "Tem certeza que deseja sair do seu painel de controle?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sair", 
          style: "destructive", 
          onPress: () => {
            logoutState(); 
            navigation.replace("Login"); 
          } 
        }
      ]
    );
  };

  const handleSaveSchedule = (scheduleData) => {
    Alert.alert("Agendamento Salvo", `A luz acenderá automaticamente às ${scheduleData.time}`);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <StatusBar barStyle={dark ? "light-content" : "dark-content"} backgroundColor="transparent" translucent />
      
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn} activeOpacity={0.7}>
          <Text style={[styles.backIcon, { color: colors.muted }]}>←</Text>
          <Text style={[styles.logoutText, { color: colors.muted }]}>Encerrar Sessão</Text>
        </TouchableOpacity>
      </View>
      
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
          onSettingsPress={() => setIsScheduleModalVisible(true)}
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

      <LightScheduleModal
        visible={isScheduleModalVisible}
        onClose={() => setIsScheduleModalVisible(false)}
        onSave={handleSaveSchedule}
      />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 15 : 15,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 8,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "rgba(0,0,0,0.03)", 
    borderRadius: 20,
  },
  backIcon: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 6,
  },
  logoutText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
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

