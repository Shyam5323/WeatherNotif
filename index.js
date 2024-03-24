const authToken = "0c75a0b6d4fa056fdddf4b581448f92a";
const fromNumber = "+14242950944";
const apiKey = "db9ec5afbbe745d6416c5e6929fc26ef";
const messageBody = "Weather Update: ";
const locationIQKey = "pk.9d03219277e1c754316a7dba5320218e";
const accountSid = "AC3e53c6d25010fb3de56c6c419552e4d7";

document
  .getElementById("subscription-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const phoneNumber = document.getElementById("phoneNumber").value;
    const country = document.getElementById("country").value;
    const state = document.getElementById("state").value;
    const city = document.getElementById("city").value;
    const location = `${city},${state},${country}`;

    fetch(
      `https://us1.locationiq.com/v1/search.php?key=${locationIQKey}&q=${location}&format=json`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const lat = data[0].lat;
          const lon = data[0].lon;

          console.log(lat, lon);
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
          )
            .then((response) => response.json())
            .then((data) => {
              const weatherDescription = data.weather[0].description;
              const temperature = data.main.temp;
              const feelLike = data.main.feels_like;
              const pressure = data.main.pressure;
              const humidity = data.main.humidity;
              const windSpeed = data.wind.speed;
              const weatherMessage = `${messageBody} ${weatherDescription}, Temperature: ${
                temperature - 273
              } Celcius but Feels like : ${
                feelLike - 273
              } Celcius.The Pressure is : ${pressure} and the humidity is ${humidity}%. Wind is blowing at ${windSpeed}m/s`;

              // Send SMS using Twilio API
              fetch(
                `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization:
                      "Basic " + btoa(accountSid + ":" + authToken),
                  },
                  body: new URLSearchParams({
                    From: fromNumber,
                    To: phoneNumber,
                    Body: weatherMessage,
                  }),
                }
              )
                .then((response) => response.json())
                .then((data) => console.log(data.sid))
                .catch((error) => console.error("Error:", error));
            })
            .catch((error) =>
              console.error("Error fetching weather data:", error)
            );
        } else {
          console.error("Location not found");
        }
      })
      .catch((error) => console.error("Error geocoding location:", error));
  });
