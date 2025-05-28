import Evento from "../models/eventos.js";
import { Op } from "sequelize";

// Criar evento
const criarEvento = async (req, res) => {
  try {
    if (!req.userId || req.perfil !== "admin") {
      return res.status(403).json({ mensagem: "Apenas administradores autenticados podem criar eventos." });
    }

    const { titulo, descricao, data, local, imagem: imagemURL } = req.body;
    const imagem = req.file ? req.file.filename : imagemURL;
    if (!imagem) {
      return res.status(400).json({ mensagem: "Imagem obrigatória!" });
    }

    let dataFormatada = data;
    if (data.includes('/')) {
      const [dia, mes, ano] = data.split('/');
      dataFormatada = `${ano}-${mes}-${dia}`;
    }

    const novoEvento = await Evento.create({
      titulo,
      descricao,
      data: dataFormatada,
      local,
      imagem,
      UserId: req.userId,
    });

    res.status(201).json({
      mensagem: "Evento criado com sucesso!",
      evento: novoEvento,
    });
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao criar evento.", erro: erro.message });
  }
};

// Listar eventos com filtros, ordenação e paginação
const listarEventos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const offset = (page - 1) * limit;

    const { titulo, data, local, ordem = "DESC" } = req.query;
    const where = {};

    if (titulo) where.titulo = { [Op.like]: `%${titulo}%` };
    if (data) where.data = data;
    if (local) where.local = { [Op.like]: `%${local}%` };

    const { count, rows } = await Evento.findAndCountAll({
      where,
      limit,
      offset,
      order: [["data", ordem.toUpperCase()]],
    });

    res.status(200).json({
      paginaAtual: page,
      totalPaginas: Math.ceil(count / limit),
      totalEventos: count,
      eventos: rows,
    });
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao listar eventos.", erro: erro.message });
  }
};

// Buscar evento por ID
const buscarEventoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const evento = await Evento.findByPk(id);
    if (!evento) {
      return res.status(404).json({ mensagem: 'Evento não encontrado.' });
    }
    res.status(200).json(evento);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao buscar evento.', erro: erro.message });
  }
};

// Editar evento
const editarEvento = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, data, local, imagem: imagemURL } = req.body;
    const imagem = req.file ? req.file.filename : imagemURL;

    const evento = await Evento.findByPk(id);
    if (!evento) {
      return res.status(404).json({ mensagem: "Evento não encontrado." });
    }

    if (evento.UserId !== req.userId) {
      return res.status(403).json({ mensagem: "Acesso negado." });
    }

    await evento.update({
      titulo: titulo || evento.titulo,
      descricao: descricao || evento.descricao,
      data: data || evento.data,
      local: local || evento.local,
      imagem: imagem || evento.imagem,
    });

    res.status(200).json({ mensagem: "Evento atualizado com sucesso.", evento });
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao editar evento.", erro: erro.message });
  }
};

// Deletar evento
const deletarEvento = async (req, res) => {
  try {
    const { id } = req.params;
    const evento = await Evento.findByPk(id);
    if (!evento) {
      return res.status(404).json({ mensagem: "Evento não encontrado." });
    }

    if (evento.UserId !== req.userId) {
      return res.status(403).json({ mensagem: "Acesso negado." });
    }

    await evento.destroy();
    res.status(200).json({ mensagem: "Evento deletado com sucesso." });
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao deletar evento.", erro: erro.message });
  }
};

export default {
  criarEvento,
  listarEventos,
  editarEvento,
  deletarEvento,
  buscarEventoPorId
};
