import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Lista de perfis permitidos
const perfisPermitidos = ['admin', 'professor', 'aluno'];

// Cadastro de usuário
export const register = async (req, res) => {
  const { nome, email, senha, perfil } = req.body;

  try {
    const existeUsuario = await User.findOne({ where: { email } });
    if (existeUsuario) {
      return res.status(400).json({ mensagem: "E-mail já cadastrado." });
    }

    // Validação do perfil
    const perfilValidado = perfisPermitidos.includes(perfil) ? perfil : 'aluno';

    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = await User.create({
      nome,
      email,
      senha: senhaHash,
      perfil: perfilValidado
    });

    res.status(201).json({
      mensagem: "Usuário cadastrado com sucesso!",
      usuario: {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        perfil: novoUsuario.perfil
      }
    });
  } catch (erro) {
    console.error("Erro ao cadastrar:", erro);
    res.status(500).json({ mensagem: "Erro ao cadastrar usuário.", erro: erro.message });
  }
};

// Login do usuário
export const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await User.findOne({ where: { email } });
    if (!usuario) {
      return res.status(400).json({ mensagem: "Usuário não encontrado." });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: "Senha incorreta." });
    }

    const token = jwt.sign(
      { id: usuario.id, perfil: usuario.perfil },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({
      mensagem: "Login realizado com sucesso!",
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        perfil: usuario.perfil
      }
    });
  } catch (erro) {
    console.error("Erro ao fazer login:", erro);
    res.status(500).json({ mensagem: "Erro ao fazer login.", erro: erro.message });
  }
};
