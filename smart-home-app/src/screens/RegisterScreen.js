import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../hooks/useAuth";

// Importando os novos componentes
import { CustomInput } from "../components/CustomInput";
import { CustomButton } from "../components/CustomButton";
import { ErrorMessage } from "../components/ErrorMessage";

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
            
            <ErrorMessage message={error} />

            <View style={styles.inputList}>
              <CustomInput
                label="NOME DE EXIBIÇÃO"
                placeholder="Seu nome completo"
                value={name}
                onChangeText={setName}
              />
              
              <CustomInput
                label="CREDENCIAL DE ACESSO"
                placeholder="E-mail principal"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              
              <CustomInput
                label="CHAVE DE SEGURANÇA"
                placeholder="Mínimo de 8 caracteres"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              
              <CustomInput
                label="CÓDIGO DE HARDWARE"
                placeholder="Código de fábrica (8 dígitos)"
                value={lockCode}
                onChangeText={setLockCode}
                keyboardType="number-pad"
                maxLength={8}
                highlightBorder={true}
              />
            </View>

            <CustomButton 
              title={loading ? "Processando..." : "Vincular Sistema"}
              onPress={onRegister}
              loading={loading}
            />
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
  inputList: {
    gap: 24,
    marginBottom: 40,
  },
});
