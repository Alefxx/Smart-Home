const express = require("express");
const router = express.Router();
const {
  getStatus,
  turnLedOn,
  turnLedOff,
  openDoor,
  closeDoor,
  getDoorLogs,
  updateSchedule,
} = require("../controllers/deviceController");

router.get("/status", getStatus);
router.post("/led/on", turnLedOn);
router.post("/led/off", turnLedOff);
router.post("/door/open", openDoor);
router.post("/door/close", closeDoor);
router.get("/door/logs", getDoorLogs);

// --- NOVA ROTA DE AGENDAMENTO ---
router.post("/led/schedule", updateSchedule);

module.exports = router;

