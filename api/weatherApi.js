/* ===========================
   Weather App - API Module
=========================== */


/*
 IIFE = Immediately Invoked Function Expression

 Ye function define hote hi immediately execute ho jata hai.

 Iska purpose API ke internal code ko separate scope mein rakhna hai.
*/
(function (global) {

    // Strict mode JavaScript ko safer/strict rules ke saath run karta hai
    "use strict";


    // OpenWeatherMap API key
    const API_KEY = "2e68e17b919eba4c435541cc233b4844";


    // API ka common base URL
    const API_BASE_URL =
        "https://api.openweathermap.org/data/2.5";


    /*
     fetchJson()

     Ye reusable function kisi bhi API URL ko fetch karta hai
     aur response ko JSON mein convert karta hai.
    */
    async function fetchJson(url) {

        // API ko request bhej rahe hain
        const response = await fetch(url);


        // Check kar rahe hain ki API request successful hui ya nahi
        if (!response.ok) {

            // 404 ka matlab city/resource nahi mila
            if (response.status === 404) {
                throw new Error("City not found");
            }


            // Kisi aur HTTP error ke liye message
            throw new Error(
                `Unable to fetch weather data (${response.status})`
            );
        }


        // API response ko JSON mein convert karke return
        return response.json();
    }


    /*
     fetchWeatherData()

     Ye function current weather aur forecast
     dono ka data API se fetch karta hai.
    */
    async function fetchWeatherData(city) {


        /*
         URLSearchParams API ke query parameters
         automatically create karta hai.

         q      = city name
         appid  = API key
         units  = metric yani Celsius
        */
        const params = new URLSearchParams({

            q: city,

            appid: API_KEY,

            units: "metric"
        });


        // Parameters ko URL query string mein convert kar rahe hain
        const query = params.toString();


        /*
         Promise.all() dono API requests ko ek saath handle karta hai.

         First API:
         Current weather

         Second API:
         5-day forecast

         Dono requests complete hone ke baad hi
         data aur forecast milenge.
        */
        const [data, forecast] = await Promise.all([

            fetchJson(
                `${API_BASE_URL}/weather?${query}`
            ),

            fetchJson(
                `${API_BASE_URL}/forecast?${query}`
            )
        ]);


        /*
         Current weather aur forecast ko ek object ke form mein
         main JavaScript file ko return kar rahe hain.
        */
        return {
            data,
            forecast
        };
    }


    /*
     weatherApi naam ka object window ke andar available kar rahe hain.

     Iske wajah se main JS mein:

     window.weatherApi.fetchWeatherData(city)

     call kar sakte hain.

     Object.freeze() object ko accidentally modify hone se
     protect karta hai.
    */
    global.weatherApi = Object.freeze({

        fetchWeatherData

    });


/*
 window ko global ke roop mein pass kar rahe hain.
 Browser mein window global object hota hai.
*/
})(window);