document.addEventListener('DOMContentLoaded', function () {
    // Leer parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const mensaje = atob(urlParams.get('msg') || ''); // Decodificar el mensaje
    const [msg, tipoCaja, cantidad] = mensaje.split('|');

    const counterElement = document.getElementById('counter');
    const questionElement = document.getElementById('question');
    const boxImg = document.getElementById('box-img');

    // Mostrar mensaje personalizado si está disponible
    if (msg) {
        questionElement.textContent = msg;
    }

    // Establecer la imagen de la caja dependiendo del tipo
    switch (tipoCaja) {
        case 'Caja Brawl':
            boxImg.src = './assets/caja-brawl.png'; // Ruta a la imagen de la Caja Brawl
            break;
        case 'Caja Grande':
            boxImg.src = './assets/caja-grande.png'; // Ruta a la imagen de la Caja Grande
            break;
        case 'Megacaja':
            boxImg.src = './assets/megacaja.png'; // Ruta a la imagen de la Megacaja
            break;
        default:
            boxImg.src = 'caja-brawl.png'; // Imagen por defecto
            break;
    }

    let counter = parseInt(cantidad) || 6; // Usamos el valor de cantidad desde la URL, por defecto 6

    counterElement.textContent = counter; // Mostrar la cantidad inicial

    boxImg.addEventListener('click', () => {
        if (counter <= 0) return;

        counter--;

        // Si es el último clic, no mostrar el "0"
        if (counter === 0) {
            counterElement.style.display = 'none';
            boxImg.style.transition = 'none';

            setTimeout(() => {
                boxImg.classList.add('explode');
                setTimeout(() => {
                    boxImg.style.display = 'none';
                    questionElement.style.display = 'block';
                }, 300);
            }, 50);
        } else {
            counterElement.textContent = counter;

            // Efecto de aparición/desaparición
            boxImg.style.transition = 'opacity 0.5s';
            boxImg.style.opacity = '0';

            setTimeout(() => {
                boxImg.style.opacity = '1';
            }, 500);

            // Efecto pulsante cuando queda 1
            if (counter === 1) {
                counterElement.classList.add('pulsating-shadow');
            }
        }
    });
});

