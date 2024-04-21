const PayOS = require('@payos/node');
const payos = new PayOS('6e978760-1322-485d-8d30-5e146cbdfb6e',
                        '53a877d0-6c5c-4e46-83ff-a2921488d49d',
                        '38dde99c1b1ff1fd88429802b90f3c1661327771414c9802dd7bdaae36974fcc');

const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json());

const DOMAIN = 'http://localhost:3000';

app.post('/create-payment-link', async (req, res) => {
    const order = {
        amount : 2000,
        description: 'Bi mat cua may man',
        orderCode: Math.floor(Math.random() * 1000000),
        returnUrl: DOMAIN + '/success.html',
        cancelUrl: DOMAIN + '/index.html',
    };
    const payment = await payos.createPaymentLink(order);
    res.redirect(303, payment.checkoutUrl);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
