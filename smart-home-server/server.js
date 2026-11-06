const express = require("express");
const mqtt = require("mqtt");

const app = express();
const mqttClient = mqtt.connect("mqtt://localhost:1883");

const LED = "fatec/smarthome/led";
const DOOR = "fatec/smarthome/door";
const LED_STATE = LED + "/state";
const DOOR_STATE = DOOR + "/state";

let led = null, door = null, doorAction = null;

mqttClient.on("connect", () => {
    console.log("MQTT conectado!");
    mqttClient.subscribe([LED_STATE, DOOR_STATE], (error) => {
        if (error) console.error("Erro ao assinar estados MQTT:", error);
    });
});

mqttClient.on("message", (topic, msg) => {
    const state = msg.toString();

    if (topic === LED_STATE && (state === "ON" || state === "OFF"))
        led = state === "ON";
    else if (topic === DOOR_STATE) {
        if (state === "OPENING" || state === "CLOSING") {
            doorAction = state.toLowerCase();
        } else if (state === "OPEN" || state === "CLOSED") {
            door = state === "OPEN";
            doorAction = null;
        } else {
            console.error("Estado de porta MQTT inválido:", state);
        }
    } else {
        console.error(`Estado MQTT inválido em ${topic}:`, state);
    }
});

app.get("/status", (req, res) => res.json({ led, door, doorAction }));

app.post("/led/on", (req, res) => {
    mqttClient.publish(LED, "ON");
    res.send("LED ligado");
});

app.post("/led/off", (req, res) => {
    mqttClient.publish(LED, "OFF");
    res.send("LED desligado");
});

function publishDoorCommand(command, res) {
    if (!mqttClient.connected) {
        return res.status(503).send("Conexão MQTT indisponível");
    }

    if (doorAction !== null) {
        return res.status(409).send("A porta já está em movimento");
    }

    const requestedDoorState = command === "OPEN";
    if (door === requestedDoorState) {
        return res.status(409).send("A porta já está nesse estado");
    }

    const previousAction = doorAction;
    doorAction = requestedDoorState ? "opening" : "closing";

    mqttClient.publish(DOOR, command, { qos: 1 }, (error) => {
        if (error) {
            if (doorAction === (requestedDoorState ? "opening" : "closing")) {
                doorAction = previousAction;
            }
            console.error(`Erro ao publicar comando ${command}:`, error);
            return res.status(503).send("Não foi possível enviar o comando");
        }

        res.send(
            requestedDoorState
                ? "Comando de abertura enviado"
                : "Comando de fechamento enviado"
        );
    });
}

app.post("/door/open", (req, res) => publishDoorCommand("OPEN", res));
app.post("/door/close", (req, res) => publishDoorCommand("CLOSE", res));

app.listen(3000, "0.0.0.0", () =>
    console.log("Servidor na porta 3000")
);