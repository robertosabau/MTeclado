//LOGICA BARRA SUPERIOR

//Obtencion de la barra en el sistema
const deslizanteVolumen = document.getElementById('volumen');
const textoValor = document.getElementById('valor-volumen');

//Configuración acciones al modificar la barra del volumen
deslizanteVolumen.addEventListener('input', (evento) => {
  const valorActual = evento.target.value;
  textoValor.textContent = valorActual + '%';
  if (window.miTeclado && typeof window.miTeclado.establecerVolumen === 'function'){
    window.miTeclado.establecerVolumen(valorActual);
  }
});

//Obtencion de la tabla con las opciones de octavas
const opcionesOctava = document.querySelectorAll('input[name="octava"]');

//Configuracion acciones al seleccionar una de las opciones
opcionesOctava.forEach((radio)=>{
    radio.addEventListener('change',(evento)=>{
        //Hacer que la logica solo se aplique cuando se pulsa una opcion
        if (evento.target.checked) {
            //Creacion lista para traducir el ID de HTML a algo que sirve para la logica
            const Traductor={
                'primeraoctava': 1,
                'segundaoctava': 2,
                'terceraoctava': 3,
                'cuartaoctava': 4,
                'quintaoctava': 5,
                'sextaoctava': 6,
                'septimaoctava': 7,
                'octavaoctava': 8
            };
            //Obtener de forma numerica la optaba
            const numeroOctava = Traductor[evento.target.id];
            //Linea para evitar errores por no inicalizacion
            if (window.miTeclado && typeof window.miTeclado.cambiarOctava === 'function') {
                window.miTeclado.cambiarOctava(numeroOctava);
            }
        }
    });
});