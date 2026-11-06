import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

export function CustomInput({ label, highlightBorder, ...rest }) {
  const { colors } = useTheme();

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.inputLabel, { color: colors.text }]}>{label}</Text>
      <TextInput
        style={[
          styles.textInput,
          { backgroundColor: colors.card, color: colors.text },
          highlightBorder && { borderColor: colors.primary, borderWidth: 1 }
        ]}
        placeholderTextColor={colors.muted}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
});
