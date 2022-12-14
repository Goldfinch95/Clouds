console.log("Bienvenido a Clouds");

//llamar a los elementos del DOM

const input = document.querySelector("#searchBar"); 
const boton = document.querySelector("#send");
const lista = document.querySelector("#list");
const ciudades = document.querySelector("#cities");

let presionado = false;
let comenzarX;
let x;


// llamar al evento del boton
boton.addEventListener('click', (e) => {
    e.preventDefault();
    const itemLista = lista.querySelectorAll(".city");
    const ciudad = input.value;
    //conectar la api
    fetch("https://api.openweathermap.org/data/2.5/weather?q="
        + ciudad + 
        "&appid=ad61bf9360774cabad49c44a75fb6423&units=metric&lang=sp_es")
        //tomar los datos
        .then((respuesta) => respuesta.json())
        .then((datos) => {
            const name = datos['name'];
            const temp = datos['main']['temp'];
            const weather = datos['weather']['0']['main'];
            const icon = "https://openweathermap.org/img/wn/" + datos['weather']['0']['icon'] + ".png";
            const feeling = datos['main']['feels_like'];
            const tempMax = datos['main']['temp_max'];
            const tempMin = datos['main']['temp_min'];
            const humidity = datos['main']['humidity'];
            //crear la lista
            const li = document.createElement("li");
            li.classList.add("city");
            //agregar la discripcion en la lista
            const descripcion = `
            <h1>
            <span>${name}</span>
            </h1>
            <p>${temp}°C
            </p>
            <p>${weather}
            </p>
            <h2><img src=${icon}></h2>
            <p>Sensación Termica: ${feeling}
            </p>
            <p>Temp Max: ${tempMax}°C
            </p>
            <p>Temp Min: ${tempMin}°C
            </p>
            <p>Humedad: ${humidity}%
            </p>
            `;
            li.innerHTML = descripcion;
            lista.appendChild(li);
        })
        //atrapar el error
        .catch(error => console.log('error'))
})


//deslizar el carrusel


const comprobarLimite = () => {
    let externo = ciudades.getBoundingClientRect();
    let interno = lista.getBoundingClientRect();

    if (parseInt(lista.style.left) > 0) {
        lista.style.left = "0px";
    }

    if (interno.right < externo.right) {
        lista.style.left = `-${interno.width - externo.width}px`
    }
}

ciudades.addEventListener('mousedown', (e) => {
    presionado = true;
    comenzarX = e.offsetX - lista.offsetLeft;
    ciudades.style.cursor = "grabbing";
});

ciudades.addEventListener('mouseenter', () => {
    ciudades.style.cursor = "grab";
});

ciudades.addEventListener('mouseup', () => {
    ciudades.style.cursor = "grab";
    presionado = false;
});

ciudades.addEventListener('mousemove', (e) => {
    if (!presionado) return;
    e.preventDefault();

    x = e.offsetX;

    lista.style.left = `${x - comenzarX}px`

    comprobarLimite();
});