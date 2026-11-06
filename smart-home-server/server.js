require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const deviceRoutes = require("./routes/deviceRoutes");

// IMPORTA O SERVIÇO DE CRON
const { initCronJobs } = require("./services/cronService");

const app = express();

// Conectar ao Banco de Dados e, em seguida, inicia as rotinas de tempo
connectDB().then(() => {
  initCronJobs();
});

app.use(cors());
app.use(express.json());

app.use("/", authRoutes);
app.use("/", deviceRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

