//variables
var latData;
var longData;
var total;
var api = "https://api.openweathermap.org/data/2.5/weather?"


window.onload = function(){
    //alert("You should turn on Location service on your device to get the Weather details else you cant find nothing");
      /*presentation of ther date*/
    generateDate(); 
    /*Getting Geolocation Data*/     
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            latData =  "lat="+position.coords.latitude;
            longData = "&lon=" + position.coords.longitude;
            var appId = "&appid=c2b3ebb9295933b0369641d06781398b";
             total = api + latData + longData+"&units=metric"+appId;
             total1 = api + latData + longData+"&units=imperial"+appId;
             console.log(total);
             getWeatherCel();
                $("#cel").on("click",function(){
                     getWeatherCel();
                   
                })
                $("#far").on("click",function(){
                    getWeatherFar();
                    
               })
               $("#btn").on("click",function(){
                   getWeatherManual();
                   $("#cityName").val(" ");
                   $("#cel").attr("disabled","disabled");
                   $("#far").attr("disabled","disabled");
                   $("#reload").css({"display":"block"});
               })

            
        });
    }else{
        x.innerHTML = "GeoLocation is not supported by the browser";
        }

      
    $("#reload").on("click",function(){
        location.reload();
    })
    }

function getWeatherCel(){
   
    $.ajax({
        url: total,
        dataType:"jsonp",
        success: function(result){
           console.log(result);
           $('.city').text("City: "+result.name);
           $('.temp').text("Temperature: "+result.main.temp +"C");
           $('.humidity').text("Humidity: " +result.main.humidity);
           $('.weather-description').text(result.weather[0].description);
           $(".img").attr("src","http://openweathermap.org/img/w/"+result.weather[0].icon+".png");
        },
        error: function(err){
            alert("Either you have not turned on location services or your network connection is poor");
            console.log(err);
        }
        
    });    
    
}
function getWeatherFar(){
   
    $.ajax({
        url: total1,
        success: function(result){
           console.log(result);
           $('.city').text("City: "+result.name);
           $('.temp').text("Temperature: "+result.main.temp +"F");
           $('.humidity').text("Humidity: " +result.main.humidity);
           $('.weather-description').text(result.weather[0].description);
           $(".img").attr("src","http://openweathermap.org/img/w/"+result.weather[0].icon+".png");
        },
        error: function(err){
            alert("Either you have not turned on location services or your network connection is poor");
            console.log(err);
        }
        
    });    
    
}

function generateDate(){
    var time = new Date();
    var timeDate = time.getDay();
     switch(timeDate){
         case 1: timeDate = "Monday";
         case 2: timeDate = "Tuesday";
         case 3: timeDate = "Wednesday";
         case 4: timeDate = "Thursday";
         case 5: timeDate = "Friday";
         case 6: timeDate = "Saturday";
         case 0: timeDate = "Sunday";
        
     }
     var timeDay = time.getDate();
     var timeMonth = time.getMonth();
     var timeYear = time.getFullYear();
     var currentTime =  time.getHours()+":"+time.getMinutes()+":"+time.getSeconds();
   
   $(".time").html(timeDate+"  "+timeDay+"/"+timeMonth+"/"+timeYear+"<br>"+currentTime);
}




function getWeatherManual(){
    var cityName = $("#cityName").val();
    var appId = "&appid=c2b3ebb9295933b0369641d06781398b";
    var cityApi = api+"q="+cityName+"&units=metric"+appId;


    $.ajax({
        url: cityApi,
        success: 
        function(result){
           console.log(result);
           $('.city').text("City: "+result.name);
           $('.temp').text("Temperature: "+result.main.temp +"C");
           $('.humidity').text("Humidity: " +result.main.humidity);
           $('.weather-description').text(result.weather[0].description);
          $(".img").attr("src","http://openweathermap.org/img/w/"+result.weather[0].icon+".png");
        },
        error: function(err){
           
            alert("Either you have not turned on location services or you have misspelled the city. TRY AGAIN!!!!");
            
            console.log(err);
        }
        
    });  
}








