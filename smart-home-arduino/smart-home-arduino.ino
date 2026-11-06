#include <WiFi.h>
#include <PubSubClient.h>

const char* WIFI_SSID = "Fatec-Salas";
const char* WIFI_PASSWORD = "fatecatb";
const char* MQTT_HOST = "10.68.75.140";

WiFiClient espClient;
PubSubClient mqtt(espClient);

const char* LED_TOPIC = "fatec/smarthome/led";
const char* DOOR_TOPIC = "fatec/smarthome/door";
const char* LED_STATE = "fatec/smarthome/led/state";
const char* DOOR_STATE = "fatec/smarthome/door/state";

#define LED_PIN 4
#define RELAY_PIN 5

constexpr unsigned long DOOR_PULSE_MS = 500;

enum DoorAction {
  DOOR_IDLE,
  DOOR_OPENING,
  DOOR_CLOSING
};

bool doorOpen = false;
bool targetDoorOpen = false;
DoorAction doorAction = DOOR_IDLE;
unsigned long doorActionStartedAt = 0;

void publishDoorState() {
  if (doorAction == DOOR_OPENING) {
    mqtt.publish(DOOR_STATE, "OPENING", true);
  } else if (doorAction == DOOR_CLOSING) {
    mqtt.publish(DOOR_STATE, "CLOSING", true);
  } else {
    mqtt.publish(DOOR_STATE, doorOpen ? "OPEN" : "CLOSED", true);
  }
}

void startDoorAction(bool open) {
  if (doorAction != DOOR_IDLE) {
    return;
  }

  if (doorOpen == open) {
    publishDoorState();
    return;
  }

  targetDoorOpen = open;
  doorAction = open ? DOOR_OPENING : DOOR_CLOSING;
  doorActionStartedAt = millis();
  digitalWrite(RELAY_PIN, HIGH);
  publishDoorState();
}

void callback(char* topic, byte* payload, unsigned int length) {
  String cmd;

  for (unsigned int i = 0; i < length; i++)
    cmd += (char)payload[i];

  cmd.trim();
  cmd.toUpperCase();

  if (strcmp(topic, LED_TOPIC) == 0) {
    digitalWrite(LED_PIN, cmd == "ON" ? HIGH : LOW);
    mqtt.publish(LED_STATE, cmd == "ON" ? "ON" : "OFF", true);
  }

  if (strcmp(topic, DOOR_TOPIC) == 0) {
    if (cmd == "OPEN") {
      startDoorAction(true);
    } else if (cmd == "CLOSE") {
      startDoorAction(false);
    }
  }
}

void reconnect() {
  if (!mqtt.connected() && WiFi.status() == WL_CONNECTED) {
    if (mqtt.connect("ESP32_SMART_HOME")) {
      mqtt.subscribe(LED_TOPIC);
      mqtt.subscribe(DOOR_TOPIC);
      mqtt.publish(LED_STATE, digitalRead(LED_PIN) == HIGH ? "ON" : "OFF", true);
      publishDoorState();
    }
  }
}

void setup() {
  Serial.begin(115200);

  pinMode(LED_PIN, OUTPUT);
  pinMode(RELAY_PIN, OUTPUT);

  digitalWrite(LED_PIN, LOW);
  digitalWrite(RELAY_PIN, LOW);

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  mqtt.setServer(MQTT_HOST, 1883);
  mqtt.setCallback(callback);
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    if (!mqtt.connected())
      reconnect();

    mqtt.loop();
  }

  if (doorAction != DOOR_IDLE &&
      millis() - doorActionStartedAt >= DOOR_PULSE_MS) {
    digitalWrite(RELAY_PIN, LOW);
    doorOpen = targetDoorOpen;
    doorAction = DOOR_IDLE;
    publishDoorState();
  }
}