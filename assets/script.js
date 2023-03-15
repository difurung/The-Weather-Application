//  5 day API key : ced6331887cb8168b2eccb551eab7480
// http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=ced6331887cb8168b2eccb551eab7480
//let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=ced6331887cb8168b2eccb551eab7480&units=imperial";

var citArr = []
var current = document.querySelector("#current");
var fiveday = document.querySelector("#fiveday");
var searchInput = document.querySelector('#citySearch');


//put the user input into the city
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
            <p id="temp">Temp: ${temp}°F</p>
            <p id="hum">Humidity: ${humid}%</p>
            <p id="wind">Wind: ${wind}mph</p>
        </div>`;
          console.log(currHTML);
          //getWeather(lat, lon);
          renderForecast(lat, long);
          //calls forecast function
          current.innerHTML = currHTML;
          searchInput.value = '';
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
      for (let i = 0; i < data.list.length; i = i + 8) {
        var day = data.list[i].dt_txt;
        var time = day.split(" ");
        var weekDay = time[0];
        var icon = data.list[i].weather[0].icon;
        var temp = data.list[i].main.temp;
        console.log(temp)
        var humidity = data.list[i].main.humidity;
        var wind = data.list[i].wind.speed
        fiveDayHTML += `
          <div class="text-center bg-info mb-4 col-12 col-md-6 col-lg-2">
            <h4 id="day1" class="">${weekDay}</h4>
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
$("#search").click(function (event) {
  event.preventDefault();
  var cityInput = searchInput.value.trim();
  getCity(cityInput);
  //populate previous searches from local storage
  $("<li class= 'bg-info text-align-center' >")
    .text(cityInput)
    .appendTo($("#history"))
    .addClass("city-search");
  console.log(cityInput);
  appendToHistory(cityInput);
});
function appendToHistory(cityInput) {


if (citArr.indexOf(cityInput) !== -1) {
    return;
  }
  citArr.push(cityInput)
  localStorage.setItem("city", JSON.stringify(citArr));
  renderHistory();
}
var historyContainer = document.querySelector('#history');
function renderHistory() {
 historyContainer.innerHTML = '';
  for (var i = 0; i < citArr.length; i++) {
    var btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-controls', 'today forecast');
    btn.classList.add('history-btn', 'btn-history');
    // data-search allows access to city name when click handler is invoked
    btn.setAttribute('data-search', citArr[i]);
    btn.textContent = citArr[i];
    btn.addEventListener('click', function(e){
      var city = e.target.innerText
      getCity(city)      
    })
    historyContainer.append(btn);
  }
}
function initSearchHistory() {
  var storedHistory = localStorage.getItem('city');
  console.log(citArr);
  console.log(storedHistory);
  if (storedHistory) {
    citArr = JSON.parse(storedHistory);
  }
  renderHistory();
}
initSearchHistory();































// //  5 day API key : ced6331887cb8168b2eccb551eab7480 
// // http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=ced6331887cb8168b2eccb551eab7480
// //let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=ced6331887cb8168b2eccb551eab7480&units=imperial";
// //let cityInput;


// var citArr = []
// var current = document.querySelector("#current");
// var fiveday = document.querySelector("#fiveday");




// //put the user input into the city
// $("#search").click(function (event) {
//   event.preventDefault();

//   var cityInput = $("#citySearch").val().trim();

//  getCity(cityInput);
//   //populate previous searches from local storage
//   $("<li class= 'bg-info text-align-center' >")
//     .text(cityInput)
//     .appendTo($("#history"))
//     .addClass("city-search");

//   var storeObj = {
//     city: cityInput,
//   };

//   citArr = JSON.parse(localStorage.getItem("city")) || [];

//   citArr.push(storeObj);

//   localStorage.setItem("city", JSON.stringify(citArr));


//   var cityInput = $("#citySearch").val("");
// });



// var getCity = function (cityName) {
//   var queryURL =
//     "http://api.openweathermap.org/data/2.5/weather?q=" +
//     cityName +
//     "&appid=ced6331887cb8168b2eccb551eab7480&units=imperial";
//   console.log(cityName);
//   fetch(queryURL).then(function (response) {
//     console.log(response);
//     if (response.status === 200) {
//       response
//         .json()

//         .then(function (data) {
//           console.log(data);
//           var icon = data.weather[0].icon
//           console.log(icon)
//           var lat = data.coord.lat;
//           console.log(lat);
//           var long = data.coord.lon;
//           console.log(long);
          
//           var city = data.name;
//           console.log(city);
//           var wind = data.wind.speed;
//           console.log(wind);
//           var humid = data.main.humidity;
//           console.log(humid);
//           var temp = data.main.temp;
//           console.log(temp);

//           //Renders data
//           var currHTML = `<div class="text-center bg-info mb-4 col-12 col-md-6 col-lg-2">
//             <h4 id="current-day" class="">Today's Forecast</h4>
//             <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="" id="tIcon" />
//             <p id="temp">Temp: ${temp}°F</p>
//             <p id="hum">Humidity: ${humid}%</p>
//             <p id="wind">Wind: ${wind}mph</p>
//         </div>`;
//           console.log(currHTML);

//           //getWeather(lat, lon);
//           renderForecast(lat, long);
//           //calls forecast function
//           current.innerHTML = currHTML;
//         });
//     }
//   });

// }
//   //Forecast function starts here

//   function renderForecast(lat, long) {
//     var forecastURL =
//       "https://api.openweathermap.org/data/2.5/forecast?lat=" +
//       lat +
//       "&lon=" +
//       long +
//       "&units=imperial&appid=22512877ada2a919ebc827b52e0ed0a5";
//     console.log(forecastURL);
//     var fiveDayHTML = ''
//     fetch(forecastURL)
//     .then(res => res.json())
//     .then(data => {
//       console.groupCollapsed(data);
//       for (let i=0; i < data.list.length; i=i+8){
//       var day = data.list[i].dt_txt;
//       var time = day.split(" ");
//       var weekDay = time[0];
//       var icon = data.list[i].weather[0].icon;  
//       var temp = data.list[i].main.temp;
//       console.log(temp)
//       var humidity = data.list[i].main.humidity;
//       var wind = data.list[i].wind.speed
//       fiveDayHTML += `
          
        
//           <div class="text-center bg-info mb-4 col-12 col-md-6 col-lg-2">
//             <h4 id="day1" class="">${weekDay}</h4>
//             <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="" id="tIcon" />
//             <p id="temp">Temp: ${temp}°F</p>
//             <p id="hum">Humidity: ${humidity}%</p>
//             <p id="wind">Wind: ${wind}mph</p>
//           </div>
         
//       `;
//       fiveday.innerHTML = fiveDayHTML;
//       }
//     }
//     )

    
    
    
    
//   }
  
  
//   var loadSearch = function() {
//     var loadPrevious = JSON.parse(localStorage.getItem("city")) || [];
//     for (var i = 0; i < loadPrevious.length ; i++) {
//     $("<li>").text(loadPrevious[i].city).appendTo($("#history")).addClass("city-search");
// }
// loadSearch();
// }



