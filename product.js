document.getElementById('payButton').addEventListener('click', async () => {
  const response = await fetch('/create-order', {
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: 100, // Replace with the actual amount you want to charge
    }),
  });

  const order = await response.json();

  const options = {
    key: 'rzp_test_g5rKq0AnXwnqFN', // Replace with your Razorpay API Key
    amount: order.amount,
    currency: order.currency,
    order_id: order.id,
    name: 'Your Company Name',
    description: 'Test Payment',
    image: 'https://yourcompany.com/logo.png', // URL to your company logo
    handler: function (response) {
      alert('Payment successful!');
    },
  };

  const rzp1 = new Razorpay(options);
  rzp1.open();
});