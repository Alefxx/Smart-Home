export const SERVER = "http://10.68.75.140:3000";

export const fetchStatus = async () => {
  const response = await fetch(`${SERVER}/status`);
  if (!response.ok) throw new Error("Erro de rede");
  return response.json();
};

export const sendCommand = async (path, body = null) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${SERVER}${path}`, options);
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

export const loginUser = async (credentials) => {
  const response = await fetch(`${SERVER}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Erro ao realizar login");
  }
  return response.json();
};

// --- NOVO: BUSCAR HISTÓRICO DE ABERTURAS DA TRANCA ---
export const fetchDoorLogs = async () => {
  const response = await fetch(`${SERVER}/door/logs`);
  if (!response.ok) throw new Error("Erro ao carregar histórico de acessos");
  return response.json();
};
