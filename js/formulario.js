(function () {
    'use strict';

    var forms = document.querySelectorAll('.needs-validation');

    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            console.log("Intentando enviar formulario...");

            if (!form.checkValidity()) {
                console.log("Formulario no válido");
                event.preventDefault();
                event.stopPropagation();
            } else {
                console.log("Formulario válido, mostrando mensaje de éxito...");
                event.preventDefault(); // Evita el envío real

                mostrarMensajeExito();

                setTimeout(() => {
                    form.reset();
                    form.classList.remove("was-validated");
                    limpiarValidacion();
                }, 2000);
            }

            form.classList.add('was-validated');
        }, false);
    });

    // Función para mostrar mensaje de éxito
    function mostrarMensajeExito() {
        let mensajeExito = document.createElement("div");
        mensajeExito.classList.add("alert", "alert-success", "mt-3");
        mensajeExito.textContent = "✅ ¡Mensaje enviado con éxito!";
        
        let formulario = document.querySelector(".needs-validation");
        formulario.parentNode.insertBefore(mensajeExito, formulario.nextSibling);

        setTimeout(() => {
            mensajeExito.remove();
        }, 3000);
    }

    // Validación en tiempo real
    document.querySelectorAll(".form-control, .form-check-input").forEach(input => {
        input.addEventListener("input", () => {
            input.classList.remove("is-invalid");
            input.classList.remove("is-valid");

            if (input.checkValidity()) {
                input.classList.add("is-valid");
            } else {
                input.classList.add("is-invalid");
            }
        });
    });

})();
