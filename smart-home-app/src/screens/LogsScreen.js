import React from "react";
import { SafeAreaView, View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { useDoorLogs } from "../hooks/useDoorLogs";

// Importando os novos componentes
import { NavHeader } from "../components/NavHeader";
import { LogCard } from "../components/LogCard";

export function LogsScreen({ navigation }) {
  const { colors } = useTheme();
  const { logs, loading, refreshing, error, refresh } = useDoorLogs();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      
      <NavHeader 
        title="Registro de Atividades" 
        subtitle="LOG DE ACESSOS" 
        onBack={() => navigation.goBack()} 
      />

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
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor={colors.primary} />
            }
            contentContainerStyle={styles.flatListContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.stateContainer}>
                <Text style={[styles.emptyStateText, { color: colors.muted }]}>
                  Nenhum registro de acesso encontrado no sistema.
                </Text>
              </View>
            }
            renderItem={({ item }) => <LogCard item={item} />}
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
});
