const sha256 = require("js-sha256");
const js_sdk = require("business_api_client");
const moment = require("moment");

//FORWARD EVENT TO TIKTOK
exports.tiktok = async (email) => {
  let ttkHashedEmail = sha256(email.toLowerCase());
  let currentTime = moment().toISOString();

  let tiktokBody = {
    pixel_code: process.env.TIKTOK_PIXEL,
    event: "SubmitForm",
    timestamp: currentTime,
    context: {
      page: {
        url: "https://www.fanaverse.io/",
        referrer: "https://www.fanaverse.io/",
      },
      user: {
        email: ttkHashedEmail,
      },
    },
  };

  let tiktokApiInstance = new js_sdk.EventCallbackApi();

  return new Promise((resolve, reject) => {
    tiktokApiInstance.pixelTrack(
      process.env.TIKTOK_ACCESS_TOKEN,
      { body: tiktokBody },
      (error, data, response) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          console.log("Succesfully sent to tiktok", data);
          resolve(data);
        }
      },
    );
  });
};
