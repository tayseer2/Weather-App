const apiKey = "4001880beff9324ae0d72a0cb9654a2a";
const getData = async () => {
    const input = document.querySelector("#input");
    const wind = document.querySelector("#wind");
    const humidity = document.querySelector("#humidity");
    const visibility = document.querySelector("#visibility");
    const temperature = document.querySelector(".temperature");
    const cityName = document.querySelector(".city-name");
    const status = document.querySelector("#status");

    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`;
        const response = await fetch(apiUrl);

        if (response.ok) {
            const data = await response.json();

            // تحديث بيانات الطقس
            wind.innerHTML = `${Math.trunc(data.wind.speed)} km/h`;
            humidity.innerHTML = `${data.main.humidity}%`;
            visibility.innerHTML = `${data.visibility / 1000} km`;
            temperature.innerHTML = `${Math.round(data.main.temp)}°C`;
            cityName.innerHTML = `${data.name}, ${data.sys.country}`;

            if (data.weather[0].main === "Clear") {
                status.src = "images/clear.png";
            } else if (data.weather[0].main === "Clouds") {
                status.src = "images/clouds.png";
            } else if (data.weather[0].main === "Mist") {
                status.src = "images/mist.png";
            } else if (data.weather[0].main === "Rain") {
                status.src = "images/rain.png";
            } else if (data.weather[0].main === "Snow") {
                status.src = "images/snow.png";
            } else if (data.weather[0].main === "Drizzle") {
                status.src = "images/drizzle.png";
            }
            document.querySelector(".content").style.display = "block"

        } else {
            console.error(`Error: ${response.statusText}`);
            cityName.innerHTML = "The city has not been found.";
        }

    } catch (error) {
        console.error("Error fetching weather data:", error);
        cityName.innerHTML = "An error occurred while fetching data.";
    } finally {
        input.value = ""
    }
};

let searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", function () {
    getData(input.value)
})