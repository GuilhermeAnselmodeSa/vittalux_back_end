const express = require('express');
const { Cadastros } = require('../public/models/models'); // Supondo que você tenha um modelo User já configurado
const router = express.Router();
const mysql = require('mysql2/promise');
require('dotenv').config(); // Carrega o arquivo .env

// Configuração da conexão com o banco de dados MariaDB
const pool = mysql.createPool({
  host: process.env.HOST,      
  user: process.env.ROOT,           
  database: process.env.DB, 
  password: process.env.PSS,           
});


module.exports = pool;
const jwt = require('jsonwebtoken');
const secretKey = 'sua_chave_secreta'; // Use uma chave secreta forte e armazenada de forma segura

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Cadastros.findOne({ where: { email } });

    if (!usuario || usuario.senha !== senha) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Gerar o token JWT com as informações do usuário
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      secretKey,
      { expiresIn: '1h' } // Token expira em 1 hora
    );

    // Enviar o token no cookie
    res.cookie('token', token, { httpOnly: true }); 
    res.json({ message: 'Login realizado com sucesso', token });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

module.exports = router;

