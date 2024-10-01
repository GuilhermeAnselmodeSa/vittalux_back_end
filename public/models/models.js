const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database'); // Certifique-se de importar a instância do Sequelize

// Definição da model cadastros
const Cadastros = sequelize.define('cadastros', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cpf: {
    type: DataTypes.STRING(11), // CPF deve ter 11 caracteres
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  cep: {
    type: DataTypes.STRING(8), // CEP deve ter 8 caracteres
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
    type: DataTypes.STRING(2), // Estado deve ter 2 caracteres (sigla)
    allowNull: false,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Cadastros', // Nome da model
  tableName: 'cadastros', // Nome da tabela no banco de dados
  timestamps: true, // Cria createdAt e updatedAt automaticamente
});

module.exports = { Cadastros };  // Exporta corretamente a model
