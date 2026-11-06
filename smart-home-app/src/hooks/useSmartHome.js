import { useState, useEffect } from "react";
import { fetchStatus, sendCommand } from "../services/api";
import { useAuthContext } from "../contexts/AuthContext";

export function useSmartHome() {
  const [led, setLed] = useState(null);
  const [door, setDoor] = useState(null);
  const [doorAction, setDoorAction] = useState(null);
  const [online, setOnline] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useAuthContext();

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

  const requestAction = async (path, optimisticUpdate, payload = null) => {
    try {
      setLoading(true);
      await sendCommand(path, payload);
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
    const path = isOpening ? "/door/open" : "/door/close";

    // Envia os dados do usuário para o servidor registrar quem acionou
    const userPayload = {
      userId: user?.id,
      userName: user?.name || "Usuário Desconhecido",
    };

    requestAction(
      path,
      () => setDoorAction(isOpening ? "opening" : "closing"),
      userPayload
    );
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
