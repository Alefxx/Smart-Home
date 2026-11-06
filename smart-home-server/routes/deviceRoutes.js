const express = require("express");
const router = express.Router();
const {
  getStatus,
  turnLedOn,
  turnLedOff,
  openDoor,
  closeDoor,
  getDoorLogs,
} = require("../controllers/deviceController");

router.get("/status", getStatus);
router.post("/led/on", turnLedOn);
router.post("/led/off", turnLedOff);
router.post("/door/open", openDoor);
router.post("/door/close", closeDoor);

// --- NOVA ROTA DE LOGS ---
router.get("/door/logs", getDoorLogs);

module.exports = router;

