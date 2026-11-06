export const SERVER = "http://10.68.75.140:3000";

export const fetchStatus = async () => {
  const response = await fetch(`${SERVER}/status`);
  if (!response.ok) throw new Error("Erro de rede");
  return response.json();
};

export const sendCommand = async (path) => {
  const response = await fetch(`${SERVER}${path}`, { method: "POST" });
  if (!response.ok) throw new Error("Erro ao enviar comando");
  return response;
};

export const registerUser = async (userData) => {
  const response = await fetch(`${SERVER}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Erro ao cadastrar");
  }
  return response.json();
};
