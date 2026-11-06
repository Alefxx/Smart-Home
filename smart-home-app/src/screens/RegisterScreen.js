import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../hooks/useAuth";

export function RegisterScreen({ navigation }) {
  const { colors } = useTheme();
  const { handleRegister, loading, error } = useAuth();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lockCode, setLockCode] = useState(""); // Código de 8 dígitos da tranca

  const onRegister = () => {
    handleRegister(name, email, password, lockCode, () => {
      Alert.alert("Sucesso!", "Cadastro realizado. Faça login para acessar.");
      navigation.goBack(); // Volta pro Login
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Criar Conta</Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>Vincule sua nova tranca</Text>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <TextInput
          style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
          placeholder="Nome completo"
          placeholderTextColor={colors.muted}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
          placeholder="E-mail"
          placeholderTextColor={colors.muted}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
          placeholder="Senha (mínimo 8 dígitos)"
          placeholderTextColor={colors.muted}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TextInput
          style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
          placeholder="Código de fábrica da Tranca (8 dígitos)"
          placeholderTextColor={colors.muted}
          value={lockCode}
          onChangeText={setLockCode}
          keyboardType="number-pad"
          maxLength={8}
        />

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: colors.primary, opacity: loading ? 0.7 : 1 }]} 
          onPress={onRegister}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? "Cadastrando..." : "Cadastrar"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkButton} onPress={() => navigation.goBack()}>
          <Text style={[styles.linkText, { color: colors.muted }]}>Já tem uma conta? Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  content: { padding: 20 },
  title: { fontSize: 32, fontWeight: "bold", textAlign: "center", marginBottom: 5 },
  subtitle: { fontSize: 16, textAlign: "center", marginBottom: 20 },
  errorText: { color: "#D94B4B", textAlign: "center", marginBottom: 15, fontWeight: "bold" },
  input: { padding: 15, borderRadius: 10, marginBottom: 15, fontSize: 16 },
  button: { padding: 15, borderRadius: 10, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
  linkButton: { marginTop: 20, alignItems: "center" },
  linkText: { fontSize: 16, fontWeight: "500" },
});
