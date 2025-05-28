import express from 'express';
import { login, register } from '../controllers/authController.js';

const router = express.Router();

// Rota de cadastro
router.post("/register", register);

// Rota de login
router.post("/login", login);

export default router;