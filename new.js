
/* HTML ELEMENTS KO SELECT KARNA */

const cityInput = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#searchBtn");
const locationEl = document.querySelector("#location");
const weatherIcon = document.querySelector("#weatherIcon");
const tempEl = document.querySelector("#temperature");
const humidityEl = document.querySelector(".humidity");
const windEl = document.querySelector(".wind");

// Weather condition show karne wala element
const weatherEl = document.querySelector("#weather");

// Loading message show karne wala element
const loadingEl = document.querySelector("#loading");


/* DAY FORECAST KE HTML ELEMENTS */

const day1 = document.querySelector("#day1");
const day2 = document.querySelector("#day2");
const day3 = document.querySelector("#day3");
const day4 = document.querySelector("#day4");
const day5 = document.querySelector("#day5");


/* SEARCH BUTTON PAR CLICK EVENT */

// Jab user Search button par click karega,
// ye function automatically chalega.
searchBtn.addEventListener("click", function () {
    const city = cityInput.value.trim();
    if (city === "") {
        alert("Please enter a city name");
        return;
    }


    // Agar city valid hai to weather function call hoga.
    getWeather(city);
});



// async ka use isliye hai kyunki API se data aane me time lagta hai.
async function getWeather(city) {

    // user ko Loading message dikhate hain.
    loadingEl.innerText = "Loading...";

    localStorage.setItem("lastCity", city);


    // try ke andar wo code likhte hain
    // jisme error aa sakta hai.
    try {

        // API module se current weather aur forecast data le rahe hain.
        //
        // await ka matlab:
        // API ka response aane tak yahan wait karo.
        //
        // data = current weather
        // forecast = 5-day forecast
        const { data, forecast } =
            await window.weatherApi.fetchWeatherData(city);


        /* FORECAST CARDS KO ARRAY ME RAKHNA */

        const days = [day1, day2, day3, day4, day5];


        /* 5-DAY FORECAST KO HTML ME SHOW KARNA */

        // Loop 5 baar chalega,
        // kyunki hume 5 forecast cards show karne hain.
        for (let i = 0; i < 5; i++) {
            const item = forecast.list[i * 8];


            // Selected forecast card ke andar
            // dynamically HTML add kar rahe hain.
            days[i].innerHTML = `

                <!-- Forecast ki date show kar rahe hain -->
                <h4>
                    ${item.dt_txt.split(" ")[0]}
                </h4>


                <!-- Weather icon show kar rahe hain -->
                <img
                    src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png"
                >


                <!-- Temperature show kar rahe hain -->
                <p>
                    ${Math.round(item.main.temp)}°C
                </p>


                <!-- Weather condition show kar rahe hain -->
                <small>
                    ${item.weather[0].main}
                </small>
            `;
        }


        /* =================================================
           7. CURRENT WEATHER CONDITION NIKALNA
        ================================================= */

        // API response se weather condition nikal rahe hain.
        //
        // Example:
        // Clouds
        // Clear
        // Rain
        // Snow
        // etc.
        const condition = data.weather[0].main;


        // Weather condition ke according
        // website ka background change kar rahe hain.
        changeBackground(condition);


        /* =================================================
           8. WEATHER ICON CHANGE KARNA
        ================================================= */

        // Agar weather Clouds hai
        if (condition === "Clouds") {

            // Cloudy image show karo
            weatherIcon.src = "images/cloudy.png";


        // Agar weather Clear hai
        } else if (condition === "Clear") {

            // Sun image show karo
            weatherIcon.src = "images/sun.png";


        // Agar Rain hai
        } else if (condition === "Rain") {

            // Rain image show karo
            weatherIcon.src = "images/rain.png";


        // Agar Drizzle hai
        } else if (condition === "Drizzle") {

            // Drizzle image show karo
            weatherIcon.src = "images/drizzle.png";


        // Agar Snow hai
        } else if (condition === "Snow") {

            // Snow image show karo
            weatherIcon.src = "images/snow.png";


        // Agar Thunderstorm hai
        } else if (condition === "Thunderstorm") {

            // Thunderstorm image show karo
            weatherIcon.src = "images/thunderstorm.png";


        // Agar Mist hai
        } else if (condition === "Mist") {

            // Mist image show karo
            weatherIcon.src = "images/mist.png";
        }


        /* =================================================
           9. CURRENT WEATHER DATA KO UI ME SHOW KARNA
        ================================================= */

        // Weather ki description show kar rahe hain.
        // Example: "clear sky", "light rain"
        weatherEl.innerText = data.weather[0].description;


        // Temperature show kar rahe hain.
        //
        // Math.round() temperature ko nearest whole number
        // me convert karta hai.
        tempEl.innerText =
            `${Math.round(data.main.temp)}°C`;


        // Wind speed show kar rahe hain.
        windEl.innerHTML =
            `💨 ${data.wind.speed} m/s`;


        // City ka naam show kar rahe hain.
        locationEl.innerText = data.name;


        // Humidity percentage show kar rahe hain.
        humidityEl.innerHTML =
            `💧 ${data.main.humidity}%`;
    }


    /* =================================================
       10. ERROR HANDLE KARNA
    ================================================= */

    catch (error) {

        // Agar API me error aata hai,
        // to user ko error ka message show karenge.
        alert(error.message);
    }


    /* =================================================
       11. LOADING MESSAGE REMOVE KARNA
    ================================================= */

    finally {

        // API request complete hone ke baad
        // Loading message remove kar dete hain.
        //
        // finally hamesha chalega:
        // chahe data successfully aaye ya error aaye.
        loadingEl.innerText = "";
    }
}


/* =====================================================
   12. ENTER KEY SE SEARCH KARNA
===================================================== */

// Input box me keyboard event detect kar rahe hain.
cityInput.addEventListener("keydown", function (e) {

    // Check kar rahe hain ki user ne Enter key press ki hai.
    if (e.key === "Enter") {

        // Enter press hone par Search button ko
        // automatically click kar rahe hain.
        //
        // Isse user ko mouse se Search button
        // press karne ki zarurat nahi hoti.
        searchBtn.click();
    }
});


/* =====================================================
   13. LAST SEARCHED CITY KO LOAD KARNA
===================================================== */

// Browser ke localStorage se last searched city le rahe hain.
const lastCity = localStorage.getItem("lastCity");


// Check kar rahe hain ki koi previous city saved hai ya nahi.
if (lastCity) {

    // Saved city ko input box me show kar rahe hain.
    cityInput.value = lastCity;


    // Saved city ka weather automatically load kar rahe hain.
    getWeather(lastCity);
}


/* =====================================================
   14. BACKGROUND THEME CHANGE FUNCTION
===================================================== */

// Ye function weather condition ke according
// body ka background class change karta hai.
function changeBackground(condition) {

    // Pehle body ki existing class remove kar rahe hain.
    //
    // Isse purana weather background remove ho jayega.
    document.body.className = "";


    // Agar weather Clear hai
    if (condition === "Clear") {

        // sunny class add karo
        document.body.classList.add("sunny");


    // Agar weather Clouds hai
    } else if (condition === "Clouds") {

        // cloudy class add karo
        document.body.classList.add("cloudy");


    // Agar Rain ya Drizzle hai
    } else if (
        condition === "Rain" ||
        condition === "Drizzle"
    ) {

        // rainy class add karo
        document.body.classList.add("rainy");


    // Agar Thunderstorm hai
    } else if (condition === "Thunderstorm") {

        // storm class add karo
        document.body.classList.add("storm");


    // Agar Snow hai
    } else if (condition === "Snow") {

        // snow class add karo
        document.body.classList.add("snow");
    }
}