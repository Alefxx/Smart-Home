import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../hooks/useAuth";

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
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
          <View style={styles.inputGroup}>
            <TextInput
              style={[styles.inputField, { backgroundColor: colors.card, color: colors.text, borderColor: colors.card }]}
              placeholder="E-mail"
              placeholderTextColor={colors.muted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TextInput
              style={[styles.inputField, { backgroundColor: colors.card, color: colors.text, borderColor: colors.card }]}
              placeholder="Senha"
              placeholderTextColor={colors.muted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <TouchableOpacity 
            style={[styles.primaryButton, { backgroundColor: colors.primary, opacity: loading ? 0.7 : 1 }]} 
            onPress={onLogin}
            disabled={loading}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>{loading ? "Autenticando..." : "Entrar no Sistema"}</Text>
          </TouchableOpacity>
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
  errorContainer: {
    backgroundColor: "rgba(217, 75, 75, 0.1)",
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: "#D94B4B",
  },
  errorText: {
    color: "#D94B4B",
    fontWeight: "600",
    fontSize: 14,
  },
  inputGroup: {
    gap: 16,
    marginBottom: 32,
  },
  inputField: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
  },
  primaryButton: {
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#3478D4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  secondaryAction: {
    marginTop: 32,
    alignItems: "center",
  },
  secondaryActionText: {
    fontSize: 15,
  },
});

