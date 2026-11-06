const cron = require("node-cron");
const LightSchedule = require("../models/LightSchedule");
const { publishLedOn } = require("../config/mqtt");

// CACHE EM MEMÓRIA: Evita consultar o MongoDB a cada minuto
let cachedSchedule = {
  enabled: false,
  time: "18:00",
};

// Função para atualizar o cache na inicialização ou quando o usuário editar
const updateScheduleCache = async () => {
  try {
    let schedule = await LightSchedule.findOne();
    if (schedule) {
      cachedSchedule.enabled = schedule.enabled;
      cachedSchedule.time = schedule.time;
    }
  } catch (error) {
    console.error("Erro ao atualizar cache de agendamento:", error);
  }
};

const initCronJobs = async () => {
  // Carrega a configuração do banco para a memória ao ligar o servidor
  await updateScheduleCache();

  // Executa a cada minuto ('* * * * *')
  cron.schedule("* * * * *", () => {
    if (!cachedSchedule.enabled) return; // Se estiver desligado, ignora.

    const now = new Date();
    // Pega hora atual com zero à esquerda (ex: "09:05") considerando fuso do servidor
    const currentHour = String(now.getHours()).padStart(2, "0");
    const currentMinute = String(now.getMinutes()).padStart(2, "0");
    const currentTimeString = `${currentHour}:${currentMinute}`;

    if (currentTimeString === cachedSchedule.time) {
      console.log(`[Cron] Horário atingido (${cachedSchedule.time}). Ligando a luz!`);
      publishLedOn();
    }
  });

  console.log("Serviço de agendamento (Cron) iniciado.");
};

module.exports = {
  initCronJobs,
  updateScheduleCache, // Exportado para ser chamado pelo Controller quando o usuário salvar
};

