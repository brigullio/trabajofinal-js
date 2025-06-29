
// esperar que el Dom este cargado
document.addEventListener("DOMContentLoaded", () => {

const form = document.getElementById("formPresupuesto");
const nombreInput = document.getElementById("nombre");
const apellidosInput = document.getElementById("apellidos");
const emailInput = document.getElementById("email");
const productoSelect = document.getElementById("producto");
const plazoInput = document.getElementById("plazo");
const extrasCheckboxes = document.querySelectorAll('input[name="extras"]');
const aceptarCondiciones = document.getElementById("aceptarCondiciones");
const presupuestoFinalP = document.getElementById("presupuestoFinal");
const submitBtn = form.querySelector('button[type="submit"]');


// function para validar textos

  function validarTexto(texto, maxLength) {
      const caracteres = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/; // solo letras y espacios
      return (
        caracteres.test(texto) &&        // solo letras
        texto.length > 0 &&              // no está vacío
        texto.length <= maxLength        // no se pasa del máximo permitido
      );
    }

    // function para validar email
    function validarEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // debe ser algo@algo.algo
      return regex.test(email);
    }

    // revisar que todo el form es valido
    function formularioValido() {
      return (
        validarTexto(nombreInput.value, 15) &&          // Validar nombre
        validarTexto(apellidosInput.value, 40) &&       // Validar apellidos
        validarEmail(emailInput.value) &&               // Validar email
        productoSelect.value !== "" &&                  // Producto seleccionado
        plazoInput.value > 0 &&                         // Plazo mayor a 0
        aceptarCondiciones.checked                      // Condiciones aceptadas
      );
    }

    // para calcular presupuesto
    function calcularPresupuesto() {
      // Si aún no se eligió un producto o no se puso plazo, no calculamos
      if (productoSelect.value === "" || plazoInput.value <= 0) {
        presupuestoFinalP.textContent = "Presupuesto final: €0";
        return; // Salimos de la función si falta info
      }

      // Tomamos el producto elegido y su precio desde el atributo data-precio
      const productoSeleccionado = productoSelect.selectedOptions[0];
      const precioBase = Number(productoSeleccionado.dataset.precio) || 0;

      // Sumamos los extras marcados
      let extrasTotal = 0;
      extrasCheckboxes.forEach(chk => {
        if (chk.checked) {
          extrasTotal += Number(chk.dataset.precio) || 0;
        }
      });

      // Calculamos el total sumando producto + extras
      let total = precioBase + extrasTotal;

      // Aplicamos descuento si el plazo es largo
      const plazo = Number(plazoInput.value);
      if (plazo > 12) {
        total *= 0.8; // 20% de descuento
      } else if (plazo > 6) {
        total *= 0.9; // 10% de descuento
      }

      // se muestra el resultado con 2 decimales
      presupuestoFinalP.textContent = "Presupuesto final: €" + total.toFixed(2);
    }

    // activamos o desactivamos el boton sumbit segun si el form es valido o no
    function actualizarEstadoBoton() {
      submitBtn.disabled = !formularioValido(); 
    }

    // se leen/escuchan los cambios en los campos de texto, producto, plazo y checkbox de condiciones
    [nombreInput, apellidosInput, emailInput, productoSelect, plazoInput, aceptarCondiciones].forEach(selec => {
      selec.addEventListener("input", () => {
        actualizarEstadoBoton();   // Validar formulario
        calcularPresupuesto();     // Calcular el total si algo cambia
      });
    });

    // checkboxes de extras por separado (porque usan "change", no "input")
    extrasCheckboxes.forEach(chk => {
      chk.addEventListener("change", calcularPresupuesto);
    });

    // Inicializamos los valores al cargar la página
    actualizarEstadoBoton();
    calcularPresupuesto();

    // Cuando el usuario intenta enviar el formulario
    form.addEventListener("submit", sumbit => {
      sumbit.preventDefault(); // evita que se envíe directamente

      // Si hay errores, mostramos un aviso y no hacemos nada
      if (!formularioValido()) {
        alert("Por favor, completa todos los campos correctamente y acepta las condiciones.");
        return;
      } else{
      // Si todo está bien, mostramos un mensaje de confirmación
      alert("Formulario enviado correctamente. Te contactaremos en breves. \nGracias por tu presupuesto.");

      // Limpiamos todos los campos
      form.reset();

      // Actualizamos el presupuesto y el estado del botón
      actualizarEstadoBoton();
      calcularPresupuesto();
      }

    });


});
