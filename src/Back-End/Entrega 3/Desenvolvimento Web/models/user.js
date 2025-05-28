import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('User', {
  
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  perfil: {
  type: DataTypes.ENUM("admin", "professor", "aluno"),
  allowNull: false,
  defaultValue: "aluno"
}
});

export default User;

