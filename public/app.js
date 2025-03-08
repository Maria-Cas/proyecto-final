// Función que consulta la API de perros para obtener detalles sobre una raza específica
async function obtenerInformacionRaza(raceName) {
    try {
        // Reemplaza 'YOUR_API_KEY' con tu clave real de la API
        const apiKey = 'live_ObhKAQTiehStNYDlSLfGYeA4E31qnpEPZmEks4TgPD6IgdiyCs6MQCO1AIEZjQ02';
        const url = `https://api.thedogapi.com/v1/breeds/search?q=${raceName}&api_key=${apiKey}`;

        // Realizar la solicitud a la API externa
        const response = await fetch(url);

        // Verificar si la respuesta fue exitosa
        if (!response.ok) {
            throw new Error('Error al obtener la información sobre la raza');
        }

        // Convertir la respuesta a formato JSON
        const data = await response.json();

        // Si no se encuentra información, retornar un mensaje
        if (data.length === 0) {
            return `No se encontraron resultados para la raza ${raceName}. Intenta con otra.`;
        }

        // Obtener la información de la raza
        const raza = data[0]; // Tomamos el primer resultado

        // Formateamos la respuesta con los detalles
        const resultado = {
            nombre: raza.name,
            origen: raza.origin || 'Desconocido',
            vida: raza.life_span || 'Desconocido',
            temperamento: raza.temperament || 'Desconocido',
            peso: raza.weight.metric || 'Desconocido',
            altura: raza.height.metric || 'Desconocido',
            imagen: raza.image ? raza.image.url : 'No disponible'
        };

        // Imprimir o devolver los resultados
        return resultado;

    } catch (error) {
        console.error('Hubo un problema con la solicitud:', error);
        return 'No se pudo obtener la información de la raza debido a un error.';
    }
}

// Función para mostrar la información de la raza
async function mostrarInformacionRaza(raceName) {
    const infoRaza = await obtenerInformacionRaza(raceName);

    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = ''; // Limpiar el resultado previo

    if (typeof infoRaza === 'string') {
        resultadoDiv.innerHTML = infoRaza; // Si es un mensaje de error, lo mostramos
    } else {
        resultadoDiv.innerHTML = `
            <h2>Raza: ${infoRaza.nombre}</h2>
            <p><strong>Origen:</strong> ${infoRaza.origen}</p>
            <p><strong>Esperanza de vida:</strong> ${infoRaza.vida}</p>
            <p><strong>Temperamento:</strong> ${infoRaza.temperamento}</p>
            <p><strong>Peso:</strong> ${infoRaza.peso} kg</p>
            <p><strong>Altura:</strong> ${infoRaza.altura} cm</p>
            <p><strong>Imagen:</strong> <img src="${infoRaza.imagen}" alt="Imagen de la raza" style="width: 300px;"></p>
        `;
    }
}

// Función que se ejecuta cuando el usuario hace clic en el botón de buscar
function buscarRaza() {
    const raceName = document.getElementById('raceInput').value.trim().toLowerCase();
    if (raceName) {
        mostrarInformacionRaza(raceName);
    } else {
        alert('Por favor, ingresa una raza de perro.');
    }
}
