import express from "express";
import upload from "../uploadconfig.js";
import eventoController from "../controllers/eventoController.js";
import  { verifyToken }  from "../middlewares/verifyToken.js";

const router = express.Router();

// Criar evento (com imagem e token)
router.post("/", verifyToken, upload.single("imagem"), eventoController.criarEvento);

// Listar eventos (público, com filtros, ordenação e paginação)
router.get("/", eventoController.listarEventos);
router.get("/:id", eventoController.buscarEventoPorId);

// Editar evento (requer token e nova imagem opcional)
router.put("/:id", verifyToken, upload.single("imagem"), eventoController.editarEvento);

// Deletar evento (requer token)
router.delete("/:id", verifyToken, eventoController.deletarEvento);

export default router;



