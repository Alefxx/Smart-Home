import { useState, useEffect } from "react";
import { fetchStatus, sendCommand } from "../services/api";

export function useSmartHome() {
  const [led, setLed] = useState(null);
  const [door, setDoor] = useState(null);
  const [doorAction, setDoorAction] = useState(null);
  const [online, setOnline] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    async function getStatus() {
      try {
        const s = await fetchStatus();
        if (active) {
          setLed(s.led);
          setDoor(s.door);
          setDoorAction(
            s.doorAction === "opening" || s.doorAction === "closing"
              ? s.doorAction
              : null
          );
          setOnline(typeof s.led === "boolean" && typeof s.door === "boolean");
        }
      } catch {
        if (active) setOnline(false);
      }
    }

    getStatus();
    const timer = setInterval(getStatus, 1000);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, []);

  const requestAction = async (path, optimisticUpdate) => {
    try {
      setLoading(true);
      await sendCommand(path);
      optimisticUpdate();
    } catch {
      alert("Erro ao conectar ao Smart Home.");
    } finally {
      setLoading(false);
    }
  };

  const toggleLed = (value) => {
    requestAction(value ? "/led/on" : "/led/off", () => setLed(value));
  };

  const operateDoor = () => {
    const isOpening = !door;
    requestAction(isOpening ? "/door/open" : "/door/close", () => {
      setDoorAction(isOpening ? "opening" : "closing");
    });
  };

  return {
    led,
    door,
    doorAction,
    online,
    loading,
    toggleLed,
    operateDoor,
  };
}
