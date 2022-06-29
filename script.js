
// //Calling Elements from HTML

// function initPage() {
//     const currentWindEl = document.getElementById("wind-speed");
//     const currentUVEl = document.getElementById("UV-index");
//     const historyEl = document.getElementById("history");
//     var fivedayEl = document.getElementById("fiveday-header");
//     var todayweatherEl = document.getElementById("todays-weather");
//     let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
//     const cityEl = document.getElementById("enter-city");
//     const searchEl = document.getElementById("search-button");
//     const clearEl = document.getElementById("clear-history");
//     const nameEl = document.getElementById("city-name");
//     const currentPicEl = document.getElementById("current-picture");
//     const currentTempEl = document.getElementById("temperature");
//     const currentHumidityEl = document.getElementById("humidity");
    
// }
// // API key by openweathermap 
// const APIKey = "e397c0ad290977cba948a64734ab37cd";
// const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast?appid=" + APIKey + "&units=imperial&q=";
// const CURRENT_URL = "https://api.openweathermap.org/data/2.5/weather?appid=" + APIKey + "&units=imperial&q=";
// const UVI_URL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&cnt=1";

// //  When search button is clicked, read the city name typed by the user

// function printFiveDayForecastCard(card, forecast) {
//     // Extract the data from JSON payload
//     let forecastDate = moment(forecast.dt_txt, "YYYY-MM-DD HH:mm:ss").format("MM/DD/YYYY");
//     let temperature = forecast.main.temp;
//     let humidity = forecast.main.humidity;
//     let weather = forecast.weather[0].description;
//     let weatherIcon = ICON_URL + forecast.weather[0].icon + ICON_DOUBLE_SIZE_SUFFIX;

//     // Present data inside HTML
//     card.innerHTML = ""; // Empties existing content from the Card
//     card.innerHTML += "<p>" + forecastDate +"</p>"; // Adds Date
//     card.innerHTML += "<img src=\"" + weatherIcon + "\" alt=\"" + weather + "\"></img>"; // Appends Icon
//     card.innerHTML += "<p>Temperature: " + temperature + " F</p>"; // Appends Temperature in F
//     card.innerHTML += "<p>Humidity: " + humidity + " %</p>"; // And Humidity
// }

// function fiveDayForecast(cityName) {
//     let forecastQuery = FORECAST_URL + cityName;
//     $.getJSON(forecastQuery, function(data, status) {
//         if(status !== "success") {
//             // show error message
//         } else {
//             for(var i = 0; i < 5; i++) {
//                 printFiveDayForecastCard(document.getElementById("forecast" + i), data.list[i * 8 + 4]); // Multiply by 8 because forecast every 3 hours (8 times a day), and add 4 to point to Noon (as noon is the fourth block of three hours)
//             }
//         }
//     });
// }

// function currentWeather(cityName) {
//     let weatherQuery = CURRENT_URL + cityName; 
//     $.getJSON(weatherQuery, function(data, status) {
//         if(status !=="success") {
//             //error message
//         } else {
//             let forecast = data;
//             let currentDate = moment().format("MM/DD/YYYY");
//             let temperature = forecast.main.temp;
//             let humidity = forecast.main.humidity;
//             let weather = forecast.weather[0].description;
//             let weatherIcon = ICON_URL + forecast.weather[0].icon + ICON_DOUBLE_SIZE_SUFFIX;
//             let windSpeed = forecast.wind.speed;

//             document.getElementById("city-name").textContent = cityName + " (" + currentDate + ")";
//             let iconElement = document.getElementById("current-picture");
//             iconElement.setAttribute("src", weatherIcon);
//             iconElement.setAttribute("alt", weather);
//             document.getElementById("temperature").textContent = "Temperature: " + temperature + " F";
//             document.getElementById("humidity").textContent = "Humidity: " + humidity + " %";
//             document.getElementById("wind-speed").textContent = "Wind Speed: " + windSpeed + " mph";

//             let lat = forecast.coord.lat;
//             let lon = forecast.coord.lon;
//             let uviQuery = UVI_URL + "&lat=" + lat + "&lon=" + lon;
//             $.getJSON(uviQuery, function(uviData, uviStatus) {
//                 if(uviStatus !== "success") {
//                     // show text with UVI not available
//                 } else {
//                     let uvi = uviData.value;
//                     var uvi_rating = "";
//                     if(uvi <= 4.0) {
//                         uvi_rating = "success";
//                     }
//                     else if(uvi <= 8.0) {
//                         uvi_rating = "warning";
//                     } else {
//                         uvi_rating = "danger";
//                     }
//                     let uvElement = document.getElementById("UV-index");
//                     uvElement.textContent = "UV-Index: " + uvi;
//                     uvElement.setAttribute("class", "badge badge-" + uvi_rating);
//                 }
//             });
//         }
//     });
// }

// function getWeather(cityName) {
//     fiveDayForecast(cityName);
//     currentWeather(cityName);    
// }

// function FromLocalStorage() {
//     var currentState = window.localStorage.getItem("cityHistory"); // { cities: ["", ""] }
//     if(!currentState) {
//         currentState = [];
//     } else {
//         currentState = JSON.parse(currentState).cities;
//     }
//     return currentState;
// }

// function ToLocalStorage(cityName) {
//     var currentState = FromLocalStorage();
//     currentState.unshift(cityName);
//     window.localStorage.setItem("cityHistory", JSON.stringify({ cities: currentState }));
// }

// function LoadSearchHistory() {
//     let cityHistory = FromLocalStorage();
//     $("#searchHistory")[0].innerHTML = "";
//     for(var i = 0; i < cityHistory.length; i++) {
//         let cityName = cityHistory[i];
//         $("#searchHistory")[0].innerHTML += "<div class=\"button\" onClick=\"getWeather('" + cityName + "');\">" + cityName + "</div>";
//     }
// }

// $("#executeSearch").click(function() {
//     let cityName = $("#cityName")[0].value;
//     getWeather(cityName);
//     addCityToLocalStorage(cityName);
//     refreshSearchHistory();
// });



// refreshSearchHistory(); 



var searchInput = document.querySelector("#cityName");
var todayWeather = document.querySelector("#weatherMainInfo");
var forecast = document.querySelector("#forecast5Days");
var todaysDate = moment().format("L");

var searchBtn = document.querySelector("#searchBtn");

searchBtn.addEventListener("click", function() {
    var cityName = searchInput.value;
    var recentSearches = [];
    recentSearches.push(cityName);
    console.log(recentSearches);
    getWeather(cityName);

});

var getWeather = function(cityName) {
    var cityNameApi = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=5a5307ea2f6a35b62ce0461de8e45a8d";

    fetch(cityNameApi)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);

        var lon = data.coord.lon;
        var lat = data.coord.lat;
        var nameOfCity = data.name;

        return[lat,lon,nameOfCity];

    }).then(function([lat,lon,nameOfCity]) {
        var weatherApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude={part}&appid=5a5307ea2f6a35b62ce0461de8e45a8d";

        fetch(weatherApi)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(data);

            todayWeather.className = "weatherMainBorder";
            
            var h3El = document.createElement("h3");
            h3El.textContent = nameOfCity + " " +  todaysDate;
            todayWeather.appendChild(h3El);

            var temp = document.createElement("p");
            temp.textContent = "Temp: " + data.current.temp + "°F";
            todayWeather.appendChild(temp);

            var windSpeed = document.createElement("p");
            windSpeed.textContent = "Wind: " + data.current.wind_speed + " MPH";
            todayWeather.appendChild(windSpeed);

            var humidity = document.createElement("p");
            humidity.textContent = "Humidity: " + data.current.humidity + "%";
            todayWeather.appendChild(humidity);

            var uvIndex = document.createElement("p");
            uvIndex.textContent = "UV Index: ";
            var uvIndexNumber = document.createElement("span");
            uvIndexNumber.textContent = data.current.uvi;
            uvIndexNumber.className = "uvIndex";
            uvIndex.appendChild(uvIndexNumber);
            todayWeather.appendChild(uvIndex);

            // create 5 day forecast seciotn and append it to forecast div
            var forecastHeader = document.createElement("h4");
            forecastHeader.textContent = "5-Day Forecast:";
            forecastHeader.className = "forecastHeader";
            forecast.appendChild(forecastHeader);
            forecast.className = "row";

            // create second day's weather div and add date
            var secondDayWeather = document.createElement("div");
            secondDayWeather.className = "forecastDays";
            var dateOfDay2 = document.createElement("p");
            dateOfDay2.className = "dayDates";
            dateOfDay2.textContent = moment().add(1, "day").format("L");

            forecast.appendChild(secondDayWeather);
            secondDayWeather.appendChild(dateOfDay2);


            var tempSecondDay = document.createElement("p");
            tempSecondDay.textContent = "Temp: " + data.daily[0].temp.day + "°F";
            secondDayWeather.appendChild(tempSecondDay);

            var windSecondDay = document.createElement("p");
            windSecondDay.textContent = "Wind: " + data.daily[0].wind_speed + " MPH";
            secondDayWeather.appendChild(windSecondDay);

            var humiditySecondDay = document.createElement("p");
            humiditySecondDay.textContent = "Humidity: " + data.daily[0].humidity + "%";
            secondDayWeather.appendChild(humiditySecondDay);

        
            // create third days div and display/append data
            var thirdDayWeather = document.createElement("div");
            thirdDayWeather.className = "forecastDays";
            var dateOfDay3 = document.createElement("p");
            dateOfDay3.className = "dayDates";
            dateOfDay3.textContent = moment().add(2, "days").format("L");

            forecast.appendChild(thirdDayWeather);
            thirdDayWeather.appendChild(dateOfDay3);


            var tempThirdDay = document.createElement("p");
            tempThirdDay.textContent = "Temp: " + data.daily[1].temp.day + "°F";
            thirdDayWeather.appendChild(tempThirdDay);

            var windThirdDay = document.createElement("p");
            windThirdDay.textContent = "Wind: " + data.daily[1].wind_speed + " MPH";
            thirdDayWeather.appendChild(windThirdDay);

            var humidityThirdDay = document.createElement("p");
            humidityThirdDay.textContent = "Humidity: " + data.daily[1].humidity + "%";
            thirdDayWeather.appendChild(humidityThirdDay);


            // create fourth day div and display/append data
            var fourthDayWeather = document.createElement("div");
            fourthDayWeather.className = "forecastDays";
            var dateOfDay4 = document.createElement("p");
            dateOfDay4.className = "dayDates";
            dateOfDay4.textContent = moment().add(3, "days").format("L");

            forecast.appendChild(fourthDayWeather);
            fourthDayWeather.appendChild(dateOfDay4);


            var tempFourthDay = document.createElement("p");
            tempFourthDay.textContent = "Temp: " + data.daily[2].temp.day + "°F";
            fourthDayWeather.appendChild(tempFourthDay);

            var windFourthDay = document.createElement("p");
            windFourthDay.textContent = "Wind: " + data.daily[2].wind_speed + " MPH";
            fourthDayWeather.appendChild(windFourthDay);

            var humidityFourthDay = document.createElement("p");
            humidityFourthDay.textContent = "Humidity: " + data.daily[2].humidity + "%";
            fourthDayWeather.appendChild(humidityFourthDay);


            // create fifth day and display/append data
            var fifthDayWeather = document.createElement("div");
            fifthDayWeather.className = "forecastDays";
            var dateOfDay5 = document.createElement("p");
            dateOfDay5.className = "dayDates";
            dateOfDay5.textContent = moment().add(4, "days").format("L");

            forecast.appendChild(fifthDayWeather);
            fifthDayWeather.appendChild(dateOfDay5);


            var tempFifthDay = document.createElement("p");
            tempFifthDay.textContent = "Temp: " + data.daily[3].temp.day + "°F";
            fifthDayWeather.appendChild(tempFifthDay);

            var windFifthDay = document.createElement("p");
            windFifthDay.textContent = "Wind: " + data.daily[3].wind_speed + " MPH";
            fifthDayWeather.appendChild(windFifthDay);

            var humidityFifthDay = document.createElement("p");
            humidityFifthDay.textContent = "Humidity: " + data.daily[3].humidity + "%";
            fifthDayWeather.appendChild(humidityFifthDay);

            // create sixth/final day's div and display/append data
            var sixthDayWeather = document.createElement("div");
            sixthDayWeather.className = "forecastDays";
            var dateOfDay6 = document.createElement("p");
            dateOfDay6.className = "dayDates";
            dateOfDay6.textContent = moment().add(5, "days").format("L");

            forecast.appendChild(sixthDayWeather);
            sixthDayWeather.appendChild(dateOfDay6);


            var tempSixthDay = document.createElement("p");
            tempSixthDay.textContent = "Temp: " + data.daily[4].temp.day + "°F";
            sixthDayWeather.appendChild(tempSixthDay);

            var windSixthDay = document.createElement("p");
            windSixthDay.textContent = "Wind: " + data.daily[4].wind_speed + " MPH";
            sixthDayWeather.appendChild(windSixthDay);

            var humiditySixthDay = document.createElement("p");
            humiditySixthDay.textContent = "Humidity: " + data.daily[4].humidity + "%";
            sixthDayWeather.appendChild(humiditySixthDay);


        })
    })
}