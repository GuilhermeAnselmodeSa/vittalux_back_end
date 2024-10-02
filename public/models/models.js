const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database'); // Ajuste o caminho conforme necessário
const { Sequelize } = require('sequelize');

// Definição da model cadastros
const Cadastros = sequelize.define('cadastros', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cpf: {
    type: DataTypes.STRING(11),
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  cep: {
    type: DataTypes.STRING(8),
    allowNull: false,
  },
  rua: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numero: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  complemento: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bairro: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING(2),
    allowNull: false,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Cadastros',
  tableName: 'cadastros',
  timestamps: true,
});

module.exports = { Cadastros };