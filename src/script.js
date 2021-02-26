function getDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];
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
    "December"
  ];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentDate = document.querySelector("#date");
  currentDate.innerHTML = `${day}, ${month} ${date} `;
  let currentTime = document.querySelector("#time");
  currentTime.innerHTML = `${hours}:${minutes}`;
}
function getEmoji(response) {
  mainWeather = response.data.weather[0].main;
  let currentEmoji = document.querySelector("#current-emoji");
  //console.log(mainWeather);
  if (mainWeather === "Clouds") {
    currentEmoji.innerHTML = "☁️";
  } else if (mainWeather === "Clear") {
    currentEmoji.innerHTML = "☀️";
  } else if (mainWeather === "Snow") {
    currentEmoji.innerHTML = "❄️";
  } else if (mainWeather === "Rain") {
    currentEmoji.innerHTML = "🌧";
  } else if (mainWeather === "Drizzle") {
    currentEmoji.innerHTML = "☔️";
  } else if (mainWeather === "Thunderstorm") {
    currentEmoji.innerHTML = "🌩";
  } else {
    currentEmoji.innerHTML = "🌫";
  }
}
function displayWeather(response){
//console.log(response.data);
let temperatureElement = document.querySelector("#current-temp");
let cityElement = document.querySelector("#city-name");
let descriptionElement= document.querySelector("#current-weather");
let humidityElement = document.querySelector("#current-humidity");
let windSpeedElement = document.querySelector("#current-speed");
let currentHigh = document.querySelector("#current-high");
let currentLow = document.querySelector("#current-low");

city = response.data.name;

temperatureElement.innerHTML = Math.round(Math.round(response.data.main.temp));
cityElement.innerHTML = city;
descriptionElement.innerHTML = response.data.weather[0].description;
humidityElement.innerHTML = response.data.main.humidity;
windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
currentHigh.innerHTML = Math.round(response.data.main.temp_max);
currentLow.innerHTML = Math.round(response.data.main.temp_min);
}
function displayFirstForecast(response) {
  function formatDate(timestamp) {
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let now = new Date(timestamp);
    let day = days[now.getDay() + 1];
    return `${day}`;
  }
  let forecastElement = document.querySelector("#futureForecast");
  let forecast = response.data.list[0];
  let timestamp = forecast.dt * 1000;

  let currentEmoji = mainWeather;
  //console.log(mainWeather);
  if (mainWeather === "Clouds") {
    currentEmoji = "☁️"
  } else if (mainWeather === "Clear") {
    currentEmoji = "☀️"
  } else if (mainWeather === "Snow") {
    currentEmoji = "❄️"
  } else if (mainWeather === "Rain") {
    currentEmoji = "🌧"
  } else if (mainWeather === "Drizzle") {
    currentEmoji = "☔️"
  } else if (mainWeather === "Thunderstorm") {
    currentEmoji = "🌩"
  } else {
    currentEmoji = "🌫"
  }

  forecastElement.innerHTML = `
    <div class="col-2 dailyButton">
        <button type="button" class="futureForecastButton">
            <div class="dayOfTheWeek">
            ${formatDate(timestamp)}
            </div>
            <div class="emoji"> 
             ${currentEmoji}
            </div>
            <div class="highLow">
                    ⬆<span></span>${Math.round(forecast.main.temp_max)}</span>º
                    ⬇<span></span>${Math.round(forecast.main.temp_min)}</span>º
            </div>
        </button>
    </div>`;

  //console.log(forecast);
}

function searchCity(city) {
  let apiKey = "f78eec04b621104e9165191859d3da15";
  let unit = "imperial"
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=${unit}`;
  axios.get(`${apiUrl}`).then(getEmoji);
  axios.get(apiUrl).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}&units=${unit}`;
  axios.get(`${apiUrl}`).then(displayFirstForecast);
}

function handleFormSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  //Outputs city value from form, into searchCity function
  searchCity(city);
}

function getCurrentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "f78eec04b621104e9165191859d3da15";
  let unit = "imperial"
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(`${apiUrl}`).then(getEmoji);
  axios.get(apiUrl).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}&units=${unit}`;
  axios.get(`${apiUrl}`).then(displayFirstForecast);
}
function handlePosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
}

function convertToFahrenheit(unit) {
  let apiKey = "f78eec04b621104e9165191859d3da15";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=${unit}`;
  let convertTempFahrenheit = document.querySelector("#current-temp");
  convertTempFahrenheit.classList.add("fahrenheit");
  axios.get(`${apiUrl}`).then(getEmoji);
  axios.get(apiUrl).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}&units=${unit}`;
  axios.get(`${apiUrl}`).then(displayFirstForecast);
}
function checkCurrentFTemp(event) {
  event.preventDefault();
  let unit = "imperial";
  convertToFahrenheit(unit);
}

function convertToCelsius(unit) {
  let apiKey = "f78eec04b621104e9165191859d3da15";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=${unit}`;
  let convertTempCelsius = document.querySelector("#current-temp");
  convertTempCelsius.classList.add("celsius");
  convertTempCelsius.classList.remove("fahrenheit");
  axios.get(`${apiUrl}`).then(getEmoji);
  axios.get(apiUrl).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}&units=${unit}`;
  axios.get(`${apiUrl}`).then(displayFirstForecast);
}
function checkCurrentCTemp(event) {
  event.preventDefault();
  let unit = "metric";
  convertToCelsius(unit);
}

let city = "Moab";
let mainWeather = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleFormSubmit);

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", handlePosition);

let chooseCelcius = document.querySelector("#celsius-button");
chooseCelcius.addEventListener("click", checkCurrentCTemp);

let chooseFahrenheit = document.querySelector("#fahrenheit-button");
chooseFahrenheit.addEventListener("click", checkCurrentFTemp);

searchCity(city);
getDate(new Date());
