// import {prod, dev} from "./environment.js";


// //Section to hide api key
// const api_key = '&appid=';

// if(prod.isLive){
//     api_key += prod.api_key;
// }else{
//     api_key += dev.api_key;
// };


//API KEY
//Before uploading the final product to github, I need to take out this api Key and have it empty, then add in the read me for users to input the api key here after they download the code.
const api_key = "ad348df81f85b7c707ce9dd1e10b1d88";


//BASE URL
const base_url = "https://api.openweathermap.org/data/2.5/weather";
const forecast_base_url = "https://api.openweathermap.org/data/2.5/forecast";

function getWeather() {
    //Get location from the input
    const location = document.getElementById("location-input").value;
    //units
    const units = "metric";
    //construct the full URL
    const url = `${base_url}?q=${location}&units=${units}&appid=${api_key}`;
    const forecast_url = `${forecast_base_url}?q=${location}&units=${units}&appid=${api_key}`;
    //fetch the weather data
    fetch(url).then(response => response.json())
        .then(data => {
            //take the required data from the response
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;

            //display the data in the HTML
            document.getElementById("temp").innerHTML = `Temperature: ${temperature}`;
            document.getElementById("humidity").innerHTML = `Humidity: ${humidity}`;
            document.getElementById("wind").innerHTML = `Wind Speed: ${windSpeed}`;
        })
    //The line below (catch) is used to handle any errors that occur during the fetch() method.
    //Here the error is logged to the console using console.log(error).
    // .catch(error => console.log(error));

    //fetch the forecast data
    fetch(forecast_url)
        .then(response => response.json())
        .then(data => {
            //get required data from the response
            const forecast = data.list;
            let forecastHtml = '';
            //iterate over the forecast data to get the required information
            //this will pull the corecast data over and over to get the next couple of days
            forecast.forEach(forecastData => {
                forecastHtml += `<div class="forecast-data">
                                <div>Time: ${forecastData.dt_txt}</div>
                                <div>Temperature: ${forecastData.main.temp}</div>
                                <div>Humidity: ${forecastData.main.humidity}</div>
                                <div>Wind Speed: ${forecastData.wind.speed}</div>
                             </div>`;
            });
            //display the forecast data in the HTML side
            document.getElementById("forecast").innerHTML = forecastHtml;
        });   
}