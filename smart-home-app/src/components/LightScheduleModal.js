import React, { useState } from "react";
import { Modal, View, Text, StyleSheet, Switch, TextInput, TouchableOpacity } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

export function LightScheduleModal({ visible, onClose, onSave }) {
  const { colors } = useTheme();
  const [enabled, setEnabled] = useState(false);
  const [time, setTime] = useState("18:00");

  const handleSave = () => {
    onSave({ enabled, time });
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.modalCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.title, { color: colors.text }]}>Agendar Iluminação</Text>
          <Text style={[styles.subtitle, { color: colors.muted }]}>Defina o horário automático para ligar a luz</Text>

          <View style={styles.row}>
            <Text style={[styles.label, { color: colors.text }]}>Ativar Agendamento</Text>
            <Switch
              value={enabled}
              onValueChange={setEnabled}
              trackColor={{ false: "rgba(0,0,0,0.2)", true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: colors.muted }]}>HORÁRIO (HH:MM)</Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: colors.bg, color: colors.text, opacity: enabled ? 1 : 0.4 }
              ]}
              value={time}
              onChangeText={setTime}
              placeholder="18:00"
              placeholderTextColor={colors.muted}
              editable={enabled}
              maxLength={5}
            />
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.btn, styles.cancelBtn]} onPress={onClose} activeOpacity={0.7}>
              <Text style={[styles.btnText, { color: colors.muted }]}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.btn, { backgroundColor: colors.primary }]} 
              onPress={handleSave} 
              activeOpacity={0.8}
            >
              <Text style={[styles.btnText, { color: "#FFFFFF" }]}>Salvar Alterações</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalCard: {
    width: "100%",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  label: {
    fontSize: 15,
    fontWeight: "700",
  },
  inputContainer: {
    marginBottom: 32,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 8,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  btn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelBtn: {
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  btnText: {
    fontWeight: "700",
    fontSize: 14,
  },
});

