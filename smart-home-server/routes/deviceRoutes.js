const express = require("express");
const router = express.Router();
const {
  getStatus,
  turnLedOn,
  turnLedOff,
  openDoor,
  closeDoor,
} = require("../controllers/deviceController");

router.get("/status", getStatus);
router.post("/led/on", turnLedOn);
router.post("/led/off", turnLedOff);
router.post("/door/open", openDoor);
router.post("/door/close", closeDoor);

module.exports = router;
