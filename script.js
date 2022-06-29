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