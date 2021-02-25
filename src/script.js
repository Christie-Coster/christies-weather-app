function getDate(now) {
  let date = now.getDate();

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
  let mainWeather = response.data.weather[0].main;
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
function getCurrentForecast(response) {
  let currentForecast = document.querySelector("#current-weather");
  let forecast = response.data.weather[0].description;
  currentForecast.innerHTML = forecast;
}
function getCurrentHighLow(response) {
  let currentHigh = document.querySelector("#current-high");
  let currentLow = document.querySelector("#current-low");
  let high = Math.round(response.data.main.temp_max);
  let low = Math.round(response.data.main.temp_min);
  currentHigh.innerHTML = high;
  currentLow.innerHTML = low;
}
function getCurrentWindSpeed(response) {
  let currentWindSpeed = document.querySelector("#current-speed");
  let windSpeed = Math.round(response.data.wind.speed);
  currentWindSpeed.innerHTML = windSpeed;
}
function getCurrentHumidity(response) {
  let currentHumidity = document.querySelector("#current-humidity");
  let humidity = response.data.main.humidity;
  currentHumidity.innerHTML = humidity;
  //console.log(response.data);
  //console.log(response.data.name);
  //console.log(response.data.weather[0].main);
  //console.log(response.data.weather[0].description);
}
function getCurrentTemp(response) {
  //Display current temperature
  let currentTemperature = document.querySelector("#current-temp");
  let temperature = Math.round(response.data.main.temp);
  currentTemperature.innerHTML = temperature;
}
function displayCity(response) {
  let cityName = document.querySelector("#city-name");
  let city = response.data.name;
  cityName.innerHTML = city;
}

function convertToFahrenheit(unit) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=${unit}`;
  let convertTempFahrenheit = document.querySelector("#current-temp");
  convertTempFahrenheit.classList.add("fahrenheit");
  convertTempFahrenheit.classList.remove("celsius");
  axios.get(`${apiUrl}`).then(displayCity);
  axios.get(`${apiUrl}`).then(getCurrentTemp);
  axios.get(`${apiUrl}`).then(getCurrentHumidity);
  axios.get(`${apiUrl}`).then(getCurrentWindSpeed);
  axios.get(`${apiUrl}`).then(getCurrentHighLow);
  axios.get(`${apiUrl}`).then(getCurrentForecast);
  axios.get(`${apiUrl}`).then(getEmoji);
}
function checkCurrentFTemp(event) {
  event.preventDefault();
  let unit = "imperial";

  convertToFahrenheit(unit);
}

function convertToCelsius(unit) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=${unit}`;
  let convertTempCelsius = document.querySelector("#current-temp");
  convertTempCelsius.classList.add("celsius");
  convertTempCelsius.classList.remove("fahrenheit");
  axios.get(`${apiUrl}`).then(displayCity);
  axios.get(`${apiUrl}`).then(getCurrentTemp);
  axios.get(`${apiUrl}`).then(getCurrentHumidity);
  axios.get(`${apiUrl}`).then(getCurrentWindSpeed);
  axios.get(`${apiUrl}`).then(getCurrentHighLow);
  axios.get(`${apiUrl}`).then(getCurrentForecast);
  axios.get(`${apiUrl}`).then(getEmoji);
}
function checkCurrentCTemp(event) {
  event.preventDefault();
  let unit = "metric";

  convertToCelsius(unit);
}

function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=${unit}`;
  let displayTemp = document.querySelector("#current-temp");
  displayTemp.classList.add("fahrenheit");
  displayTemp.classList.remove("celsius");
  axios.get(`${apiUrl}`).then(displayCity);
  axios.get(`${apiUrl}`).then(getCurrentTemp);
  axios.get(`${apiUrl}`).then(getCurrentHumidity);
  axios.get(`${apiUrl}`).then(getCurrentWindSpeed);
  axios.get(`${apiUrl}`).then(getCurrentHighLow);
  axios.get(`${apiUrl}`).then(getCurrentForecast);
  axios.get(`${apiUrl}`).then(getEmoji);
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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  let displayTemp = document.querySelector("#current-temp");
  displayTemp.classList.add("fahrenheit");
  displayTemp.classList.remove("celsius");
  axios.get(`${apiUrl}`).then(displayCity);
  axios.get(`${apiUrl}`).then(getCurrentTemp);
  axios.get(`${apiUrl}`).then(getCurrentHumidity);
  axios.get(`${apiUrl}`).then(getCurrentWindSpeed);
  axios.get(`${apiUrl}`).then(getCurrentHighLow);
  axios.get(`${apiUrl}`).then(getCurrentForecast);
  axios.get(`${apiUrl}`).then(getEmoji);
}
function handlePosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
}

let apiKey = "f78eec04b621104e9165191859d3da15";
let city = "moab";
let unit = "imperial";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=${unit}`;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleFormSubmit);

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", handlePosition);

let chooseFahrenheit = document.querySelector("#fahrenheit-button");
chooseFahrenheit.addEventListener("click", checkCurrentFTemp);

let chooseCelcius = document.querySelector("#celsius-button");
chooseCelcius.addEventListener("click", checkCurrentCTemp);

getDate(new Date());
searchCity(city);
