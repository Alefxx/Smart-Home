const { mqttClient, state, LED, DOOR } = require("../config/mqtt");

const getStatus = (req, res) => {
  res.json({
    led: state.led,
    door: state.door,
    doorAction: state.doorAction,
  });
};

const turnLedOn = (req, res) => {
  mqttClient.publish(LED, "ON");
  res.send("LED ligado");
};

const turnLedOff = (req, res) => {
  mqttClient.publish(LED, "OFF");
  res.send("LED desligado");
};

const publishDoorCommand = (command, res) => {
  if (!mqttClient.connected) {
    return res.status(503).send("Conexão MQTT indisponível");
  }

  if (state.doorAction !== null) {
    return res.status(409).send("A porta já está em movimento");
  }

  const requestedDoorState = command === "OPEN";
  if (state.door === requestedDoorState) {
    return res.status(409).send("A porta já está nesse estado");
  }

  const previousAction = state.doorAction;
  state.doorAction = requestedDoorState ? "opening" : "closing";

  mqttClient.publish(DOOR, command, { qos: 1 }, (error) => {
    if (error) {
      if (state.doorAction === (requestedDoorState ? "opening" : "closing")) {
        state.doorAction = previousAction;
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
};

const openDoor = (req, res) => publishDoorCommand("OPEN", res);
const closeDoor = (req, res) => publishDoorCommand("CLOSE", res);

module.exports = {
  getStatus,
  turnLedOn,
  turnLedOff,
  openDoor,
  closeDoor,
};
