var express = require('express');
var router = express.Router();
const mysql = require('mysql2/promise');

// Configuração da conexão com o banco de dados MariaDB
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'vittalux',
  password: '',
});

// CREATE - Adicionar novo cadastro
router.post('/add', async (req, res) => {
  const { cpf, email, cep, rua, numero, complemento, bairro, cidade, estado, transaction_id, senha } = req.body;

  if (!cpf || !email) {
    return res.status(400).json({ error: 'CPF e email são obrigatórios' });
  }

  try {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(
        `INSERT INTO cadastros (cpf, email, cep, rua, numero, complemento, bairro, cidade, estado, transaction_id, senha)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [cpf, email, cep, rua, numero, complemento, bairro, cidade, estado, transaction_id, senha]
      );
      res.status(201).json({ id: result.insertId, cpf, email, cep, rua, numero, complemento, bairro, cidade, estado, transaction_id, senha });
    } finally {
      connection.release(); // Libera a conexão no finally
    }
  } catch (err) {
    console.error('Erro ao adicionar cadastro:', err);
    res.status(500).json({ error: 'Erro ao adicionar cadastro' });
  }
});

// READ - Obter todos os cadastros
router.get('/all', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    try {
      const [cadastros] = await connection.query('SELECT * FROM cadastros');
      res.json(cadastros);
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error('Erro ao obter cadastros:', err);
    res.status(500).json({ error: 'Erro ao obter cadastros' });
  }
});

// READ - Obter um cadastro por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await pool.getConnection();
    try {
      const [cadastro] = await connection.execute('SELECT * FROM cadastros WHERE id = ?', [id]);

      if (cadastro.length === 0) {
        return res.status(404).json({ error: 'Cadastro não encontrado' });
      }

      res.json(cadastro[0]);
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error('Erro ao obter cadastro:', err);
    res.status(500).json({ error: 'Erro ao obter cadastro' });
  }
});

// UPDATE - Atualizar um cadastro por ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { cpf, email, cep, rua, numero, complemento, bairro, cidade, estado, transaction_id } = req.body;

  try {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(
        `UPDATE cadastros 
         SET cpf = ?, email = ?, cep = ?, rua = ?, numero = ?, complemento = ?, bairro = ?, cidade = ?, estado = ?, transaction_id = ?
         WHERE id = ?`,
        [cpf, email, cep, rua, numero, complemento, bairro, cidade, estado, transaction_id, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Cadastro não encontrado' });
      }

      res.json({ message: 'Cadastro atualizado com sucesso' });
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error('Erro ao atualizar cadastro:', err);
    res.status(500).json({ error: 'Erro ao atualizar cadastro' });
  }
});

// DELETE - Deletar um cadastro por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute('DELETE FROM cadastros WHERE id = ?', [id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Cadastro não encontrado' });
      }

      res.json({ message: 'Cadastro deletado com sucesso' });
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error('Erro ao deletar cadastro:', err);
    res.status(500).json({ error: 'Erro ao deletar cadastro' });
  }
});




// Middleware para login



module.exports = router;
