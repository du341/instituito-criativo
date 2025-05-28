import express from 'express';
import cursoController from '../controllers/cursoController.js';
import upload from '../uploadconfig.js';
import { verifyToken, permitirPerfil } from '../middlewares/verifyToken.js';

const router = express.Router();

// Listar todos os cursos – público
router.get('/', cursoController.listarCursos);

// Buscar curso por ID – público
router.get('/:id', cursoController.buscarCursoPorId);

// Criar curso – permitido para admin ou professor
router.post(
  '/',
  verifyToken,
  permitirPerfil('admin', 'professor'),
  upload.single('imagem'),
  cursoController.criarCurso
);

// Atualizar curso – permitido para admin ou professor
router.put(
  '/:id',
  verifyToken,
  permitirPerfil('admin', 'professor'),
  upload.single('imagem'),
  cursoController.atualizarCurso
);

// Deletar curso – permitido para admin ou professor
router.delete(
  '/:id',
  verifyToken,
  permitirPerfil('admin', 'professor'),
  cursoController.deletarCurso
);

export default router;
