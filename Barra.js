//Obtencion de la barra en el sistema
const deslizanteVolumen = document.getElementById('volumen');
const textoValor = document.getElementById('valor-volumen');

deslizanteVolumen.addEventListener('input', (evento) => {
  const valorActual = evento.target.value;
  textoValor.textContent = valorActual + '%';
  if (window.miTeclado && typeof window.miTeclado.establecerVolumen === 'function'){
    window.miTeclado.establecerVolumen(valorActual);
  }
});