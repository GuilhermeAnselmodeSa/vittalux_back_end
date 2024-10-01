import express from 'express';
import { Payment, MercadoPagoConfig } from 'mercadopago';

// Inicializar o Express
const app = express();
const router = express.Router();

// Middleware para o express poder lidar com JSON
app.use(express.json());

// Inicializar o cliente do MercadoPago com seu access token
const client = new MercadoPagoConfig({
  accessToken: 'TEST-5676608915301552-091613-48e53574e3a4d3de7b0b155527d13ee4-374628797'
});

// Definir a rota POST para processar pagamentos
router.post('/process-payment', async (req, res) => {
  const { 
    transaction_amount, 
    token, 
    description, 
    installments, 
    paymentMethodId, 
    issuer, 
    email, 
    identificationType, 
    number 
  } = req.body;

  try {
    const payment = await Payment.create({
      body: {
        transaction_amount: transaction_amount,
        token: token,
        description: description,
        installments: installments,
        payment_method_id: paymentMethodId,
        issuer_id: issuer,
        payer: {
          email: email,
          identification: {
            type: identificationType,
            number: number
          }
        }
      },
      requestOptions: {
        idempotencyKey: 'UNIQUE_ID' // Gere uma chave única para evitar duplicações
      }
    });

    // Retorna o resultado da transação
    res.status(200).json(payment.response);
  } catch (error) {
    console.error('Erro ao processar pagamento:', error);
    res.status(500).json({ error: error.message });
  }
});