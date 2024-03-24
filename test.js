const authToken = "0c75a0b6d4fa056fdddf4b581448f92a";
const fromNumber = "+14242950944";
toNumber = "+919983677205";
const apiKey = "db9ec5afbbe745d6416c5e6929fc26ef";
const messageBody = "Weather Update: ";
const locationIQKey = "pk.9d03219277e1c754316a7dba5320218e";
const accountSid = "AC3e53c6d25010fb3de56c6c419552e4d7";

fetch(
  `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(accountSid + ":" + authToken),
    },
    body: new URLSearchParams({
      From: fromNumber,
      To: toNumber,
      Body: messageBody,
    }),
  }
)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
