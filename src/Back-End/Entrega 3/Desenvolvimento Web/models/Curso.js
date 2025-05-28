import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Curso = sequelize.define('Curso', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  cargaHoraria: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nivel: {
    type: DataTypes.ENUM('iniciante', 'intermediário', 'avançado'),
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imagem: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

export default Curso;
