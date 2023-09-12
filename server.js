const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    const data = req.body;

    // Add forwarding function (e.g., hash the email, forward to Facebook)

    res.json({ status: 'success' });
    console.log(req)
});

app.listen(port, () => {
    console.log(`Webhook server is running on port ${port}`);
});
