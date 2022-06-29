function initPage() {
    const cityEl = document.getElementById("enter-city");
    const searchEl = document.getElementById("search-button");
    const clearEl = document.getElementById("clear-history");
    const nameEl = document.getElementById("city-name");
    const currentPicEl = document.getElementById("current-picture");
    const currentTempEl = document.getElementById("temperature");
    const currentHumidityEl = document.getElementById("humidity");
    const currentWindEl = document.getElementById("wind-speed");
    const currentUVEl = document.getElementById("UV-index");
    const historyEl = document.getElementById("history");
    var fivedayEl = document.getElementById("fiveday-header");
    var todayweatherEl = document.getElementById("todays-weather");
    let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
}
// API key by openweathermap 
const APIKey = "e397c0ad290977cba948a64734ab37cd";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast?appid=" + APIKey + "&units=imperial&q=";
const CURRENT_URL = "https://api.openweathermap.org/data/2.5/weather?appid=" + APIKey + "&units=imperial&q=";
const UVI_URL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&cnt=1";
const ICON_URL = "https://openweathermap.org/img/wn/";
const ICON_DOUBLE_SIZE_SUFFIX = "@2x.png";
//  When search button is clicked, read the city name typed by the user

function printFiveDayForecastCard(card, forecast) {
    // Extract the data from JSON payload
    let forecastDate = moment(forecast.dt_txt, "YYYY-MM-DD HH:mm:ss").format("MM/DD/YYYY");
    let temperature = forecast.main.temp;
    let humidity = forecast.main.humidity;
    let weather = forecast.weather[0].description;
    let weatherIcon = ICON_URL + forecast.weather[0].icon + ICON_DOUBLE_SIZE_SUFFIX;

    // Present data inside HTML
    card.innerHTML = ""; // Empties existing content from the Card
    card.innerHTML += "<p>" + forecastDate +"</p>"; // Adds Date
    card.innerHTML += "<img src=\"" + weatherIcon + "\" alt=\"" + weather + "\"></img>"; // Appends Icon
    card.innerHTML += "<p>Temperature: " + temperature + " F</p>"; // Appends Temperature in F
    card.innerHTML += "<p>Humidity: " + humidity + " %</p>"; // And Humidity
}

function fiveDayForecast(cityName) {
    let forecastQuery = FORECAST_URL + cityName;
    $.getJSON(forecastQuery, function(data, status) {
        if(status !== "success") {
            // show error message
        } else {
            for(var i = 0; i < 5; i++) {
                printFiveDayForecastCard(document.getElementById("forecast" + i), data.list[i * 8 + 4]); // Multiply by 8 because forecast every 3 hours (8 times a day), and add 4 to point to Noon (as noon is the fourth block of three hours)
            }
        }
    });
}

function currentWeather(cityName) {
    let weatherQuery = CURRENT_URL + cityName; 
    $.getJSON(weatherQuery, function(data, status) {
        if(status !=="success") {
            //error message
        } else {
            let forecast = data;
            let currentDate = moment().format("MM/DD/YYYY");
            let temperature = forecast.main.temp;
            let humidity = forecast.main.humidity;
            let weather = forecast.weather[0].description;
            let weatherIcon = ICON_URL + forecast.weather[0].icon + ICON_DOUBLE_SIZE_SUFFIX;
            let windSpeed = forecast.wind.speed;

            document.getElementById("city-name").textContent = cityName + " (" + currentDate + ")";
            let iconElement = document.getElementById("current-picture");
            iconElement.setAttribute("src", weatherIcon);
            iconElement.setAttribute("alt", weather);
            document.getElementById("temperature").textContent = "Temperature: " + temperature + " F";
            document.getElementById("humidity").textContent = "Humidity: " + humidity + " %";
            document.getElementById("wind-speed").textContent = "Wind Speed: " + windSpeed + " mph";

            let lat = forecast.coord.lat;
            let lon = forecast.coord.lon;
            let uviQuery = UVI_URL + "&lat=" + lat + "&lon=" + lon;
            $.getJSON(uviQuery, function(uviData, uviStatus) {
                if(uviStatus !== "success") {
                    // show text with UVI not available
                } else {
                    let uvi = uviData.value;
                    var uvi_rating = "";
                    if(uvi <= 4.0) {
                        uvi_rating = "success";
                    }
                    else if(uvi <= 8.0) {
                        uvi_rating = "warning";
                    } else {
                        uvi_rating = "danger";
                    }
                    let uvElement = document.getElementById("UV-index");
                    uvElement.textContent = "UV-Index: " + uvi;
                    uvElement.setAttribute("class", "badge badge-" + uvi_rating);
                }
            });
        }
    });
}

function getWeather(cityName) {
    fiveDayForecast(cityName);
    currentWeather(cityName);    
}

function readFromLocalStorage() {
    var currentState = window.localStorage.getItem("cityHistory"); // { cities: ["", ""] }
    if(!currentState) {
        currentState = [];
    } else {
        currentState = JSON.parse(currentState).cities;
    }
    return currentState;
}

function addCityToLocalStorage(cityName) {
    var currentState = readFromLocalStorage();
    currentState.unshift(cityName);
    window.localStorage.setItem("cityHistory", JSON.stringify({ cities: currentState }));
}

function refreshSearchHistory() {
    let cityHistory = readFromLocalStorage();
    $("#searchHistory")[0].innerHTML = "";
    for(var i = 0; i < cityHistory.length; i++) {
        let cityName = cityHistory[i];
        $("#searchHistory")[0].innerHTML += "<div class=\"button\" onClick=\"getWeather('" + cityName + "');\">" + cityName + "</div>";
    }
}

$("#executeSearch").click(function() {
    let cityName = $("#cityName")[0].value;
    getWeather(cityName);
    addCityToLocalStorage(cityName);
    refreshSearchHistory();
});

$("#clear-history-btn").click(function() {
    window.localStorage.setItem("cityHistory", JSON.stringify({ cities: [] }));
    refreshSearchHistory();
});

refreshSearchHistory();