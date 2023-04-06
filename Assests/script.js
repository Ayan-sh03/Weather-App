const APIKey = "190cd151645d4480001312dcc242b085";

// name
const cityName = document.getElementById("city-name");
// main container
const mainContainer = document.getElementById("main-container");
// temp
const temp = document.getElementById("temp");

const app = document.getElementById('app')
// humidity
const humidity = document.getElementById("humid");
const form = document.getElementById('form')
// wind speed
const wind = document.getElementById("wind-speed");
const heading = document.getElementById('heading')
// input city
let city = "Delhi";
const search = document.getElementById("search");

function toggleForm() {
    form.classList.toggle('hidden');
    mainContainer.insertBefore(form, mainContainer.firstChild);
  }
  
  search.addEventListener("click", function(event) {
    event.preventDefault();
    city = document.getElementById('location').value;
    toggleForm();
    getGeoLocation();
  });
let geoLocation;

async function getGeoLocation() {
const response = await fetch(`
http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKey}
`);

const data = await response.json();
geoLocation = data;
getWeather();
}

async function getWeather() {
const weatherResponse = await fetch(`
https://api.openweathermap.org/data/2.5/weather?lat=${geoLocation[0].lat}&lon=${geoLocation[0].lon}&appid=${APIKey}
`);

const response = await weatherResponse.json();

cityName.innerHTML = response.name;
temp.innerHTML = Math.floor(response.main.temp - 273) + "℃";
humidity.innerHTML = response.main.humidity + "%";
wind.innerHTML = response.wind.speed + " km/h";

mainContainer.style.display = "block";
mainContainer.insertBefore(form,mainContainer.firstChild) // Show mainContainer after the weather is fetched
heading.style.display="none"

}

// Initially hide the mainContainer
mainContainer.style.display = "none";
// document.getElementById('id').style.display = "block"