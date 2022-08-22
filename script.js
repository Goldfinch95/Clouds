console.log("Bienvenido a Clouds");

const input = document.querySelector("#searchBar"); 
const boton = document.querySelector("#send"); 
const ciudad = document.querySelector("#city");
const temperatura = document.querySelector("#temp");
const icono = document.querySelector("#icon");
const clima = document.querySelector("#main");
const sensaciónTermica = document.querySelector("#feels_like");
const temperaturaMaxima = document.querySelector("#temp_max");
const temperaturaMinima = document.querySelector("#temp_min");
const humedad = document.querySelector("#humidity");


boton.addEventListener('click', ()=> {
    fetch("https://api.openweathermap.org/data/2.5/weather?q="
        + input.value + 
        "&appid=ad61bf9360774cabad49c44a75fb6423&units=metric")
        .then((respuesta) => respuesta.json())
        .then((datos) => {
            let name = datos['name'];
            let temp = datos['main']['temp'];
            let weather = datos['weather']['0']['main'];
            let icon = datos['weather']['0']['icon']
            let feeling = datos['main']['feels_like'];
            let tempMax = datos['main']['temp_max'];
            let tempMin = datos['main']['temp_min'];
            let humidity = datos['main']['humidity'];
            ciudad.innerHTML = name;
            temperatura.innerHTML = `${temp}°C`;
            clima.innerHTML = weather;
            icono.src = "https://openweathermap.org/img/wn/" + icon + ".png";
            sensaciónTermica.innerHTML = `Sensación Termica: ${feeling}`;
            temperaturaMaxima.innerHTML = `Temp Max: ${tempMax}°C`;
            temperaturaMinima.innerHTML = `Temp Min: ${tempMin}°C`;
            humedad.innerHTML = `Humedad: ${humidity}%`;
        }).catch(error => alert('ingresaste una ciudad equivocada'))
})
