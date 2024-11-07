document.getElementById('getApi').addEventListener('click', getApi);
const apiKey = 'your_openweathermap_api_key'; // Replace with your actual OpenWeather API key

function getApi() {
    const cityName = document.getElementById('cityName').value;
    console.log(cityName);

    // Geocoding API URL to get latitude and longitude
    const geoUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    
    fetch(geoUrl)
        .then((res) => res.json())
        .then((geoData) => {
            if (geoData.cod === "404") {
                console.log("City not found!");
                return;
            }

            // Extract latitude and longitude
            const lat = geoData.coord.lat;
            const lon = geoData.coord.lon;

            // Now fetch weather data using onecall API
            const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${apiKey}&units=metric`; // Units set to metric for Celsius temperature

            fetch(weatherUrl)
                .then((res) => res.json())
                .then((data) => {
                    console.log('Weather data:', data);
                    let output = `
                        <div>
                            <div style="color:black; width:15rem; background-color:white; border-radius: 10px;" class="p-3">        
                                <p class="m-0" style="font-weight:bold; font-size:2rem;">${cityName}</p>
                                <p class="m-0" style="font-weight:bold; font-size:4rem;">${data.current.temp}°C</p>
                                <p class="m-0" style="font-weight:bold; font-size:1.5rem;">${data.current.weather[0].description}</p>
                            </div>
                        </div>
                    `;
                    document.getElementById('output').innerHTML = output;
                })
                .catch((err) => console.log('Error fetching weather data:', err));
        })
        .catch((err) => console.log('Error fetching geolocation data:', err));
}
