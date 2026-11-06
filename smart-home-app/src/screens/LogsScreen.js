import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { useDoorLogs } from "../hooks/useDoorLogs";

export function LogsScreen({ navigation }) {
  const { colors } = useTheme();
  const { logs, loading, refreshing, error, refresh } = useDoorLogs();

  const formatDate = (isoString) => {
    if (!isoString) return "-";
    const date = new Date(isoString);
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={{ color: colors.primary, fontSize: 16, fontWeight: "bold" }}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}> Histórico da Tranca</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
      ) : error ? (
        <View style={styles.centerContainer}>
          <Text style={{ color: colors.offline, marginBottom: 10 }}>{error}</Text>
          <TouchableOpacity onPress={refresh} style={[styles.retryBtn, { backgroundColor: colors.primary }]}>
            <Text style={{ color: "#FFF", fontWeight: "bold" }}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={logs}
          keyExtractor={(item, index) => item._id || String(index)}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
          ListEmptyComponent={
            <Text style={[styles.emptyText, { color: colors.muted }]}>
              Nenhum acionamento registrado ainda.
            </Text>
          }
          renderItem={({ item }) => (
            <View style={[styles.logCard, { backgroundColor: colors.card }]}>
              <View style={styles.logRow}>
                <Text style={[styles.userName, { color: colors.text }]}>
                  👤 {item.userName || "Usuário"}
                </Text>
                <Text
                  style={[
                    styles.actionBadge,
                    { color: item.action === "OPEN" ? colors.online : colors.primary },
                  ]}
                >
                  {item.action === "OPEN" ? "🔓 Aberta" : "🔒 Fechada"}
                </Text>
              </View>
              <Text style={[styles.dateText, { color: colors.muted }]}>
                🕒 {formatDate(item.createdAt || item.timestamp)}
              </Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  headerRow: { flexDirection: "row", alignItems: "center", marginBottom: 20, marginTop: 10 },
  backButton: { marginRight: 15 },
  title: { fontSize: 22, fontWeight: "bold" },
  centerContainer: { alignItems: "center", marginTop: 40 },
  retryBtn: { padding: 12, borderRadius: 8 },
  emptyText: { textAlign: "center", marginTop: 40, fontSize: 16 },
  logCard: { padding: 16, borderRadius: 12, marginBottom: 12 },
  logRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  userName: { fontSize: 16, fontWeight: "bold" },
  actionBadge: { fontWeight: "bold", fontSize: 15 },
  dateText: { fontSize: 14 },
});
