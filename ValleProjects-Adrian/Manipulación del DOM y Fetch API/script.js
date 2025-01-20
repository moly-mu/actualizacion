document.getElementById('getWeather').addEventListener('click', function() {
    const city = document.getElementById('city').value;
    const apiKey = '79cb431deaef48fbaa800814241510'; // Reemplaza con tu API Key de WeatherAPI
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=es`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ciudad no encontrada');
            }
            return response.json();
        })
        .then(data => {
            const weatherResult = document.getElementById('weatherResult');
            weatherResult.innerHTML = `
                <h2>${data.location.name}, ${data.location.country}</h2>
                <p>Temperatura: ${data.current.temp_c} °C</p>
                <p>Descripción: ${data.current.condition.text}</p>
            `;
        })
        .catch(error => {
            const weatherResult = document.getElementById('weatherResult');
            weatherResult.innerHTML = `<p>${error.message}</p>`;
        });
});