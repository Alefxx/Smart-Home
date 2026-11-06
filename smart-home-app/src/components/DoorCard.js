import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { CustomButton } from "./CustomButton";

export function DoorCard({ door, doorAction, online, loading, onOperate }) {
  const { colors } = useTheme();

  const getStatusText = () => {
    if (doorAction === "opening") return "Abrindo...";
    if (doorAction === "closing") return "Fechando...";
    if (door === null) return "Verificando...";
    return door ? "Aberta" : "Fechada";
  };

  const getButtonText = () => {
    if (doorAction === "opening") return "Abrindo...";
    if (doorAction === "closing") return "Fechando...";
    return door ? "Fechar porta" : "Abrir porta";
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <Text style={[styles.name, { color: colors.text }]}>🚪 Porta</Text>
      <Text style={{ color: colors.text, marginVertical: 15 }}>
        {getStatusText()}
      </Text>
      <CustomButton
        label={getButtonText()}
        onPress={onOperate}
        disabled={door === null || doorAction !== null}
        loading={loading}
        online={online}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 18, borderRadius: 16, marginBottom: 14 },
  name: { fontSize: 18, fontWeight: "bold" },
});
