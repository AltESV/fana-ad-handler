const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
    try {
    
    const data = req.body;

    // Add forwarding function (e.g., hash the email, forward to Facebook)

    res.status(200).json({ status: 'success' });
    console.log(req)
        } catch(err) {
            res.status(400).json({
                status: 'fail',
                message: err
            })
        }
});

app.listen(port, () => {
    console.log(`Webhook server is running on port ${port}`);
});
