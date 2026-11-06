import React from "react";
import { SafeAreaView, Text, StyleSheet, StatusBar, View, TouchableOpacity, Alert } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { useSmartHome } from "../hooks/useSmartHome";
import { useAuthContext } from "../contexts/AuthContext";

// Importando os componentes
import { Header } from "../components/Header";
import { LedCard } from "../components/LedCard";
import { DoorCard } from "../components/DoorCard";
import { ActionGridButton } from "../components/ActionGridButton";
import { Footer } from "../components/Footer";

export function HomeScreen({ navigation }) {
  const { dark, toggleTheme, colors } = useTheme();
  const { led, door, doorAction, online, loading, toggleLed, operateDoor } = useSmartHome();
  const { logoutState } = useAuthContext();

  const handleLogout = () => {
    Alert.alert(
      "Encerrar Sessão",
      "Tem certeza que deseja sair do seu painel de controle?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sair", 
          style: "destructive", // No iOS o texto fica vermelho para alertar ação destrutiva
          onPress: () => {
            logoutState(); // Limpa o usuário logado no Context
            navigation.replace("Login"); // Replace impede que o usuário volte com o botão do celular
          } 
        }
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <StatusBar barStyle={dark ? "light-content" : "dark-content"} />
      
      {/* Botão de Sair/Voltar no Topo */}
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
    paddingTop: 8,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "flex-end", // Alinha o botão de sair à direita (ou mude para flex-start para ficar à esquerda)
    marginBottom: 8,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "rgba(0,0,0,0.03)", // Fundo sutil
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
