// Date feature
let currentDate = new Date();
function formatDate(currentDate) {
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
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

let pageDate = document.querySelector("#current-date");

pageDate.innerHTML = `${day}, ${date} ${month} ${year}, ${hours}:${minutes}`;

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
