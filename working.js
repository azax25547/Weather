//variables
var latData;
var longData;
var total;
var api = "https://api.openweathermap.org/data/2.5/weather?"
window.onload = function () {
  
    /*Getting Geolocation Data*/
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position,showError) {
            latData = "lat=" + position.coords.latitude;
            longData = "&lon=" + position.coords.longitude;
            var appId = "&appid=c2b3ebb9295933b0369641d06781398b";
            total = api + latData + longData + "&units=metric" + appId;
            total1 = api + latData + longData + "&units=imperial" + appId;
            getWeather();
            $("#btn").on("click", function () {
                getWeatherManual();
                $("#cityName").val(" ");
            })
        });
    } else {
        x.innerHTML = "GeoLocation is not supported by the browser";
    }
}
function getWeather() {
    $.ajax({
        url: total,
        success: function (result) {
            var temp = result.main.temp;
            $('.city').text("City: " + result.name);
            $('.temp').text("Temperature: " + result.main.temp + "C");

            $("#far").click(function () {
                var tempFar = Math.round((1.8 * temp) + 32);
                $('.temp').text("Temperature: " + tempFar + "F");
                temp = tempFar;
            });

            $("#cel").click(function (e) {
                var tempCel = Math.round((temp - 32) * 0.5556);
                if (tempCel = result.main.temp) {
                    e.preventDefault();
                }
                $('.temp').text("Temperature: " + tempCel + "C");
                temp = tempCel;
            });

            $('.humidity').text("Humidity: " + result.main.humidity);
            $('.weather-description').text(result.weather[0].description);
            $(".img").attr("src", "https://openweathermap.org/img/w/" + result.weather[0].icon + ".png");
        },
        error: function (err) {
            alert("Either you have not turned on location services or your network connection is poor");
            console.log(err);
        }
    });
}


function getWeatherManual() {
    var cityName = $("#cityName").val();
    var appId = "&appid=c2b3ebb9295933b0369641d06781398b";
    var cityApi = api + "q=" + cityName + "&units=metric" + appId;

    $.ajax({
        url: cityApi,
        success: function (result) {
            var temp = result.main.temp;
            $('.city').text("City: " + result.name);
            $('.temp').text("Temperature: " + result.main.temp + "C");

            $("#far").click(function () {
                var tempFar = Math.round((1.8 * temp) + 32);
                $('.temp').text("Temperature: " + tempFar + "F");
                temp = tempFar;
            });

            $("#cel").click(function (e) {
                var tempCel = Math.round((temp - 32) * 0.5556);
                if (tempCel = result.main.temp) {
                    e.preventDefault();
                }
                $('.temp').text("Temperature: " + tempCel + "C");
                temp = tempCel;
            });

            $('.humidity').text("Humidity: " + result.main.humidity);
            $('.weather-description').text(result.weather[0].description);
            $(".img").attr("src", "https://openweathermap.org/img/w/" + result.weather[0].icon + ".png");
        },
        error: function (err) {
            alert("Either you have not turned on location services or you have misspelled the city. TRY AGAIN!!!!");
        }
    });
}

window.addEventListener("keydown",function(e){
    if(!e.keyCode == 13)
    e.preventDefault();
    if(e.keyCode === 13){
        getWeatherManual();
    }
})
function showError(err){
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.")
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.")
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.")
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.")
            break;
    }
}
