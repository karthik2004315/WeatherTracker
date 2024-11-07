document.getElementById('getApi').addEventListener('click', getApi);

        const apiId = 'f7588f03c7354807a1b133358240711';

        function getApi() {
            var CityName = document.getElementById('cityName').value;
            console.log("City Name:", CityName);

            const url = `http://api.weatherapi.com/v1/current.json?key=${apiId}&q=${CityName}&aqi=yes`;
            console.log("API URL:", url);

            fetch(url)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return res.json();
                })
                .then((data) => {
                    console.log('Data:', data);
                    let output = `
                        <div>
                            <div style="color:black; width:15rem; background-color:white; border-radius: 10px;" class="p-3">        
                                <p class="m-0" style="font-weight:bold; font-size:2rem;">${data.location.name}</p>
                                <p class="m-0" style="font-weight:bold; font-size:4rem;">${data.current.temp_c}<sup>°C</sup></p>
                            </div>
                        </div>
                    `;
                    document.getElementById('output').innerHTML = output;
                })
                .catch((err) => {
                    console.error("Fetch error:", err);
                    document.getElementById('output').innerHTML = "<p style='color: red;'>City not found or API error. Please try again.</p>";
                });
        }
