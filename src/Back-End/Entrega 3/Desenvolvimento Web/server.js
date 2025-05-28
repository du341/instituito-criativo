import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import sequelize from "./config/db.js";

import cursoRoutes from './routes/cursoRoutes.js';
import authRoutes from "./routes/authRoutes.js";
import eventoRoutes from "./routes/eventoRoutes.js";

const app = express();

// Segurança e performance
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Libera acesso às imagens da pasta uploads (para funcionar com frontend em outra porta)
app.use('/uploads', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
app.use('/uploads', express.static('uploads'));

//  Aplica rate limit apenas no /auth
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 50,
  message: "Muitas tentativas. Tente novamente mais tarde.",
});

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/eventos", eventoRoutes);
app.use("/api/cursos", cursoRoutes);

// Sincronização com banco
sequelize.sync({ alter: true }).then(() => {
  console.log('Modelos sincronizados com o banco de dados!');
});

// Rota padrão
app.get("/", (req, res) => res.send("API está funcionando!"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
