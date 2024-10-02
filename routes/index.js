const { MercadoPagoConfig, Payment} = require('mercadopago')
// db.js
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




const client = new MercadoPagoConfig({
   accessToken: 'TEST-5676608915301552-091613-48e53574e3a4d3de7b0b155527d13ee4-374628797', 
   options: { timeout: 5000, idempotencyKey: 'abc' } 
  });

const payment = new Payment(client);

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express v0.0.1' });
});

router.post('/pix', async (req, res) => {
  console.log("Request:", req.body);

  const body = { 
    transaction_amount: req.body.transaction_amount,
    description: req.body.description,
    payment_method_id: req.body.paymentMethodId,
    payer: {
      email: req.body.email,
      identification: {
        type: req.body.identificationType,
        number: req.body.number
      }
    }
  };

  const requestOptions = { idempotencyKey: '<SOME_UNIQUE_VALUE>' };

  try {
    const result = await payment.create({ body, requestOptions });
    console.log("Pagamento criado:", result);
    
    // Verifica se o resultado contém as informações necessárias
    const response = {
      qr_code: result.point_of_interaction.transaction_data.qr_code,
      issuer_id: result.payment_method.issuer_id
    };

    res.json(response); // Envia a resposta em formato JSON
  } catch (error) {
    console.error("Erro ao criar pagamento:", error);
    res.status(500).json({ error: "Erro ao processar pagamento" }); // Envia erro se ocorrer
  }
});

module.exports = router;
