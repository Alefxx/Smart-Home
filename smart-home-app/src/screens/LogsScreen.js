import React from "react";
import { SafeAreaView, View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { useDoorLogs } from "../hooks/useDoorLogs";

export function LogsScreen({ navigation }) {
  const { colors } = useTheme();
  const { logs, loading, refreshing, error, refresh } = useDoorLogs();

  const formatDateTime = (isoString) => {
    if (!isoString) return { date: "-", time: "-" };
    const dateObj = new Date(isoString);
    const date = dateObj.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
    const time = dateObj.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    return { date, time };
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.7}>
          <Text style={[styles.backIcon, { color: colors.text }]}>←</Text>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={[styles.screenTitle, { color: colors.text }]}>Registro de Atividades</Text>
          <Text style={[styles.screenSubtitle, { color: colors.primary }]}>LOG DE ACESSOS</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        {loading ? (
          <View style={styles.stateContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : error ? (
          <View style={styles.stateContainer}>
            <Text style={[styles.errorMsg, { color: colors.offline }]}>{error}</Text>
            <TouchableOpacity onPress={refresh} style={[styles.retryButton, { backgroundColor: colors.primary }]}>
              <Text style={styles.retryButtonText}>Sincronizar Novamente</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={logs}
            keyExtractor={(item, index) => item._id || String(index)}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor={colors.primary} />}
            contentContainerStyle={styles.flatListContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.stateContainer}>
                <Text style={[styles.emptyStateText, { color: colors.muted }]}>Nenhum registro de acesso encontrado no sistema.</Text>
              </View>
            }
            renderItem={({ item }) => {
              const { date, time } = formatDateTime(item.createdAt || item.timestamp);
              const isOpen = item.action === "OPEN";
              return (
                <View style={[styles.logItem, { backgroundColor: colors.card }]}>
                  <View style={styles.logAvatar}>
                    <Text style={styles.avatarIcon}>👤</Text>
                  </View>
                  <View style={styles.logDetails}>
                    <Text style={[styles.logUser, { color: colors.text }]}>{item.userName || "Usuário do Sistema"}</Text>
                    <Text style={[styles.logTime, { color: colors.muted }]}>{date} às {time}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: isOpen ? "rgba(39, 174, 96, 0.1)" : "rgba(217, 75, 75, 0.1)" }]}>
                    <Text style={[styles.statusText, { color: isOpen ? colors.online : colors.offline }]}>
                      {isOpen ? "ABERTO" : "FECHADO"}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
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
  listContainer: {
    flex: 1,
  },
  flatListContent: {
    padding: 24,
    paddingBottom: 40,
  },
  stateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    marginTop: 60,
  },
  errorMsg: {
    textAlign: "center",
    marginBottom: 24,
    fontSize: 16,
    fontWeight: "500",
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#FFF",
    fontWeight: "700",
  },
  emptyStateText: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
  },
  logItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  logAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarIcon: {
    fontSize: 20,
  },
  logDetails: {
    flex: 1,
  },
  logUser: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  logTime: {
    fontSize: 13,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});

