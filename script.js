console.log("Bienvenido a Clouds");

const input = document.querySelector("#searchBar");
const boton = document.querySelector("#send");

//conectar la api

    const fetchClima = (ciudad) =>{
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
        + ciudad + 
        "&appid=ad61bf9360774cabad49c44a75fb6423&units=metric")
        .then((respuesta) => respuesta.json())
        .then((datos) => mostrarClima(datos));
    }

//obtener los datos

    const mostrarClima = (datos) => {
        const ciudad = datos.name;
        const temp = datos.main.temp;
        const clima = datos.weather[0].main;
        const icono = datos.weather[0].icon;
        const sensaciónTermica = datos.main.feels_like;
        const tempMax = datos.main.temp_max;
        const tempMin = datos.main.temp_min;
        const humedad = datos.main.humidity;
        
        //console.log(ciudad, temp, clima, icono, sensaciónTermica, tempMax, tempMin, humedad);

        // modificar el DOM

        document.querySelector("#city").innerText = ciudad;
        document.querySelector("#temp").innerText = temp;
        document.querySelector("#icon").src = "https://openweathermap.org/img/wn/" + icono + ".png";
        document.querySelector("#main").innerText = clima;
        document.querySelector("#feels_like").innerText = "sensación termica " + sensaciónTermica;
        document.querySelector("#temp_max").innerText = "Temperatura maxima " + tempMax;
        document.querySelector("#temp_min").innerText = "Temperatura minima " + tempMin;
        document.querySelector("#humidity").innerText = "Humedad del " + humedad + "%";
    }

    // funcion de busqueda

    const buscar = () =>{
        input.value;
    }

    //Hacer funcionar la barra de busqueda


   

    boton.addEventListener("click", buscar())


    fetchClima("New York");