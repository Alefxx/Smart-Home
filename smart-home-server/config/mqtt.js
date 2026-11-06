const mqtt = require("mqtt");

const MQTT_BROKER = process.env.MQTT_BROKER || "mqtt://localhost:1883";
const mqttClient = mqtt.connect(MQTT_BROKER);

const LED = "fatec/smarthome/led";
const DOOR = "fatec/smarthome/door";
const LED_STATE = `${LED}/state`;
const DOOR_STATE = `${DOOR}/state`;

let state = {
  led: null,
  door: null,
  doorAction: null,
};

mqttClient.on("connect", () => {
  console.log("MQTT conectado!");
  mqttClient.subscribe([LED_STATE, DOOR_STATE], (error) => {
    if (error) console.error("Erro ao assinar tópicos MQTT:", error);
  });
});

mqttClient.on("message", (topic, msg) => {
  const msgStr = msg.toString();

  if (topic === LED_STATE && (msgStr === "ON" || msgStr === "OFF")) {
    state.led = msgStr === "ON";
  } else if (topic === DOOR_STATE) {
    if (msgStr === "OPENING" || msgStr === "CLOSING") {
      state.doorAction = msgStr.toLowerCase();
    } else if (msgStr === "OPEN" || msgStr === "CLOSED") {
      state.door = msgStr === "OPEN";
      state.doorAction = null;
    } else {
      console.error("Estado de porta MQTT inválido:", msgStr);
    }
  } else {
    console.error(`Estado MQTT inválido em ${topic}:`, msgStr);
  }
});

// Função injetável para acionar a luz por rotinas do servidor
const publishLedOn = () => {
  if (mqttClient.connected) {
    mqttClient.publish(LED, "ON");
  }
};

module.exports = {
  mqttClient,
  state,
  LED,
  DOOR,
  publishLedOn,
};

