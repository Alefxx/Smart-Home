const { mqttClient, state, LED, DOOR } = require("../config/mqtt");
const DoorLog = require("../models/DoorLog");
// Caminho corrigido com "../" para sair da pasta controllers e entrar na pasta models
const LightSchedule = require("../models/LightSchedule");
const { updateScheduleCache } = require("../services/cronService");

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

const updateSchedule = async (req, res) => {
  try {
    const { enabled, time } = req.body;

    let schedule = await LightSchedule.findOne();
    
    if (schedule) {
      schedule.enabled = enabled;
      schedule.time = time;
      await schedule.save();
    } else {
      await LightSchedule.create({ enabled, time });
    }

    await updateScheduleCache();

    res.json({ message: "Agendamento da luz atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao salvar agendamento:", error);
    res.status(500).json({ message: "Erro interno ao salvar agendamento." });
  }
};

const publishDoorCommand = (command, req, res) => {
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

  mqttClient.publish(DOOR, command, { qos: 1 }, async (error) => {
    if (error) {
      if (state.doorAction === (requestedDoorState ? "opening" : "closing")) {
        state.doorAction = previousAction;
      }
      console.error(`Erro ao publicar comando ${command}:`, error);
      return res.status(503).send("Não foi possível enviar o comando");
    }

    try {
      const { userId, userName } = req.body || {};
      await DoorLog.create({
        userId: userId || null,
        userName: userName || "Usuário Desconhecido",
        action: command,
      });
    } catch (logError) {
      console.error("Erro ao salvar log no banco:", logError);
    }

    res.send(
      requestedDoorState
        ? "Comando de abertura enviado"
        : "Comando de fechamento enviado"
    );
  });
};

const openDoor = (req, res) => publishDoorCommand("OPEN", req, res);
const closeDoor = (req, res) => publishDoorCommand("CLOSE", req, res);

const getDoorLogs = async (req, res) => {
  try {
    const logs = await DoorLog.find()
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(logs);
  } catch (error) {
    console.error("Erro ao buscar logs da porta:", error);
    res.status(500).json({ message: "Erro ao buscar histórico de acessos." });
  }
};

module.exports = {
  getStatus,
  turnLedOn,
  turnLedOff,
  openDoor,
  closeDoor,
  getDoorLogs,
  updateSchedule,
};

