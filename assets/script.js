//  5 day API key : ced6331887cb8168b2eccb551eab7480 
// http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=ced6331887cb8168b2eccb551eab7480
//let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=ced6331887cb8168b2eccb551eab7480&units=imperial";
//let cityInput;
var citArr = []
// var fiveDay = ${'#five-day-forecast'};
// var prevSearch = ${'previous-search'}
var current = document.querySelector("#current");
var fiveday = document.querySelector("#fiveday");

//put the user input into the city
$("#search").click(function (event) {
  event.preventDefault();

  var cityInput = $("#citySearch").val().trim();

 getCity(cityInput);
  //populate previous searches from local storage
  $("<li class= 'bg-info text-align-center' >")
    .text(cityInput)
    .appendTo($("#history"))
    .addClass("city-search");

  var storeObj = {
    city: cityInput,
  };

  citArr = JSON.parse(localStorage.getItem("prevSearch")) || [];

  citArr.push(storeObj);

  localStorage.setItem("prevSearch", JSON.stringify(citArr));


  var cityInput = $("#citySearch").val("");
});



var getCity = function (cityName) {
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=ced6331887cb8168b2eccb551eab7480&units=imperial";
  console.log(cityName);
  fetch(queryURL).then(function (response) {
    console.log(response);
    if (response.status === 200) {
      response
        .json()

        .then(function (data) {
          console.log(data);
          var icon = data.weather[0].icon
          console.log(icon)
          var lat = data.coord.lat;
          console.log(lat);
          var long = data.coord.lon;
          console.log(long);
          
          var city = data.name;
          console.log(city);
          var wind = data.wind.speed;
          console.log(wind);
          var humid = data.main.humidity;
          console.log(humid);
          var temp = data.main.temp;
          console.log(temp);

          //Renders data
          var currHTML = `<div class="text-center bg-info mb-4 col-12 col-md-6 col-lg-2">
            <h4 id="current-day" class="">Today's Forecast</h4>
            <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="" id="tIcon" />
            <p id="temp">Temp: ${temp}deg</p>
            <p id="hum">Humidity: ${humid}%</p>
            <p id="wind">Wind: ${wind}mph</p>
        </div>`;
          console.log(currHTML);

          //getWeather(lat, lon);
          renderForecast(lat, long);
          //calls forecast function
          current.innerHTML = currHTML;
        });
    }
  });

}
  //Forecast function starts here

  function renderForecast(lat, long) {
    var forecastURL =
      "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      lat +
      "&lon=" +
      long +
      "&units=imperial&appid=22512877ada2a919ebc827b52e0ed0a5";
    console.log(forecastURL);
    var fiveDayHTML = ''
    fetch(forecastURL)
    .then(res => res.json())
    .then(data => {
      console.groupCollapsed(data);
      for (let i=0; i < data.list.length; i=i+7){
      var day = data.list[i].dt_txt;
      //var time = dayInfo.split(" ");
      //var weekDay = timeInfo[i];
      var icon = data.list[i].weather[0].icon;  
      var temp = data.list[i].main.temp;
      console.log(temp)
      var humidity = data.list[i].main.humidity;
      var wind = data.list[i].wind.speed
      fiveDayHTML += `
          
        
          <div class="text-center bg-info mb-4 col-12 col-md-6 col-lg-2">
            <h4 id="day1" class="">${day}</h4>
            <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="" id="tIcon" />
            <p id="temp">Temp: ${temp}°F</p>
            <p id="hum">Humidity: ${humidity}%</p>
            <p id="wind">Wind: ${wind}mph</p>
          </div>
         
      `;
      fiveday.innerHTML = fiveDayHTML;
      }
    }
    )


  }





//get api to fetch data

//store previous searches in local storage


//populate current city data on main 

//populates 5 day forcast on cards