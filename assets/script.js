//  5 day API key : ced6331887cb8168b2eccb551eab7480 
// http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=ced6331887cb8168b2eccb551eab7480
// let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=ced6331887cb8168b2eccb551eab7480&units=imperial";
let cityInput;
let citArr = []

//put the user input into the city
$("#search").click(function (event) {
    event.preventDefault();
    
    cityInput = $("#citySearch").val()
    
    //populate previous searches from local storage
    
    // var storeObj = {
        
        //     city: cityInput
        // };
        
                
        //     citArr = JSON.parse(localStorage.getItem("prevSearch") ) || [];
        
        //    //citArr.push(storeObj);
        
        //     localStorage.setItem("prevSearch", city)
        
        //append city to list

        $("<li>").text(cityInput).appendTo($("#history")).addClass("city-search"); 
        // $("<li>").text(cityInput).appendTo($("#history")).addClass("city-search"); 



    let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=ced6331887cb8168b2eccb551eab7480&units=imperial";


    fetch(queryURL)
    .then(function (response) {
        console.log(response);
    if (response.status === 200) {
    response.json()
    
    .then(function (data) {
    console.log(data)
    let lat = data.coord.lat
        console.log(lat)
    let long = data.coord.lon
        console.log(long)
    //for(let i = 0; i < 6; i++){
    //need to create variables!!
    let city = data.name
        console.log(city)
    var wind = data.wind.speed
        console.log(wind)
    var humid = data.main.humidity
        console.log(humid)
    var temp = data.temp.humidity
        console.log(temp)


    //Renders data
    currHTML = `<div class="text-center bg-info mb-4 col-12 col-md-6 col-lg-2">
            <h4 id="day2" class="">date</h4>
            <img src="#" alt="" id="tIcon" />
            <p id="temp">Temp:${temp}</p>
            <p id="hum">Humidity:${humidity}</p>
            <p id="wind">Wind:${wind}</p>
          </div>`

    //displayCityName(data.name, data.sys.country);
    //getWeather(lat, lon);
    
    });

    }
    
    

    });
}






);



//get api to fetch data

//store previous searches in local storage


//populate current city data on main 

//populates 5 day forcast on cards