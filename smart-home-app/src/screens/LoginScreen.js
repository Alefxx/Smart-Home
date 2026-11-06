import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../hooks/useAuth";

// Importando os componentes modulares criados anteriormente
import { CustomInput } from "../components/CustomInput";
import { CustomButton } from "../components/CustomButton";
import { ErrorMessage } from "../components/ErrorMessage";

export function LoginScreen({ navigation }) {
  const { colors } = useTheme();
  const { handleLogin, loading, error } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    handleLogin(email, password, () => navigation.replace("Home"));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.formContainer}>
          
          <View style={styles.headerContainer}>
            <Text style={[styles.brandTitle, { color: colors.text }]}>SmartHome</Text>
            <Text style={[styles.brandSubtitle, { color: colors.primary }]}>Fatec Atibaia</Text>
            <Text style={[styles.instructionText, { color: colors.muted }]}>Acesse seu painel de controle</Text>
          </View>

          <ErrorMessage message={error} />

          <View style={styles.inputGroup}>
            <CustomInput
              label="E-MAIL DE ACESSO"
              placeholder="Digite seu e-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            
            <CustomInput
              label="SENHA"
              placeholder="Digite sua senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <CustomButton 
            title={loading ? "Autenticando..." : "Entrar no Sistema"}
            onPress={onLogin}
            loading={loading}
          />

          <TouchableOpacity 
            style={styles.secondaryAction} 
            onPress={() => navigation.navigate("Register")}
            activeOpacity={0.6}
          >
            <Text style={[styles.secondaryActionText, { color: colors.muted }]}>
              Novo usuário? <Text style={{ color: colors.primary, fontWeight: "700" }}>Registrar dispositivo</Text>
            </Text>
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 48,
  },
  brandTitle: {
    fontSize: 42,
    fontWeight: "900",
    letterSpacing: -1,
  },
  brandSubtitle: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  instructionText: {
    fontSize: 15,
  },
  inputGroup: {
    gap: 24, // Espaçamento ajustado para comportar as labels do CustomInput
    marginBottom: 32,
  },
  secondaryAction: {
    marginTop: 32,
    alignItems: "center",
  },
  secondaryActionText: {
    fontSize: 15,
  },
});
