// Date feature
let currentDate = new Date();

function formatDate(currentDate) {
  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentDate.getDay()];

let date = currentDate.getDate();

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[currentDate.getMonth()];
let year = currentDate.getFullYear();
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();
formatDate();

let pageDate = document.querySelector("#current-date");

pageDate.innerHTML = `${day}, ${date} ${month} ${year}, ${hours}:${minutes}`;

//display forcast
function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecastResponse = response.data.daily;

  let weatherForecast = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row weather-sub">`;
  forecastResponse.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `       
          <div class="col-2">
              <div class="forecast-day">${formatForecastDay(
                forecastDay.dt
              )}</div>
         
              <span class="forecast-max"> ${Math.round(
                forecastDay.temp.max
              )} </span>
              |
              <span class="forecast-min">${Math.round(
                forecastDay.temp.min
              )}</span>
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt="">
            </div>
          
        `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  weatherForecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "86acf2ef4ede1754f0e280629154b360";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;

  axios.get(apiURL).then(displayForecast);
}
// Search City feature
function searchForCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function search(city) {
  let apiKey = "86acf2ef4ede1754f0e280629154b360";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(retrieveWeather);
}

function retrieveWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("div.current-forcast").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )}m/sec`;
  celsiusTemp = response.data.main.temp;
  let mainIcon = response.data.weather[0].icon;
  document
    .querySelector("#main-image")
    .setAttribute("src", `http://openweathermap.org/img/wn/${mainIcon}@2x.png`);

  getForecast(response.data.coord);
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("submit", searchForCity);

search("Brisbane");

//current weather feature
function currentCity(position) {
  let apiKey = "86acf2ef4ede1754f0e280629154b360";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(retrieveWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentCity);
}

let currentWeatherButton = document.querySelector("#current-location-button");
currentWeatherButton.addEventListener("click", getCurrentLocation);
// units feature
function showImperial(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemperature = (celciusTemp * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}

function showMetric(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemp);
}

let celciusTemp = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showImperial);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showMetric);
