const api = {
    key:'b5cea1d84964659ed54821716b1c6132',
    url:'https://api.openweathermap.org/data/2.5/weather'
}

// Llamados de los atributos como se declararon en el HTML
const city = document.getElementById('city');
const date = document.getElementById('date');
const tempImg = document.getElementById('tempimg');
const temp = document.getElementById('temp');
const weather = document.getElementById('weather');
const range = document.getElementById('range');

// Funcion para cambiar la imagen mostrada dependiendo del clima de la ciudad
function updateImages(data) {
    const temp = toCelsius(data.main.temp);
    let src = 'images/sun.png';
    if(temp > 26){
        src = 'images/sun.png';
    } else if (temp < 20){
        src = 'images/rain.png';
    }
}

// Funcion para hacer la busqueda de la ciudad en la Api, de acuerdo a los metodos que estan declarados en la Api
async function search(query){
    try {
        const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`);
        const data = await response.json();
        
        city.innerHTML = `${data.name}, ${data.sys.country}`;
        data.date = (new Date()).toLocaleDateString();
        temp.innerHTML = `${toCelsius(data.main.temp)}°C`;
        weather.innerHTML = data.weather[0].description;
        range.innerHTML = `${toCelsius(data.main.temp_min)}°C - ${toCelsius(data.main.temp_max)}°C`;
        updateImages(data);
    } catch(err) {
        console.log(err);
        alert('Hubo un error');
    }
}

// Funcion para convertir los grados a Celsius
function toCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
}

function onSubmit(event) {
    event.preventDefault();
    search(searchbox.value);
}

const form = document.getElementById('search-form');
const searchbox = document.getElementById('searchbox');
form.addEventListener('submit', onSubmit, true);