import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../hooks/useAuth";

export function RegisterScreen({ navigation }) {
  const { colors } = useTheme();
  const { handleRegister, loading, error } = useAuth();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lockCode, setLockCode] = useState("");

  const onRegister = () => {
    handleRegister(name, email, password, lockCode, () => {
      Alert.alert("Integração Concluída", "Dispositivo registrado com sucesso. Você já pode acessar o sistema.");
      navigation.goBack();
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.headerSection}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backAction}>
              <Text style={[styles.backIcon, { color: colors.text }]}>←</Text>
            </TouchableOpacity>
            <View>
              <Text style={[styles.pageTitle, { color: colors.text }]}>Configuração</Text>
              <Text style={[styles.pageSubtitle, { color: colors.primary }]}>NOVO DISPOSITIVO</Text>
            </View>
          </View>
          <View style={styles.formWrapper}>
            <Text style={[styles.instruction, { color: colors.muted }]}>
              Preencha os dados para vincular o sistema SmartHome ao seu aplicativo.
            </Text>
            {error && (
              <View style={styles.alertBox}>
                <Text style={styles.alertText}>{error}</Text>
              </View>
            )}
            <View style={styles.inputList}>
              <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>NOME DE EXIBIÇÃO</Text>
                <TextInput
                  style={[styles.textInput, { backgroundColor: colors.card, color: colors.text }]}
                  placeholder="Seu nome completo"
                  placeholderTextColor={colors.muted}
                  value={name}
                  onChangeText={setName}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>CREDENCIAL DE ACESSO</Text>
                <TextInput
                  style={[styles.textInput, { backgroundColor: colors.card, color: colors.text }]}
                  placeholder="E-mail principal"
                  placeholderTextColor={colors.muted}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>CHAVE DE SEGURANÇA</Text>
                <TextInput
                  style={[styles.textInput, { backgroundColor: colors.card, color: colors.text }]}
                  placeholder="Mínimo de 8 caracteres"
                  placeholderTextColor={colors.muted}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>CÓDIGO DE HARDWARE</Text>
                <TextInput
                  style={[styles.textInput, { backgroundColor: colors.card, color: colors.text, borderColor: colors.primary, borderWidth: 1 }]}
                  placeholder="Código de fábrica (8 dígitos)"
                  placeholderTextColor={colors.muted}
                  value={lockCode}
                  onChangeText={setLockCode}
                  keyboardType="number-pad"
                  maxLength={8}
                />
              </View>
            </View>
            <TouchableOpacity 
              style={[styles.submitButton, { backgroundColor: colors.primary, opacity: loading ? 0.7 : 1 }]} 
              onPress={onRegister}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={styles.submitButtonText}>{loading ? "Processando..." : "Vincular Sistema"}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  headerSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
    marginTop: 10,
  },
  backAction: {
    marginRight: 20,
    padding: 4,
  },
  backIcon: {
    fontSize: 28,
    fontWeight: "bold",
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: -0.5,
  },
  pageSubtitle: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
    marginTop: 2,
  },
  formWrapper: {
    flex: 1,
  },
  instruction: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 32,
  },
  alertBox: {
    backgroundColor: "rgba(217, 75, 75, 0.1)",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(217, 75, 75, 0.3)",
  },
  alertText: {
    color: "#D94B4B",
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
  },
  inputList: {
    gap: 24,
    marginBottom: 40,
  },
  inputContainer: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    marginLeft: 4,
  },
  textInput: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 12,
    fontSize: 16,
  },
  submitButton: {
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#3478D4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});

