//carregando o modulo do express


//Requisição Método de Pagamento 
import 'dotenv/config'
import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({
    accessToken: process.env.accessToken,
    options: {
        timeout: 5000
    }
});

const payment = new Payment(client);

const body = {
	transaction_amount: 30.50,
	description: 'Teste api pix V2',
	payment_method_id: 'pix',
	payer: {
		email: 'danielleonardo@outlook.com'
	},
};

payment.create({ body }).then(console.log).catch(console.log);









//criar um servidor http com express+node; ESTA FUNCAO TEM QUE SER SEMPRE A ULTIMA DE SEU CÓDIGO