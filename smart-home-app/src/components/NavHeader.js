import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

export function NavHeader({ title, subtitle, onBack }) {
  const { colors } = useTheme();

  return (
    <View style={[styles.navHeader, { borderBottomColor: "rgba(0,0,0,0.05)" }]}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn} activeOpacity={0.7}>
        <Text style={[styles.backIcon, { color: colors.text }]}>←</Text>
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={[styles.screenTitle, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.screenSubtitle, { color: colors.primary }]}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
  },
  backBtn: {
    padding: 8,
    marginRight: 16,
  },
  backIcon: {
    fontSize: 24,
    fontWeight: "bold",
  },
  titleContainer: {
    flex: 1,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: "800",
  },
  screenSubtitle: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },
});
