import React, { useState, useEffect } from "react";
import {
  SafeAreaView, View, Text, Switch,
  TouchableOpacity, StyleSheet, StatusBar
} from "react-native";

const SERVER = "http://10.68.75.140:3000";

export default function App() {
  const [led, setLed] = useState(null);
  const [door, setDoor] = useState(null);
  const [doorAction, setDoorAction] = useState(null);
  const [online, setOnline] = useState(false);
  const [dark, setDark] = useState(false);
  const [loading, setLoading] = useState(false);

  const bg = dark ? "#0B1220" : "#F5F7F8";
  const card = dark ? "#141F2D" : "#FFFFFF";
  const color = dark ? "#F4F7FA" : "#172126";

  async function request(path) {
    try {
      setLoading(true);
      const r = await fetch(SERVER + path, { method: "POST" });
      if (!r.ok) throw new Error();
      if (path === "/led/on") setLed(true);
      if (path === "/led/off") setLed(false);
      if (path === "/door/open") setDoorAction("opening");
      if (path === "/door/close") setDoorAction("closing");
    } catch {
      alert("Erro ao conectar ao Smart Home.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let active = true;

    async function status() {
      try {
        const r = await fetch(SERVER + "/status");
        const s = await r.json();
        if (active) {
          setLed(s.led);
          setDoor(s.door);
          setDoorAction(
            s.doorAction === "opening" || s.doorAction === "closing"
              ? s.doorAction
              : null
          );
          setOnline(typeof s.led === "boolean" &&
                    typeof s.door === "boolean");
        }
      } catch {
        if (active) setOnline(false);
      }
    }

    status();
    const timer = setInterval(status, 1000);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, []);

  const button = (label, action, disabled = false) => {
    const unavailable = disabled || loading || !online;

    return (
      <TouchableOpacity
        onPress={action}
        disabled={unavailable}
        style={[styles.button, unavailable && { opacity: 0.45 }]}
      >
        <Text style={styles.buttonText}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
      <StatusBar barStyle={dark ? "light-content" : "dark-content"} />

      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color }]}>Smart Home</Text>
          <Text style={{ color: "#89949A" }}>Controle sua casa</Text>
        </View>
        <Text style={{ color: online ? "#27AE60" : "#D94B4B" }}>
          {online ? "Online" : "Offline"}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.card, { backgroundColor: card }]}
        onPress={() => setDark(!dark)}
      >
        <Text style={{ color }}> {dark ? "☀️ Modo claro" : "🌙 Modo escuro"} </Text>
      </TouchableOpacity>

      <Text style={[styles.section, { color }]}>Dispositivos</Text>

      <View style={[styles.card, { backgroundColor: card }]}>
        <Text style={[styles.name, { color }]}>💡 Iluminação</Text>
        <View style={styles.row}>
          <Text style={{ color }}>
            {led === null ? "Verificando..." : led ? "Ligada" : "Desligada"}
          </Text>
          <Switch
            value={led === true}
            onValueChange={v => request(v ? "/led/on" : "/led/off")}
            disabled={led === null || !online || loading}
          />
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: card }]}>
        <Text style={[styles.name, { color }]}>🚪 Porta</Text>
        <Text style={{ color, marginVertical: 15 }}>
          {doorAction === "opening"
            ? "Abrindo..."
            : doorAction === "closing"
              ? "Fechando..."
              : door === null
                ? "Verificando..."
                : door
                  ? "Aberta"
                  : "Fechada"}
        </Text>
        {button(
          doorAction === "opening"
            ? "Abrindo..."
            : doorAction === "closing"
              ? "Fechando..."
              : door
                ? "Fechar porta"
                : "Abrir porta",
          () => request(door ? "/door/close" : "/door/open"),
          door === null || doorAction !== null
        )}
      </View>

      <Text style={[styles.footer, { color: "#89949A" }]}>
        ESP32 • MQTT • Smart Home
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: {
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "center", marginVertical: 20
  },
  title: { fontSize: 28, fontWeight: "bold" },
  section: { fontSize: 19, fontWeight: "bold", marginBottom: 10 },
  card: { padding: 18, borderRadius: 16, marginBottom: 14 },
  name: { fontSize: 18, fontWeight: "bold" },
  row: {
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "center", marginTop: 12
  },
  button: {
    backgroundColor: "#3478D4", padding: 14,
    borderRadius: 12, alignItems: "center"
  },
  buttonText: { color: "#FFF", fontWeight: "bold" },
  footer: { textAlign: "center", marginTop: "auto", padding: 15 }
});