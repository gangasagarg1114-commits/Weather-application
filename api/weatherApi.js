(function (global) {
    "use strict";

    const API_KEY = "2e68e17b919eba4c435541cc233b4844";
    const API_BASE_URL = "https://api.openweathermap.org/data/2.5";

    async function fetchJson(url) {
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("City not found");
            }

            throw new Error(`Unable to fetch weather data (${response.status})`);
        }

        return response.json();
    }

    async function fetchWeatherData(city) {
        const params = new URLSearchParams({
            q: city,
            appid: API_KEY,
            units: "metric"
        });
        const query = params.toString();

        const [data, forecast] = await Promise.all([
            fetchJson(`${API_BASE_URL}/weather?${query}`),
            fetchJson(`${API_BASE_URL}/forecast?${query}`)
        ]);

        return { data, forecast };
    }

    global.weatherApi = Object.freeze({ fetchWeatherData });
})(window);
