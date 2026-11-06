require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const deviceRoutes = require("./routes/deviceRoutes");

const app = express();

// Conectar ao Banco de Dados
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/", authRoutes);
app.use("/", deviceRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
