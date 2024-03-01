//IMPORTS
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config("");
const facebookController = require("./facebookController");
const tiktokController = require("./tiktokController");

//INITIALIZE
const app = express();
const port = process.env.PORT || 8080;

//WEBHOOK
app.use(bodyParser.json());

app.post("/webhook", async (req, res) => {
  try {
    if (!req.body.user.email) {
      return res.status(400).json({
        status: "fail",
        message: "no email received",
      });
    }
    const email = req.body.user.email;

    const facebookResponse = await facebookController.facebook(email);
    console.log("Facebook Response: ", facebookResponse);

    //post tiktok approval
    // const tiktokResponse = await tiktokController.tiktok(email);
    // console.log("Tiktok Response: ", tiktokResponse);

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
});

//SERVER
app.listen(port, () => {
  console.log(`Webhook server is running on port ${port}`);
});
