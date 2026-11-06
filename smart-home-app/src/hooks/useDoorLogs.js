import { useState, useEffect } from "react";
import { fetchDoorLogs } from "../services/api";

export function useDoorLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const loadLogs = async () => {
    try {
      setError(null);
      const data = await fetchDoorLogs();
      setLogs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const refresh = () => {
    setRefreshing(true);
    loadLogs();
  };

  return { logs, loading, refreshing, error, refresh };
}
