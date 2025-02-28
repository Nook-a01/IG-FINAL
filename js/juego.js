// Secuencia correcta de samples (nivel 1)
const correctOrder = [
    "track_16", "track_17", "track_16", "track_17" // Solo Sample 1 seguido de Sample 2
];

// Secuencia correcta de samples (nivel 2)
const correctOrder2 = [
    "track_2", "track_2", "track_2", "track_1", "track_2", "track_2", "track_2", "track_1", "track_3", "track_3", "track_3", "track_3", "track_3", "track_3", "track_3"
];

// Secuencia correcta de samples (nivel 3)
const correctOrder3 = [
    "track_19", "track_21", "track_20", "track_18", "track_19", "track_21", "track_20", "track_18" // Secuencia correcta para el Nivel 3
];

// Secuencia correcta de samples (nivel 4)
const correctOrder4 = [
    "track_15", "track_15", "track_15", "track_15", "track_12", "track_12", "track_12", "track_12", "track_12", "track_12", "track_11", "track_13", "track_14", "track_11" // Secuencia correcta para el Nivel 4
];

// Secuencia correcta de samples (nivel 5)
const correctOrder5 = [
    "track_4", "track_5", "track_6", "track_4", "track_8", "track_5", "track_9", "track_7", "track_5", "track_7", "track_8", "track_5", "track_8", "track_6" , "track_5" // Secuencia correcta para el Nivel 5
];

// Variable para almacenar el audio actual
let currentAudio = null;

// Variables para el temporizador
let timeLeft = 300; // 5 minutos en segundos (cambiado de 120 a 300)
let timerInterval;

// Variable para almacenar el nivel actual
let nivelActual = 1; // 1 para Nivel 1, 2 para Nivel 2, 3 para Nivel 3, 4 para Nivel 4, 5 para Nivel 5

// Función para iniciar el temporizador
function startTimer() {
    timerInterval = setInterval(updateTimer, 1000); // Actualiza cada segundo
}

// Función para actualizar el temporizador
function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    // Actualizar el temporizador según el nivel actual
    if (nivelActual === 1) {
        document.getElementById("timer").textContent = timerText;
    } else if (nivelActual === 2) {
        document.getElementById("timer2").textContent = timerText;
    } else if (nivelActual === 3) {
        document.getElementById("timer3").textContent = timerText;
    } else if (nivelActual === 4) {
        document.getElementById("timer4").textContent = timerText;
    } else if (nivelActual === 5) {
        document.getElementById("timer5").textContent = timerText;
    }

    if (timeLeft === 0) {
        clearInterval(timerInterval); // Detiene el temporizador
        mostrarModalPerdiste(); // Muestra el modal de "Se te acabó el tiempo"
        bloquearFuncionalidades(); // Bloquea las funcionalidades del juego
    } else {
        timeLeft--; // Reduce el tiempo restante
    }
}

// Función para mostrar el modal de "Se te acabó el tiempo"
function mostrarModalPerdiste() {
    const modalPerdiste = new bootstrap.Modal(document.getElementById('modalPerdiste'));
    modalPerdiste.show();

    // Cambiar el texto del botón según el nivel actual
    const botonReintentar = document.querySelector("#modalPerdiste .btn-primary");
    if (nivelActual === 1) {
        botonReintentar.textContent = "Volver a intentar";
        botonReintentar.onclick = reiniciarNivel;
    } else if (nivelActual === 2) {
        botonReintentar.textContent = "Volver al Nivel 1";
        botonReintentar.onclick = reiniciarAlNivel1;
    } else if (nivelActual === 3) {
        botonReintentar.textContent = "Volver al Nivel 1";
        botonReintentar.onclick = reiniciarAlNivel1;
    } else if (nivelActual === 4) {
        botonReintentar.textContent = "Volver al Nivel 1";
        botonReintentar.onclick = reiniciarAlNivel1;
    } else if (nivelActual === 5) {
        botonReintentar.textContent = "Volver al Nivel 1";
        botonReintentar.onclick = reiniciarAlNivel1;
    }
}

// Función para reiniciar el nivel (Nivel 1)
function reiniciarNivel() {
    // Cerrar el modal de "Se te acabó el tiempo"
    const modalPerdiste = bootstrap.Modal.getInstance(document.getElementById('modalPerdiste'));
    modalPerdiste.hide();

    // Reiniciar el temporizador
    timeLeft = 300; // Reinicia a 5 minutos (cambiado de 120 a 300)
    document.getElementById("timer").textContent = "05:00"; // Actualiza el texto del temporizador
    startTimer(); // Inicia el temporizador nuevamente

    // Limpiar el área de drop (eliminar todos los samples colocados)
    const dropzone = document.getElementById("dropzone");
    dropzone.innerHTML = "";

    // Reiniciar cualquier otro estado necesario (opcional)
    document.getElementById("message").innerText = ""; // Limpiar el mensaje de resultado

    // Habilitar las funcionalidades del juego
    habilitarFuncionalidades();
}

// Función para reiniciar al Nivel 1 (desde el Nivel 2, 3, 4 o 5)
function reiniciarAlNivel1() {
    // Cerrar el modal de "Se te acabó el tiempo"
    const modalPerdiste = bootstrap.Modal.getInstance(document.getElementById('modalPerdiste'));
    modalPerdiste.hide();

    // Ocultar todos los niveles y mostrar el Nivel 1
    document.getElementById("nivel2").style.display = "none";
    document.getElementById("nivel3").style.display = "none";
    document.getElementById("nivel4").style.display = "none";
    document.getElementById("nivel5").style.display = "none";
    document.getElementById("nivel1").style.display = "block";

    // Actualizar el nivel actual
    nivelActual = 1;

    // Reiniciar el temporizador del Nivel 1
    timeLeft = 300; // Reinicia a 5 minutos (cambiado de 120 a 300)
    document.getElementById("timer").textContent = "05:00"; // Actualiza el texto del temporizador
    startTimer();

    // Limpiar el área de drop de todos los niveles
    document.getElementById("dropzone2").innerHTML = "";
    document.getElementById("dropzone3").innerHTML = "";
    document.getElementById("dropzone4").innerHTML = "";
    document.getElementById("dropzone5").innerHTML = "";

    // Limpiar el mensaje de resultado de todos los niveles
    document.getElementById("message2").innerText = "";
    document.getElementById("message3").innerText = "";
    document.getElementById("message4").innerText = "";
    document.getElementById("message5").innerText = "";

    // Habilitar las funcionalidades del juego
    habilitarFuncionalidades();

    // Actualizar el mensaje de la cantidad de samples
    actualizarCantidadSamples();
}

// Función para habilitar las funcionalidades del juego
function habilitarFuncionalidades() {
    // Habilitar los botones de samples
    document.querySelectorAll(".sample-buttons button").forEach(button => {
        button.disabled = false;
    });

    // Habilitar el área de drop
    document.getElementById("dropzone").ondragover = allowDrop; // Permite soltar el botón
    document.getElementById("dropzone").ondrop = drop; // Maneja el evento de soltar

    // Habilitar los botones de control
    document.querySelector(".btn-info").disabled = false; // Botón "Escuchar Respuesta"
    document.querySelector(".btn-danger").disabled = false; // Botón "Eliminar Sample"
    document.querySelector(".btn-success").disabled = false; // Botón "Verificar"
}

// Función para bloquear las funcionalidades del juego
function bloquearFuncionalidades() {
    // Deshabilitar los botones de samples
    document.querySelectorAll(".sample-buttons button").forEach(button => {
        button.disabled = true;
    });

    // Deshabilitar el área de drop
    document.getElementById("dropzone").ondragover = null;
    document.getElementById("dropzone").ondrop = null;

    // Deshabilitar los botones de control
    document.querySelector(".btn-info").disabled = true; // Botón "Escuchar Respuesta"
    document.querySelector(".btn-danger").disabled = true; // Botón "Eliminar Sample"
    document.querySelector(".btn-success").disabled = true; // Botón "Verificar"
}

// Función para comenzar el juego (oculta la pantalla de inicio y muestra el nivel 1)
function comenzarJuego() {
    document.getElementById("pantallaInicio").style.display = "none"; // Oculta la pantalla de inicio
    document.getElementById("nivel1").style.display = "block"; // Muestra el nivel 1
    startTimer(); // Inicia el temporizador

    // Actualizar el mensaje de la cantidad de samples
    actualizarCantidadSamples();
}

// Función para detener cualquier audio que esté sonando
function stopCurrentAudio() {
    if (currentAudio) {
        currentAudio.pause(); // Detiene el audio actual
        currentAudio.currentTime = 0; // Reinicia el audio al inicio
    }
}

// Función para reproducir el audio de referencia (Nivel 1)
function playSong() {
    stopCurrentAudio(); // Detiene cualquier audio que esté sonando
    const audio = document.getElementById("song"); // Obtiene el elemento de audio
    currentAudio = audio; // Almacena el audio actual
    audio.play() // Reproduce el audio
        .then(() => console.log("Audio de referencia reproducido correctamente")) // Mensaje de éxito
        .catch(error => console.error("Error al reproducir el audio de referencia:", error)); // Manejo de errores
}

// Función para reproducir el audio de referencia (Nivel 2)
function playSong2() {
    stopCurrentAudio(); // Detiene cualquier audio que esté sonando
    const audio = document.getElementById("song2"); // Obtiene el elemento de audio
    currentAudio = audio; // Almacena el audio actual
    audio.play() // Reproduce el audio
        .then(() => console.log("Audio de referencia reproducido correctamente")) // Mensaje de éxito
        .catch(error => console.error("Error al reproducir el audio de referencia:", error)); // Manejo de errores
}

// Función para reproducir el audio de referencia (Nivel 3)
function playSong3() {
    stopCurrentAudio(); // Detiene cualquier audio que esté sonando
    const audio = document.getElementById("song3"); // Obtiene el elemento de audio
    currentAudio = audio; // Almacena el audio actual
    audio.play() // Reproduce el audio
        .then(() => console.log("Audio de referencia reproducido correctamente")) // Mensaje de éxito
        .catch(error => console.error("Error al reproducir el audio de referencia:", error)); // Manejo de errores
}

// Función para reproducir el audio de referencia (Nivel 4)
function playSong4() {
    stopCurrentAudio(); // Detiene cualquier audio que esté sonando
    const audio = document.getElementById("song4"); // Obtiene el elemento de audio
    currentAudio = audio; // Almacena el audio actual
    audio.play() // Reproduce el audio
        .then(() => console.log("Audio de referencia reproducido correctamente")) // Mensaje de éxito
        .catch(error => console.error("Error al reproducir el audio de referencia:", error)); // Manejo de errores
}

// Función para reproducir el audio de referencia (Nivel 5)
function playSong5() {
    stopCurrentAudio(); // Detiene cualquier audio que esté sonando
    const audio = document.getElementById("song5"); // Obtiene el elemento de audio
    currentAudio = audio; // Almacena el audio actual
    audio.play() // Reproduce el audio
        .then(() => console.log("Audio de referencia reproducido correctamente")) // Mensaje de éxito
        .catch(error => console.error("Error al reproducir el audio de referencia:", error)); // Manejo de errores
}

// Función para reproducir los samples (Nivel 1)
function playSample(sampleName) {
    stopCurrentAudio(); // Detiene cualquier audio que esté sonando
    const audio = new Audio(`sounds/nivel_1/${sampleName}.wav`); // Crea un nuevo elemento de audio
    currentAudio = audio; // Almacena el audio actual
    audio.play() // Reproduce el sample
        .then(() => console.log(`Sample ${sampleName} reproducido correctamente`)) // Mensaje de éxito
        .catch(error => console.error(`Error al reproducir el sample ${sampleName}:`, error)); // Manejo de errores
}

// Función para reproducir los samples (Nivel 2)
function playSample2(sampleName) {
    stopCurrentAudio(); // Detiene cualquier audio que esté sonando
    const audio = new Audio(`sounds/nivel_2/${sampleName}.wav`); // Crea un nuevo elemento de audio
    currentAudio = audio; // Almacena el audio actual
    audio.play() // Reproduce el sample
        .then(() => console.log(`Sample ${sampleName} reproducido correctamente`)) // Mensaje de éxito
        .catch(error => console.error(`Error al reproducir el sample ${sampleName}:`, error)); // Manejo de errores
}

// Función para reproducir los samples (Nivel 3)
function playSample3(sampleName) {
    stopCurrentAudio(); // Detiene cualquier audio que esté sonando
    const audio = new Audio(`sounds/nivel_3/${sampleName}.wav`); // Crea un nuevo elemento de audio
    currentAudio = audio; // Almacena el audio actual
    audio.play() // Reproduce el sample
        .then(() => console.log(`Sample ${sampleName} reproducido correctamente`)) // Mensaje de éxito
        .catch(error => console.error(`Error al reproducir el sample ${sampleName}:`, error)); // Manejo de errores
}

// Función para reproducir los samples (Nivel 4)
function playSample4(sampleName) {
    stopCurrentAudio(); // Detiene cualquier audio que esté sonando
    const audio = new Audio(`sounds/nivel_4/${sampleName}.wav`); // Crea un nuevo elemento de audio
    currentAudio = audio; // Almacena el audio actual
    audio.play() // Reproduce el sample
        .then(() => console.log(`Sample ${sampleName} reproducido correctamente`)) // Mensaje de éxito
        .catch(error => console.error(`Error al reproducir el sample ${sampleName}:`, error)); // Manejo de errores
}

// Función para reproducir los samples (Nivel 5)
function playSample5(sampleName) {
    stopCurrentAudio(); // Detiene cualquier audio que esté sonando
    const audio = new Audio(`sounds/nivel_5/${sampleName}.wav`); // Crea un nuevo elemento de audio
    currentAudio = audio; // Almacena el audio actual
    audio.play() // Reproduce el sample
        .then(() => console.log(`Sample ${sampleName} reproducido correctamente`)) // Mensaje de éxito
        .catch(error => console.error(`Error al reproducir el sample ${sampleName}:`, error)); // Manejo de errores
}

// Función para manejar el arrastre de los botones
function drag(event) {
    event.dataTransfer.setData("text", event.target.id); // Guarda el ID del botón arrastrado
}

// Función para permitir soltar en el área de drop
function allowDrop(event) {
    event.preventDefault(); // Permite soltar el botón
}

// Función para manejar el evento de soltar (Nivel 1)
function drop(event) {
    event.preventDefault(); // Evita el comportamiento por defecto
    const sampleId = event.dataTransfer.getData("text"); // Obtiene el ID del botón arrastrado
    const sample = document.getElementById(sampleId); // Obtiene el elemento del botón

    // Verifica si el sample ya está en el área de drop
    if (event.target.closest("#dropzone").contains(sample)) {
        // Si el sample ya está en el área de drop, simplemente lo movemos
        const dropzone = document.getElementById("dropzone");
        const targetSample = event.target;

        // Si el objetivo es el área de drop, mueve el sample al final
        if (event.target.id === "dropzone") {
            dropzone.appendChild(sample);
        } else {
            // Si el objetivo es un sample dentro del área de drop, inserta el sample antes del objetivo
            dropzone.insertBefore(sample, targetSample);
        }
    } else {
        // Si el sample no está en el área de drop, lo agregamos
        const clonedSample = sample.cloneNode(true);
        clonedSample.draggable = true; // Asegura que el clon sea arrastrable
        clonedSample.ondragstart = drag; // Asigna la función de arrastre al clon
        clonedSample.onclick = () => playSample(sampleId); // Reproduce el sample al hacer clic

        // Verifica si el objetivo es un sample existente
        if (event.target.classList.contains('btn')) {
            alert("No puedes colocar un sample dentro de otro sample.");
            return;
        }

        // Si el objetivo es el área de drop, agrega el clon al área de drop
        if (event.target.id === "dropzone") {
            event.target.appendChild(clonedSample);
        } else {
            // Si el objetivo es un sample dentro del área de drop, inserta el clon antes del sample objetivo
            event.target.parentNode.insertBefore(clonedSample, event.target);
        }
    }
}

// Función para manejar el evento de soltar (Nivel 2)
function drop2(event) {
    event.preventDefault(); // Evita el comportamiento por defecto
    const sampleId = event.dataTransfer.getData("text"); // Obtiene el ID del botón arrastrado
    const sample = document.getElementById(sampleId); // Obtiene el elemento del botón

    // Verifica si el sample ya está en el área de drop
    if (event.target.closest("#dropzone2").contains(sample)) {
        // Si el sample ya está en el área de drop, simplemente lo movemos
        const dropzone = document.getElementById("dropzone2");
        const targetSample = event.target;

        // Si el objetivo es el área de drop, mueve el sample al final
        if (event.target.id === "dropzone2") {
            dropzone.appendChild(sample);
        } else {
            // Si el objetivo es un sample dentro del área de drop, inserta el sample antes del objetivo
            dropzone.insertBefore(sample, targetSample);
        }
    } else {
        // Si el sample no está en el área de drop, lo agregamos
        const clonedSample = sample.cloneNode(true);
        clonedSample.draggable = true; // Asegura que el clon sea arrastrable
        clonedSample.ondragstart = drag; // Asigna la función de arrastre al clon
        clonedSample.onclick = () => playSample2(sampleId); // Reproduce el sample al hacer clic

        // Verifica si el objetivo es un sample existente
        if (event.target.classList.contains('btn')) {
            alert("No puedes colocar un sample dentro de otro sample.");
            return;
        }

        // Si el objetivo es el área de drop, agrega el clon al área de drop
        if (event.target.id === "dropzone2") {
            event.target.appendChild(clonedSample);
        } else {
            // Si el objetivo es un sample dentro del área de drop, inserta el clon antes del sample objetivo
            event.target.parentNode.insertBefore(clonedSample, event.target);
        }
    }
}

// Función para manejar el evento de soltar (Nivel 3)
function drop3(event) {
    event.preventDefault(); // Evita el comportamiento por defecto
    const sampleId = event.dataTransfer.getData("text"); // Obtiene el ID del botón arrastrado
    const sample = document.getElementById(sampleId); // Obtiene el elemento del botón

    // Verifica si el sample ya está en el área de drop
    if (event.target.closest("#dropzone3").contains(sample)) {
        // Si el sample ya está en el área de drop, simplemente lo movemos
        const dropzone = document.getElementById("dropzone3");
        const targetSample = event.target;

        // Si el objetivo es el área de drop, mueve el sample al final
        if (event.target.id === "dropzone3") {
            dropzone.appendChild(sample);
        } else {
            // Si el objetivo es un sample dentro del área de drop, inserta el sample antes del objetivo
            dropzone.insertBefore(sample, targetSample);
        }
    } else {
        // Si el sample no está en el área de drop, lo agregamos
        const clonedSample = sample.cloneNode(true);
        clonedSample.draggable = true; // Asegura que el clon sea arrastrable
        clonedSample.ondragstart = drag; // Asigna la función de arrastre al clon
        clonedSample.onclick = () => playSample3(sampleId); // Reproduce el sample al hacer clic

        // Verifica si el objetivo es un sample existente
        if (event.target.classList.contains('btn')) {
            alert("No puedes colocar un sample dentro de otro sample.");
            return;
        }

        // Si el objetivo es el área de drop, agrega el clon al área de drop
        if (event.target.id === "dropzone3") {
            event.target.appendChild(clonedSample);
        } else {
            // Si el objetivo es un sample dentro del área de drop, inserta el clon antes del sample objetivo
            event.target.parentNode.insertBefore(clonedSample, event.target);
        }
    }
}

// Función para manejar el evento de soltar (Nivel 4)
function drop4(event) {
    event.preventDefault(); // Evita el comportamiento por defecto
    const sampleId = event.dataTransfer.getData("text"); // Obtiene el ID del botón arrastrado
    const sample = document.getElementById(sampleId); // Obtiene el elemento del botón

    // Verifica si el sample ya está en el área de drop
    if (event.target.closest("#dropzone4").contains(sample)) {
        // Si el sample ya está en el área de drop, simplemente lo movemos
        const dropzone = document.getElementById("dropzone4");
        const targetSample = event.target;

        // Si el objetivo es el área de drop, mueve el sample al final
        if (event.target.id === "dropzone4") {
            dropzone.appendChild(sample);
        } else {
            // Si el objetivo es un sample dentro del área de drop, inserta el sample antes del objetivo
            dropzone.insertBefore(sample, targetSample);
        }
    } else {
        // Si el sample no está en el área de drop, lo agregamos
        const clonedSample = sample.cloneNode(true);
        clonedSample.draggable = true; // Asegura que el clon sea arrastrable
        clonedSample.ondragstart = drag; // Asigna la función de arrastre al clon
        clonedSample.onclick = () => playSample4(sampleId); // Reproduce el sample al hacer clic

        // Verifica si el objetivo es un sample existente
        if (event.target.classList.contains('btn')) {
            alert("No puedes colocar un sample dentro de otro sample.");
            return;
        }

        // Si el objetivo es el área de drop, agrega el clon al área de drop
        if (event.target.id === "dropzone4") {
            event.target.appendChild(clonedSample);
        } else {
            // Si el objetivo es un sample dentro del área de drop, inserta el clon antes del sample objetivo
            event.target.parentNode.insertBefore(clonedSample, event.target);
        }
    }
}

// Función para manejar el evento de soltar (Nivel 5)
function drop5(event) {
    event.preventDefault(); // Evita el comportamiento por defecto
    const sampleId = event.dataTransfer.getData("text"); // Obtiene el ID del botón arrastrado
    const sample = document.getElementById(sampleId); // Obtiene el elemento del botón

    // Verifica si el sample ya está en el área de drop
    if (event.target.closest("#dropzone5").contains(sample)) {
        // Si el sample ya está en el área de drop, simplemente lo movemos
        const dropzone = document.getElementById("dropzone5");
        const targetSample = event.target;

        // Si el objetivo es el área de drop, mueve el sample al final
        if (event.target.id === "dropzone5") {
            dropzone.appendChild(sample);
        } else {
            // Si el objetivo es un sample dentro del área de drop, inserta el sample antes del objetivo
            dropzone.insertBefore(sample, targetSample);
        }
    } else {
        // Si el sample no está en el área de drop, lo agregamos
        const clonedSample = sample.cloneNode(true);
        clonedSample.draggable = true; // Asegura que el clon sea arrastrable
        clonedSample.ondragstart = drag; // Asigna la función de arrastre al clon
        clonedSample.onclick = () => playSample5(sampleId); // Reproduce el sample al hacer clic

        // Verifica si el objetivo es un sample existente
        if (event.target.classList.contains('btn')) {
            alert("No puedes colocar un sample dentro de otro sample.");
            return;
        }

        // Si el objetivo es el área de drop, agrega el clon al área de drop
        if (event.target.id === "dropzone5") {
            event.target.appendChild(clonedSample);
        } else {
            // Si el objetivo es un sample dentro del área de drop, inserta el clon antes del sample objetivo
            event.target.parentNode.insertBefore(clonedSample, event.target);
        }
    }
}

// Función para eliminar el último sample de la respuesta (Nivel 1)
function removeLastSample() {
    const dropzone = document.getElementById("dropzone");
    const lastSample = dropzone.lastElementChild; // Obtiene el último sample en el área de drop

    if (lastSample) {
        lastSample.remove(); // Elimina el último sample
        console.log("Último sample eliminado correctamente");
    } else {
        console.log("No hay samples para eliminar");
    }
}

// Función para eliminar el último sample de la respuesta (Nivel 2)
function removeLastSample2() {
    const dropzone = document.getElementById("dropzone2");
    const lastSample = dropzone.lastElementChild; // Obtiene el último sample en el área de drop

    if (lastSample) {
        lastSample.remove(); // Elimina el último sample
        console.log("Último sample eliminado correctamente");
    } else {
        console.log("No hay samples para eliminar");
    }
}

// Función para eliminar el último sample de la respuesta (Nivel 3)
function removeLastSample3() {
    const dropzone = document.getElementById("dropzone3");
    const lastSample = dropzone.lastElementChild; // Obtiene el último sample en el área de drop

    if (lastSample) {
        lastSample.remove(); // Elimina el último sample
        console.log("Último sample eliminado correctamente");
    } else {
        console.log("No hay samples para eliminar");
    }
}

// Función para eliminar el último sample de la respuesta (Nivel 4)
function removeLastSample4() {
    const dropzone = document.getElementById("dropzone4");
    const lastSample = dropzone.lastElementChild; // Obtiene el último sample en el área de drop

    if (lastSample) {
        lastSample.remove(); // Elimina el último sample
        console.log("Último sample eliminado correctamente");
    } else {
        console.log("No hay samples para eliminar");
    }
}

// Función para eliminar el último sample de la respuesta (Nivel 5)
function removeLastSample5() {
    const dropzone = document.getElementById("dropzone5");
    const lastSample = dropzone.lastElementChild; // Obtiene el último sample en el área de drop

    if (lastSample) {
        lastSample.remove(); // Elimina el último sample
        console.log("Último sample eliminado correctamente");
    } else {
        console.log("No hay samples para eliminar");
    }
}

// Función para reproducir la respuesta del jugador (Nivel 1)
function playAnswer() {
    const dropzone = document.getElementById("dropzone");
    const placedSamples = Array.from(dropzone.children); // Obtiene los botones en el área de drop

    // Detener cualquier audio que esté sonando
    stopCurrentAudio();

    // Función para reproducir los samples en secuencia sin superposición
    const playSequence = async (samples) => {
        for (const sample of samples) {
            const sampleName = sample.id; // Obtiene el ID del sample (track_16 o track_17)
            const audio = new Audio(`sounds/nivel_1/${sampleName}.wav`); // Crea un nuevo elemento de audio

            // Reproduce el sample y espera a que termine antes de continuar
            await new Promise((resolve) => {
                audio.play(); // Reproduce el sample
                audio.onended = resolve; // Espera a que el sample termine
            });
        }
    };

    // Inicia la reproducción de la secuencia
    playSequence(placedSamples)
        .then(() => console.log("Secuencia reproducida correctamente"))
        .catch(error => console.error("Error al reproducir la secuencia:", error));
}

// Función para reproducir la respuesta del jugador (Nivel 2)
function playAnswer2() {
    const dropzone = document.getElementById("dropzone2");
    const placedSamples = Array.from(dropzone.children); // Obtiene los botones en el área de drop

    // Detener cualquier audio que esté sonando
    stopCurrentAudio();

    // Función para reproducir los samples en secuencia sin superposición
    const playSequence = async (samples) => {
        for (const sample of samples) {
            const sampleName = sample.id; // Obtiene el ID del sample (track_1, track_2, track_3)
            const audio = new Audio(`sounds/nivel_2/${sampleName}.wav`); // Crea un nuevo elemento de audio

            // Reproduce el sample y espera a que termine antes de continuar
            await new Promise((resolve) => {
                audio.play(); // Reproduce el sample
                audio.onended = resolve; // Espera a que el sample termine
            });
        }
    };

    // Inicia la reproducción de la secuencia
    playSequence(placedSamples)
        .then(() => console.log("Secuencia reproducida correctamente"))
        .catch(error => console.error("Error al reproducir la secuencia:", error));
}

// Función para reproducir la respuesta del jugador (Nivel 3)
function playAnswer3() {
    const dropzone = document.getElementById("dropzone3");
    const placedSamples = Array.from(dropzone.children); // Obtiene los botones en el área de drop

    // Detener cualquier audio que esté sonando
    stopCurrentAudio();

    // Función para reproducir los samples en secuencia sin superposición
    const playSequence = async (samples) => {
        for (const sample of samples) {
            const sampleName = sample.id; // Obtiene el ID del sample (track_18, track_19, etc.)
            const audio = new Audio(`sounds/nivel_3/${sampleName}.wav`); // Crea un nuevo elemento de audio

            // Reproduce el sample y espera a que termine antes de continuar
            await new Promise((resolve) => {
                audio.play(); // Reproduce el sample
                audio.onended = resolve; // Espera a que el sample termine
            });
        }
    };

    // Inicia la reproducción de la secuencia
    playSequence(placedSamples)
        .then(() => console.log("Secuencia reproducida correctamente"))
        .catch(error => console.error("Error al reproducir la secuencia:", error));
}

// Función para reproducir la respuesta del jugador (Nivel 4)
function playAnswer4() {
    const dropzone = document.getElementById("dropzone4");
    const placedSamples = Array.from(dropzone.children); // Obtiene los botones en el área de drop

    // Detener cualquier audio que esté sonando
    stopCurrentAudio();

    // Función para reproducir los samples en secuencia sin superposición
    const playSequence = async (samples) => {
        for (const sample of samples) {
            const sampleName = sample.id; // Obtiene el ID del sample (track_11, track_12, etc.)
            const audio = new Audio(`sounds/nivel_4/${sampleName}.wav`); // Crea un nuevo elemento de audio

            // Reproduce el sample y espera a que termine antes de continuar
            await new Promise((resolve) => {
                audio.play(); // Reproduce el sample
                audio.onended = resolve; // Espera a que el sample termine
            });
        }
    };

    // Inicia la reproducción de la secuencia
    playSequence(placedSamples)
        .then(() => console.log("Secuencia reproducida correctamente"))
        .catch(error => console.error("Error al reproducir la secuencia:", error));
}

// Función para reproducir la respuesta del jugador (Nivel 5)
function playAnswer5() {
    const dropzone = document.getElementById("dropzone5");
    const placedSamples = Array.from(dropzone.children); // Obtiene los botones en el área de drop

    // Detener cualquier audio que esté sonando
    stopCurrentAudio();

    // Función para reproducir los samples en secuencia sin superposición
    const playSequence = async (samples) => {
        for (const sample of samples) {
            const sampleName = sample.id; // Obtiene el ID del sample (track_4, track_5, etc.)
            const audio = new Audio(`sounds/nivel_5/${sampleName}.wav`); // Crea un nuevo elemento de audio

            // Reproduce el sample y espera a que termine antes de continuar
            await new Promise((resolve) => {
                audio.play(); // Reproduce el sample
                audio.onended = resolve; // Espera a que el sample termine
            });
        }
    };

    // Inicia la reproducción de la secuencia
    playSequence(placedSamples)
        .then(() => console.log("Secuencia reproducida correctamente"))
        .catch(error => console.error("Error al reproducir la secuencia:", error));
}

// Función para verificar la secuencia (Nivel 1)
function checkOrder() {
    const dropzone = document.getElementById("dropzone");
    const placedSamples = Array.from(dropzone.children); // Obtiene los botones en el área de drop
    const placedOrder = placedSamples.map(sample => sample.id); // Obtiene los IDs de los botones

    // Compara la secuencia colocada con la secuencia correcta
    if (JSON.stringify(placedOrder) === JSON.stringify(correctOrder)) {
        // Detener el temporizador
        clearInterval(timerInterval);

        // Mostrar el modal de felicitaciones
        const modalFelicitaciones = new bootstrap.Modal(document.getElementById('modalFelicitaciones'));
        modalFelicitaciones.show();

        // Bloquear las funcionalidades del juego
        bloquearFuncionalidades();
    } else {
        document.getElementById("message").innerText = "Inténtalo de nuevo. Algo no está en su lugar.";
        document.getElementById("message").style.color = "red";
    }
}

// Función para verificar la secuencia (Nivel 2)
function checkOrder2() {
    const dropzone = document.getElementById("dropzone2");
    const placedSamples = Array.from(dropzone.children); // Obtiene los botones en el área de drop
    const placedOrder = placedSamples.map(sample => sample.id); // Obtiene los IDs de los botones

    // Compara la secuencia colocada con la secuencia correcta
    if (JSON.stringify(placedOrder) === JSON.stringify(correctOrder2)) {
        // Detener el temporizador
        clearInterval(timerInterval);

        // Mostrar el modal de felicitaciones
        const modalFelicitaciones = new bootstrap.Modal(document.getElementById('modalFelicitaciones2'));
        modalFelicitaciones.show();

        // Bloquear las funcionalidades del juego
        bloquearFuncionalidades();
    } else {
        document.getElementById("message2").innerText = "Inténtalo de nuevo. Algo no está en su lugar.";
        document.getElementById("message2").style.color = "red";
    }
}

// Función para verificar la secuencia (Nivel 3)
function checkOrder3() {
    const dropzone = document.getElementById("dropzone3");
    const placedSamples = Array.from(dropzone.children); // Obtiene los botones en el área de drop
    const placedOrder = placedSamples.map(sample => sample.id); // Obtiene los IDs de los botones

    // Compara la secuencia colocada con la secuencia correcta
    if (JSON.stringify(placedOrder) === JSON.stringify(correctOrder3)) {
        // Detener el temporizador
        clearInterval(timerInterval);

        // Mostrar el modal de felicitaciones
        const modalFelicitaciones = new bootstrap.Modal(document.getElementById('modalFelicitaciones3'));
        modalFelicitaciones.show();

        // Bloquear las funcionalidades del juego
        bloquearFuncionalidades();
    } else {
        document.getElementById("message3").innerText = "Inténtalo de nuevo. Algo no está en su lugar.";
        document.getElementById("message3").style.color = "red";
    }
}

// Función para verificar la secuencia (Nivel 4)
function checkOrder4() {
    const dropzone = document.getElementById("dropzone4");
    const placedSamples = Array.from(dropzone.children); // Obtiene los botones en el área de drop
    const placedOrder = placedSamples.map(sample => sample.id); // Obtiene los IDs de los botones

    // Compara la secuencia colocada con la secuencia correcta
    if (JSON.stringify(placedOrder) === JSON.stringify(correctOrder4)) {
        // Detener el temporizador
        clearInterval(timerInterval);

        // Mostrar el modal de felicitaciones
        const modalFelicitaciones = new bootstrap.Modal(document.getElementById('modalFelicitaciones4'));
        modalFelicitaciones.show();

        // Bloquear las funcionalidades del juego
        bloquearFuncionalidades();
    } else {
        document.getElementById("message4").innerText = "Inténtalo de nuevo. Algo no está en su lugar.";
        document.getElementById("message4").style.color = "red";
    }
}

// Función para verificar la secuencia (Nivel 5)
function checkOrder5() {
    const dropzone = document.getElementById("dropzone5");
    const placedSamples = Array.from(dropzone.children); // Obtiene los botones en el área de drop
    const placedOrder = placedSamples.map(sample => sample.id); // Obtiene los IDs de los botones

    // Compara la secuencia colocada con la secuencia correcta
    if (JSON.stringify(placedOrder) === JSON.stringify(correctOrder5)) {
        // Detener el temporizador
        clearInterval(timerInterval);

        // Bloquear las funcionalidades del juego
        bloquearFuncionalidades();

        // Mostrar directamente la pantalla final
        mostrarPantallaFinal();
    } else {
        document.getElementById("message5").innerText = "Inténtalo de nuevo. Algo no está en su lugar.";
        document.getElementById("message5").style.color = "red";
    }
}

// Función para pasar al nivel 2
function pasarAlNivel2() {
    // Cerrar el modal de felicitaciones
    const modalFelicitaciones = bootstrap.Modal.getInstance(document.getElementById('modalFelicitaciones'));
    modalFelicitaciones.hide();

    // Ocultar el nivel 1 y mostrar el nivel 2
    document.getElementById("nivel1").style.display = "none";
    document.getElementById("nivel2").style.display = "block";

    // Actualizar el nivel actual
    nivelActual = 2;

    // Reiniciar el temporizador
    timeLeft = 300; // Reinicia a 5 minutos (cambiado de 120 a 300)
    document.getElementById("timer2").textContent = "05:00"; // Actualiza el texto del temporizador
    startTimer();

    // Limpiar el área de drop del nivel 1
    document.getElementById("dropzone").innerHTML = "";

    // Limpiar el mensaje de resultado del nivel 1
    document.getElementById("message").innerText = "";

    // Habilitar las funcionalidades del juego
    habilitarFuncionalidades();

    // Actualizar el mensaje de la cantidad de samples
    actualizarCantidadSamples();
}

// Función para pasar al nivel 3
function pasarAlNivel3() {
    // Cerrar el modal de felicitaciones
    const modalFelicitaciones = bootstrap.Modal.getInstance(document.getElementById('modalFelicitaciones2'));
    modalFelicitaciones.hide();

    // Ocultar el nivel 2 y mostrar el nivel 3
    document.getElementById("nivel2").style.display = "none";
    document.getElementById("nivel3").style.display = "block";

    // Actualizar el nivel actual
    nivelActual = 3;

    // Reiniciar el temporizador
    timeLeft = 300; // Reinicia a 5 minutos (cambiado de 120 a 300)
    document.getElementById("timer3").textContent = "05:00"; // Actualiza el texto del temporizador
    startTimer();

    // Limpiar el área de drop del nivel 2
    document.getElementById("dropzone2").innerHTML = "";

    // Limpiar el mensaje de resultado del nivel 2
    document.getElementById("message2").innerText = "";

    // Habilitar las funcionalidades del juego
    habilitarFuncionalidades();

    // Actualizar el mensaje de la cantidad de samples
    actualizarCantidadSamples();
}

// Función para pasar al nivel 4
function pasarAlNivel4() {
    // Cerrar el modal de felicitaciones
    const modalFelicitaciones = bootstrap.Modal.getInstance(document.getElementById('modalFelicitaciones3'));
    modalFelicitaciones.hide();

    // Ocultar el nivel 3 y mostrar el nivel 4
    document.getElementById("nivel3").style.display = "none";
    document.getElementById("nivel4").style.display = "block";

    // Actualizar el nivel actual
    nivelActual = 4;

    // Reiniciar el temporizador
    timeLeft = 300; // Reinicia a 5 minutos (cambiado de 120 a 300)
    document.getElementById("timer4").textContent = "05:00"; // Actualiza el texto del temporizador
    startTimer();

    // Limpiar el área de drop del nivel 3
    document.getElementById("dropzone3").innerHTML = "";

    // Limpiar el mensaje de resultado del nivel 3
    document.getElementById("message3").innerText = "";

    // Habilitar las funcionalidades del juego
    habilitarFuncionalidades();

    // Actualizar el mensaje de la cantidad de samples
    actualizarCantidadSamples();
}

// Función para pasar al nivel 5
function pasarAlNivel5() {
    // Cerrar el modal de felicitaciones
    const modalFelicitaciones = bootstrap.Modal.getInstance(document.getElementById('modalFelicitaciones4'));
    modalFelicitaciones.hide();

    // Ocultar el nivel 4 y mostrar el nivel 5
    document.getElementById("nivel4").style.display = "none";
    document.getElementById("nivel5").style.display = "block";

    // Actualizar el nivel actual
    nivelActual = 5;

    // Reiniciar el temporizador
    timeLeft = 300; // Reinicia a 5 minutos (cambiado de 120 a 300)
    document.getElementById("timer5").textContent = "05:00"; // Actualiza el texto del temporizador
    startTimer();

    // Limpiar el área de drop del nivel 4
    document.getElementById("dropzone4").innerHTML = "";

    // Limpiar el mensaje de resultado del nivel 4
    document.getElementById("message4").innerText = "";

    // Habilitar las funcionalidades del juego
    habilitarFuncionalidades();

    // Actualizar el mensaje de la cantidad de samples
    actualizarCantidadSamples();
}

// Función para mostrar la pantalla final de felicitaciones
function mostrarPantallaFinal() {
    // Ocultar todos los niveles y mostrar la pantalla final
    document.getElementById("nivel1").style.display = "none";
    document.getElementById("nivel2").style.display = "none";
    document.getElementById("nivel3").style.display = "none";
    document.getElementById("nivel4").style.display = "none";
    document.getElementById("nivel5").style.display = "none";
    document.getElementById("pantallaFinal").style.display = "block";
}

// Función para reiniciar el juego
function reiniciarJuego() {
    // Ocultar la pantalla final y mostrar la pantalla de inicio
    document.getElementById("pantallaFinal").style.display = "none";
    document.getElementById("pantallaInicio").style.display = "block";

    // Actualizar el nivel actual
    nivelActual = 1;

    // Reiniciar el temporizador
    timeLeft = 300; // Reinicia a 5 minutos
    document.getElementById("timer").textContent = "05:00"; // Actualiza el texto del temporizador
    clearInterval(timerInterval); // Detener el temporizador si está corriendo

    // Limpiar el área de drop de todos los niveles
    document.getElementById("dropzone").innerHTML = "";
    document.getElementById("dropzone2").innerHTML = "";
    document.getElementById("dropzone3").innerHTML = "";
    document.getElementById("dropzone4").innerHTML = "";
    document.getElementById("dropzone5").innerHTML = "";

    // Limpiar el mensaje de resultado de todos los niveles
    document.getElementById("message").innerText = "";
    document.getElementById("message2").innerText = "";
    document.getElementById("message3").innerText = "";
    document.getElementById("message4").innerText = "";
    document.getElementById("message5").innerText = "";

    // Habilitar las funcionalidades del juego
    habilitarFuncionalidades();

    // Actualizar el mensaje de la cantidad de samples
    actualizarCantidadSamples();
}

// Función para actualizar el mensaje de la cantidad de samples
function actualizarCantidadSamples() {
    if (nivelActual === 1) {
        document.getElementById("cantidadSamplesNivel1").textContent = `La respuesta correcta tiene ${correctOrder.length} samples.`;
    } else if (nivelActual === 2) {
        document.getElementById("cantidadSamplesNivel2").textContent = `La respuesta correcta tiene ${correctOrder2.length} samples.`;
    } else if (nivelActual === 3) {
        document.getElementById("cantidadSamplesNivel3").textContent = `La respuesta correcta tiene ${correctOrder3.length} samples.`;
    } else if (nivelActual === 4) {
        document.getElementById("cantidadSamplesNivel4").textContent = `La respuesta correcta tiene ${correctOrder4.length} samples.`;
    } else if (nivelActual === 5) {
        document.getElementById("cantidadSamplesNivel5").textContent = `La respuesta correcta tiene ${correctOrder5.length} samples.`;
    }
}

// Hacer los samples fuera del área de drop arrastrables (Nivel 1)
document.querySelectorAll(".sample-buttons button").forEach(button => {
    button.draggable = true; // Hace que los botones sean arrastrables
    button.ondragstart = drag; // Asigna la función de arrastre
});

// Asignar eventos a los botones de samples (Nivel 1)
document.getElementById("track_16").onclick = () => playSample("track_16");
document.getElementById("track_17").onclick = () => playSample("track_17");

// Asignar eventos a los botones de samples (Nivel 2)
document.getElementById("track_1").onclick = () => playSample2("track_1");
document.getElementById("track_2").onclick = () => playSample2("track_2");
document.getElementById("track_3").onclick = () => playSample2("track_3");

// Asignar eventos a los botones de samples (Nivel 3)
document.getElementById("track_18").onclick = () => playSample3("track_18");
document.getElementById("track_19").onclick = () => playSample3("track_19");
document.getElementById("track_20").onclick = () => playSample3("track_20");
document.getElementById("track_21").onclick = () => playSample3("track_21");

// Asignar eventos a los botones de samples (Nivel 4)
document.getElementById("track_11").onclick = () => playSample4("track_11");
document.getElementById("track_12").onclick = () => playSample4("track_12");
document.getElementById("track_13").onclick = () => playSample4("track_13");
document.getElementById("track_14").onclick = () => playSample4("track_14");
document.getElementById("track_15").onclick = () => playSample4("track_15");

// Asignar eventos a los botones de samples (Nivel 5)
document.getElementById("track_4").onclick = () => playSample5("track_4");
document.getElementById("track_5").onclick = () => playSample5("track_5");
document.getElementById("track_6").onclick = () => playSample5("track_6");
document.getElementById("track_7").onclick = () => playSample5("track_7");
document.getElementById("track_8").onclick = () => playSample5("track_8");
document.getElementById("track_9").onclick = () => playSample5("track_9");
document.getElementById("track_10").onclick = () => playSample5("track_10");

// Configurar el área de drop (Nivel 1)
document.getElementById("dropzone").ondragover = allowDrop;
document.getElementById("dropzone").ondrop = drop;

// Configurar el área de drop (Nivel 2)
document.getElementById("dropzone2").ondragover = allowDrop;
document.getElementById("dropzone2").ondrop = drop2;

// Configurar el área de drop (Nivel 3)
document.getElementById("dropzone3").ondragover = allowDrop;
document.getElementById("dropzone3").ondrop = drop3;

// Configurar el área de drop (Nivel 4)
document.getElementById("dropzone4").ondragover = allowDrop;
document.getElementById("dropzone4").ondrop = drop4;

// Configurar el área de drop (Nivel 5)
document.getElementById("dropzone5").ondragover = allowDrop;
document.getElementById("dropzone5").ondrop = drop5;