const { Sequelize } = require('sequelize');

// Configurando a instância do Sequelize
const sequelize = new Sequelize('vittalux', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', // ou 'mariadb' se você estiver usando MariaDB
});

// Testando a conexão
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
})();

module.exports = sequelize;