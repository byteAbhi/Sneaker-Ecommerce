const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_51OARnJSF3jIZ77NybjqJhiiAeHKi9aWQCMiPGrj9EgLkiif6FWNCPJCL2LBGm6BKn8EmC1zoh0Z6IbRDlPx7e3P0004rGXpJdx');
 

app.use(express.static('public'));
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price: 'price_12345', // Replace with your actual price ID
            quantity: 1,
        }],
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
    });

    res.json({ id: session.id });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
