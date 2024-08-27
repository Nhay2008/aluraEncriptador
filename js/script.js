const inputText = document.getElementById('inputText');
const outputText = document.querySelector('.output-text .message-title');
const svgImage = document.querySelector('.output-text svg'); // Selecciona la imagen SVG
const messageInstruction = document.querySelector('.output-text .message-instruction');
const statusMessage = document.querySelector('.output-text .status-message'); // Mensaje de estado
const messageBox = document.querySelector('.message-box'); // Contenedor del mensaje

// Función para limpiar el texto
function cleanInputText(text) {
    // Eliminar acentos y convertir a minúsculas
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

inputText.addEventListener('input', function() {
    // Limpia el texto de entrada
    inputText.value = cleanInputText(inputText.value);

    // Muestra el mensaje de estado y oculta la imagen SVG al escribir
    svgImage.style.display = 'none'; // Oculta la imagen
    messageInstruction.style.display = 'none'; // Oculta la instrucción
    outputText.style.display = 'none'; // Oculta el mensaje de "Ningún mensaje fue encontrado"
    statusMessage.textContent = 'Escribiendo encriptación...'; // Muestra el mensaje de estado
    statusMessage.style.display = 'block'; // Muestra el mensaje de estado
});

document.getElementById('encryptBtn').addEventListener('click', function() {
    const inputValue = inputText.value.trim();
    const errorMessage = document.getElementById('error-message');

    if (inputValue === '') {
        errorMessage.textContent = 'Escribe una palabra para poder encriptar';
        errorMessage.classList.remove('hidden'); // Muestra el mensaje de error
        errorMessage.style.display = 'block'; // Asegúrate de que esté visible
        return; // Sale de la función si el texto está vacío
    }

    // Oculta el mensaje de error si hay texto
    errorMessage.style.display = 'none';

    const encryptedText = encryptText(inputValue);
    statusMessage.style.display = 'none'; // Oculta el mensaje de estado
    outputText.textContent = encryptedText || 'Texto vacío después de encriptar'; // Muestra el texto encriptado
    outputText.style.display = 'block'; // Muestra el resultado
    messageBox.style.display = 'block'; // Asegura que el contenedor del mensaje esté visible
});

document.getElementById('decryptBtn').addEventListener('click', function() {
    const inputValue = inputText.value.trim();
    const errorMessage = document.getElementById('error-message');

    if (inputValue === '') {
        errorMessage.textContent = 'Escribe una palabra para poder desencriptar';
        errorMessage.classList.remove('hidden'); // Muestra el mensaje de error
        errorMessage.style.display = 'block'; // Asegúrate de que esté visible
        return; // Sale de la función si el texto está vacío
    }

    // Oculta el mensaje de error si hay texto
    errorMessage.style.display = 'none';

    const decryptedText = decryptText(inputValue);
    statusMessage.style.display = 'none'; // Oculta el mensaje de estado
    outputText.textContent = decryptedText || 'Texto vacío después de desencriptar'; // Muestra el texto desencriptado
    outputText.style.display = 'block'; // Muestra el resultado
    messageBox.style.display = 'block'; // Asegura que el contenedor del mensaje esté visible
});

document.getElementById('copyBtn').addEventListener('click', function() {
    const inputTextElement = document.getElementById('inputText'); // Obtener el textarea de entrada
    const outputTextElement = document.getElementById('outputText');
    const outputTextContent = outputTextElement.querySelector('.message-box').textContent.trim(); // Obtener solo el texto visible de la caja de mensajes
    const copyMessage = document.getElementById('copy-message');

    // Verificar que hay texto para copiar
    if (inputTextElement.value.trim() !== "") {
        navigator.clipboard.writeText(inputTextElement.value.trim()) // Copia el texto del textarea
            .then(() => {
                // Mostrar el mensaje de copia
                copyMessage.textContent = 'Texto copiado al portapapeles';
                copyMessage.classList.remove('hidden'); // Muestra el mensaje
                copyMessage.style.display = 'block'; // Asegúrate de que esté visible

                // Ocultar el mensaje después de 2 segundos
                setTimeout(() => {
                    copyMessage.style.display = 'none';
                }, 2000);
            })
            .catch(err => {
                console.error('Error al copiar el texto: ', err);
            });
    } else {
        alert('No hay texto para copiar'); // Mensaje si no hay texto para copiar
    }
});

function encryptText(text) {
    return text
        .replace(/e/g, 'enter')
        .replace(/i/g, 'imes')
        .replace(/a/g, 'ai')
        .replace(/o/g, 'ober')
        .replace(/u/g, 'ufat');
}

function decryptText(text) {
    return text
        .replace(/enter/g, 'e')
        .replace(/imes/g, 'i')
        .replace(/ai/g, 'a')
        .replace(/ober/g, 'o')
        .replace(/ufat/g, 'u');
}
