class Tecla {
    // Declaración frecuencia de cada nota en 4 octava
    DO = 261.63;
    RE = 293.66;
    MI = 329.63;
    FA = 349.23;
    SOL = 392.00;
    LA = 440.00;
    SI = 493.88;

    constructor(boton, nota) {
        this.boton = boton;
        switch (nota) {
            case "DO":
                this.frecuencia = this.DO;
                this.nota = NOTAS.DO;
                break;
            case "RE":
                this.frecuencia = this.RE;
                this.nota = NOTAS.RE;
                break;
            case "MI":
                this.frecuencia = this.MI;
                this.nota = NOTAS.MI;
                break;
            case "FA":
                this.frecuencia = this.FA;
                this.nota = NOTAS.FA;
                break;
            case "SOL":
                this.frecuencia = this.SOL;
                this.nota = NOTAS.SOL;
                break;
            case "LA":
                this.frecuencia = this.LA;
                this.nota = NOTAS.LA;
                break;
            case "SI":
                this.frecuencia = this.SI;
                this.nota = NOTAS.SI;
                break;
        }
        this.boton.addEventListener("click", () => {
            this.reproducirAudio();
        });
    }

    reproducirAudio() {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const nodoVolumen = audioCtx.createGain();
        const ahora = audioCtx.currentTime;
        nodoVolumen.gain.setValueAtTime(0, ahora);
        nodoVolumen.gain.linearRampToValueAtTime(0.5, ahora + 0.01);
        nodoVolumen.gain.exponentialRampToValueAtTime(0.0001, ahora + 1.2);
        nodoVolumen.connect(audioCtx.destination);
        const armonicos = [
            { multiplicador: 1, tipo: 'triangle', volumen: 0.6 }, 
            { multiplicador: 2, tipo: 'sine',     volumen: 0.3 }, 
            { multiplicador: 3, tipo: 'sine',     volumen: 0.1 }  
        ];
        armonicos.forEach(armonico => {
            const oscilador = audioCtx.createOscillator();
            const gananciaArmonico = audioCtx.createGain();
            oscilador.type = armonico.tipo;
            oscilador.frequency.setValueAtTime(this.frecuencia * armonico.multiplicador, ahora);
            gananciaArmonico.gain.setValueAtTime(armonico.volumen, ahora);
            oscilador.connect(gananciaArmonico);
            gananciaArmonico.connect(nodoVolumen);
            oscilador.start(ahora);
            oscilador.stop(ahora + 1.2);
        });
    }

    establecerFrecuencia(Modificador) {
        // CORREGIDO: Se cambia 'nota' por 'this.nota'
        switch (this.nota) { 
            case NOTAS.DO:
                this.frecuencia = this.DO;
                break;
            case NOTAS.RE:
                this.frecuencia = this.RE;
                break;
            case NOTAS.MI:
                this.frecuencia = this.MI;
                break;
            case NOTAS.FA:
                this.frecuencia = this.FA;
                break;
            case NOTAS.SOL:
                this.frecuencia = this.SOL;
                break;
            case NOTAS.LA:
                this.frecuencia = this.LA;
                break;
            case NOTAS.SI:
                this.frecuencia = this.SI;
                break;
        }
        this.frecuencia = this.frecuencia * Modificador;
    }
}

class Teclado {
    ListaTeclas = [];
    constructor(teclas) {
        this.ListaTeclas = teclas;
    }
    cambiarOctava(octava) {
        let modificador = 2 ** (octava - 4);
        for (let i = 0; i < this.ListaTeclas.length; i++) {
            this.ListaTeclas[i].establecerFrecuencia(modificador);
        }
    }
}

const NOTAS = Object.freeze({
    DO: "DO",
    RE: "RE",
    MI: "MI",
    FA: "FA",
    SOL: "SOL",
    LA: "LA",
    SI: "SI"
});

let teclas = []; 
let miTeclado;

window.addEventListener("DOMContentLoaded", () => {
    teclas[0] = new Tecla(document.getElementById("DO"), "DO");
    teclas[1] = new Tecla(document.getElementById("RE"), "RE");
    teclas[2] = new Tecla(document.getElementById("MI"), "MI");
    teclas[3] = new Tecla(document.getElementById("FA"), "FA");
    teclas[4] = new Tecla(document.getElementById("SOL"), "SOL");
    teclas[5] = new Tecla(document.getElementById("LA"), "LA");
    teclas[6] = new Tecla(document.getElementById("SI"), "SI");

    miTeclado = new Teclado(teclas);
});

const teclasPresionadas = {};

document.addEventListener("keydown", (evento) => {
    if (teclas.length === 0) return; 
    
    // 1. IMPORTANTE: Si la tecla ya está manteniéndose pulsada, ignoramos el evento
    if (evento.repeat || teclasPresionadas[evento.key]) return;

    let indice = -1;
    if (evento.key === "1") indice = 0;
    if (evento.key === "2") indice = 1;
    if (evento.key === "3") indice = 2;
    if (evento.key === "4") indice = 3;
    if (evento.key === "5") indice = 4;
    if (evento.key === "6") indice = 5;
    if (evento.key === "7") indice = 6;

    if (indice !== -1) {
        // Marcamos la tecla como presionada
        teclasPresionadas[evento.key] = true;
        
        const botonHTML = teclas[indice].boton;
        
        // Añadimos la clase que activa tu animación CSS
        botonHTML.classList.add("activo");
        
        // Ejecutamos el clic para que suene
        botonHTML.click();
    }
});
document.addEventListener("keyup", (evento) => {
    let indice = -1;
    if (evento.key === "1") indice = 0;
    if (evento.key === "2") indice = 1;
    if (evento.key === "3") indice = 2;
    if (evento.key === "4") indice = 3;
    if (evento.key === "5") indice = 4;
    if (evento.key === "6") indice = 5;
    if (evento.key === "7") indice = 6;

    if (indice !== -1) {
        // Liberamos el estado de la tecla
        teclasPresionadas[evento.key] = false;
        
        // Quitamos la clase de animación inmediatamente
        teclas[indice].boton.classList.remove("activo");
    }
});