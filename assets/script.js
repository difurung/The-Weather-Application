//  5 day API key : ced6331887cb8168b2eccb551eab7480 
// http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=ced6331887cb8168b2eccb551eab7480

var cityInput;
var citArr = []

//put the user input into the city
$("#search").click(function (event) {
    event.preventDefault();
    
    cityInput = $("#citySearch").val()
    
    //append city to list
    $("<li>").text(cityInput).appendTo($("#history")).addClass("city-search"); 
    //populate previous searches from local storage
    
    // var storeObj = {
        
    //     city: cityInput
    // };
    
    
    
//     citArr = JSON.parse(localStorage.getItem("prevSearch") ) || [];
    
//    //citArr.push(storeObj);
    
//     localStorage.setItem(prevSearch, city)
    
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=ced6331887cb8168b2eccb551eab7480";

function getApi(queryURL) {
    fetch(queryURL)
    .then(function (response) {
        console.log(response);
    if (response.status === 200) {
    response.json().then(function (data) {
    
    displayCityName(data.name, data.sys.country);
    getWeather(data.coord.lat, data.coord.lon);
    console.log(displayCityName)
    });

    }
    
    

    });
}






// var storeObj = {

//     city: cityInput
// };
});



//get api to fetch data

//store previous searches in local storage


//populate current city data on main 

//populates 5 day forcast on cards