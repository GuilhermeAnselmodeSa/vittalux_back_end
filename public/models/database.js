const { Sequelize } = require('sequelize');
require('dotenv').config(); // Carrega o arquivo .env

// Configurando a instância do Sequelize
const sequelize = new Sequelize(process.env.DB, process.env.ROOT, process.env.PSS, {
  host: process.env.HOST, // Use a variável de ambiente para o host
  dialect: 'mariadb', // ou 'mariadb' se você estiver usando MariaDB
  port: 3306,
  dialectOptions: {
    connectTimeout: 10000 // Aumenta o tempo de timeout para 10 segundos
  }
});

// Testando a conexão
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error.message);
  }
})();

module.exports = sequelize;
