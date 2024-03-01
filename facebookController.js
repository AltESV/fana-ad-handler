const bizSdk = require("facebook-nodejs-business-sdk");
const access_token = process.env.ACCESS_TOKEN;
const pixel_id = process.env.ADS_PIXEL_ID;
const EventRequest = bizSdk.EventRequest;
const UserData = bizSdk.UserData;
const ServerEvent = bizSdk.ServerEvent;
const api = bizSdk.FacebookAdsApi.init(access_token);

//FORWARD EVENT TO FACEBOOK
exports.facebook = async (email) => {
  let current_timestamp = Math.floor(new Date() / 1000);

  const userData = new UserData().setEmails([email]);

  const serverEvent = new ServerEvent()
    .setEventName("Purchase")
    .setEventTime(current_timestamp)
    .setUserData(userData)
    .setEventSourceUrl("https://www.fanaverse.app/")
    .setActionSource("website");

  const eventsData = [serverEvent];
  const eventRequest = new EventRequest(access_token, pixel_id).setEvents(
    eventsData,
  );

  return await eventRequest.execute();
};
