//IMPORTS
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config("");
const bizSdk = require("facebook-nodejs-business-sdk");
const access_token = process.env.ACCESS_TOKEN;
const pixel_id = process.env.ADS_PIXEL_ID;
const EventRequest = bizSdk.EventRequest;
const UserData = bizSdk.UserData;
const ServerEvent = bizSdk.ServerEvent;
const api = bizSdk.FacebookAdsApi.init(access_token);

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

//FORWARD EVENT TO FACEBOOK
    let current_timestamp = Math.floor(new Date() / 1000);

    const userData = new UserData().setEmails([email]);

    const serverEvent = new ServerEvent()
      .setEventName("signup")
      .setEventTime(current_timestamp)
      .setUserData(userData)
      .setEventSourceUrl("https://www.fanaverse.io/")
      .setActionSource("website");

    const eventsData = [serverEvent];
    const eventRequest = new EventRequest(access_token, pixel_id).setEvents(
      eventsData,
    );

    const response = await eventRequest.execute();

    console.log("Facebook Response: ", response);
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
