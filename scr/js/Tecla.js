//LOGICA TECLADO Y TECLAS

let audioCtx = null;

class Tecla {
    // Declaración frecuencia de cada nota en 4 octava
    DO = 261.63;
    DO_SOSTENIDO=277.18;
    RE = 293.66;
    RE_SOSTENIDO=311.13;
    MI = 329.63;
    FA = 349.23;
    FA_SOSTENIDO=369.99;
    SOL = 392.00;
    SOL_SOSTENIDO=415.30;
    LA = 440.00;
    LA_SOSTENIDO=466.16;
    SI = 493.88;
    //Constructor de la tecla
    constructor(boton, nota) {
        this.boton = boton;
        this.volumen=1;
        switch (nota) {
            case "DO":
                this.frecuencia = this.DO;
                this.nota = NOTAS.DO;
                break;
            case "DO♯":
                this.frecuencia = this.DO_SOSTENIDO;
                this.nota = NOTAS.DO_SOSTENIDO;
                break;
            case "RE":
                this.frecuencia = this.RE;
                this.nota = NOTAS.RE;
                break;
            case "RE♯":
                this.frecuencia = this.RE_SOSTENIDO;
                this.nota = NOTAS.RE_SOSTENIDO;
                break;
            case "MI":
                this.frecuencia = this.MI;
                this.nota = NOTAS.MI;
                break;
            case "FA":
                this.frecuencia = this.FA;
                this.nota = NOTAS.FA;
                break;
            case "FA♯":
                this.frecuencia = this.FA_SOSTENIDO;
                this.nota = NOTAS.FA_SOSTENIDO;
                break;
            case "SOL":
                this.frecuencia = this.SOL;
                this.nota = NOTAS.SOL;
                break;
            case "SOL♯":
                this.frecuencia = this.SOL_SOSTENIDO;
                this.nota = NOTAS.SOL_SOSTENIDO;
                break;
            case "LA":
                this.frecuencia = this.LA;
                this.nota = NOTAS.LA;
                break;
            case "LA♯":
                this.frecuencia = this.LA_SOSTENIDO;
                this.nota = NOTAS.LA_SOSTENIDO;
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
        // Si el contexto se quedó en pausa por restricciones del navegador, lo reactiva
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const nodoVolumen = audioCtx.createGain();
        const ahora = audioCtx.currentTime;
        
        nodoVolumen.gain.setValueAtTime(0, ahora);
        nodoVolumen.gain.linearRampToValueAtTime(0.5*this.volumen, ahora + 0.01);
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
            case NOTAS.DO_SOSTENIDO:
                this.frecuencia = this.DO_SOSTENIDO;
                break;
            case NOTAS.RE:
                this.frecuencia = this.RE;
                break;
            case NOTAS.RE_SOSTENIDO:
                this.frecuencia = this.RE_SOSTENIDO;
                break;
            case NOTAS.MI:
                this.frecuencia = this.MI;
                break;
            case NOTAS.FA:
                this.frecuencia = this.FA;
                break;
            case NOTAS.FA_SOSTENIDO:
                this.frecuencia = this.FA_SOSTENIDO;
                break;
            case NOTAS.SOL:
                this.frecuencia = this.SOL;
                break;
            case NOTAS.SOL_SOSTENIDO:
                this.frecuencia = this.SOL_SOSTENIDO;
                break;
            case NOTAS.LA:
                this.frecuencia = this.LA;
                break;
            case NOTAS.LA_SOSTENIDO:
                this.frecuencia = this.LA_SOSTENIDO;
                break;
            case NOTAS.SI:
                this.frecuencia = this.SI;
                break;
        }
        this.frecuencia = this.frecuencia * Modificador;
    }
    establecerVolumen(valor){
        this.volumen=valor/100;
    }
}

class Teclado {
    ListaTeclas = [];
    constructor(teclas) {
        this.ListaTeclas = teclas;
        this.octava=4;
    }
    cambiarOctava(octava) {
        let modificador = 2 ** (octava - 4);
        for (let i = 0; i < this.ListaTeclas.length; i++) {
            this.ListaTeclas[i].establecerFrecuencia(modificador);
        }
    }
    establecerVolumen(num){
        for (let i=0;i<this.ListaTeclas.length;i++){
            this.ListaTeclas[i].establecerVolumen(num);
        }
    }
}

const NOTAS = Object.freeze({
    DO: "DO",
    DO_SOSTENIDO:"DO♯",
    RE: "RE",
    RE_SOSTENIDO:"RE♯",
    MI: "MI",
    FA: "FA",
    FA_SOSTENIDO:"FA♯",
    SOL: "SOL",
    SOL_SOSTENIDO:"SOL♯",
    LA: "LA",
    LA_SOSTENIDO:"LA♯",
    SI: "SI"
});

let teclas = []; 
let miTeclado;

window.addEventListener("DOMContentLoaded", () => {
    //Inicializacion sistema de audio
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    audioCtx.resume();
    //Obtencion teclas
    teclas[0] = new Tecla(document.getElementById("DO"), "DO");
    teclas[1] = new Tecla(document.getElementById("DO♯"), "DO♯"); 
    teclas[2] = new Tecla(document.getElementById("RE"), "RE");
    teclas[3] = new Tecla(document.getElementById("RE♯"), "RE♯");   
    teclas[4] = new Tecla(document.getElementById("MI"), "MI");
    teclas[5] = new Tecla(document.getElementById("FA"), "FA");
    teclas[6] = new Tecla(document.getElementById("FA♯"), "FA♯");   
    teclas[7] = new Tecla(document.getElementById("SOL"), "SOL");
    teclas[8] = new Tecla(document.getElementById("SOL♯"), "SOL♯"); 
    teclas[9] = new Tecla(document.getElementById("LA"), "LA");
    teclas[10] = new Tecla(document.getElementById("LA♯"), "LA♯"); 
    teclas[11] = new Tecla(document.getElementById("SI"), "SI");
    //Incializar teclado
    miTeclado = new Teclado(teclas);
    //Hacer global teclado
    window.miTeclado = miTeclado;
});

const teclasPresionadas = {};

document.addEventListener("keydown", (evento) => {
    if (teclas.length === 0) return; 
    
    if (evento.ctrlKey && ["1","2","3","4","5","6","7","8","9","0"].includes(evento.key)) {
        evento.preventDefault();
    }

    const teclaIdentificador = (evento.ctrlKey ? "ctrl-" : "") + evento.key;

    // 1. IMPORTANTE: Si la tecla ya está manteniéndose pulsada, ignoramos el evento
    if (evento.repeat || teclasPresionadas[evento.key]) return;

    let indice = -1;
    if (evento.ctrlKey) {
        if (evento.key === "1") indice = 1;  
        if (evento.key === "2") indice = 3;  
        if (evento.key === "3") indice = 6;  
        if (evento.key === "4") indice = 8;  
        if (evento.key === "5") indice = 10; 
    }
    else{
        if (evento.key === "1") indice = 0;
        if (evento.key === "2") indice = 2;
        if (evento.key === "3") indice = 4;
        if (evento.key === "4") indice = 5;
        if (evento.key === "5") indice = 7;
        if (evento.key === "6") indice = 9;
        if (evento.key === "7") indice = 11;
    }
    if (indice !== -1) {
        // Marcamos la tecla como presionada
        teclasPresionadas[teclaIdentificador] = true;
        
        const botonHTML = teclas[indice].boton;
        
        // Añadimos la clase que activa tu animación CSS
        botonHTML.classList.add("activo");
        
        // Ejecutamos el clic para que suene
        botonHTML.click();
    }
});
document.addEventListener("keyup", (evento) => {
    let indice = -1;

    let eraNegra = teclasPresionadas["ctrl-" + evento.key];
    const teclaIdentificador = (eraNegra ? "ctrl-" : "") + evento.key;
    
    if(eraNegra){
        if (evento.key === "1") indice = 1;
        if (evento.key === "2") indice = 3;
        if (evento.key === "3") indice = 6;
        if (evento.key === "4") indice = 8;
        if (evento.key === "5") indice = 10;
    }
    else{
        if (evento.key === "1") indice = 0;
        if (evento.key === "2") indice = 2;
        if (evento.key === "3") indice = 4;
        if (evento.key === "4") indice = 5;
        if (evento.key === "5") indice = 7;
        if (evento.key === "6") indice = 9;
        if (evento.key === "7") indice = 11;
    }

    if (indice !== -1) {
        // Liberamos el estado de la tecla
        teclasPresionadas[teclaIdentificador] = false;
        
        // Quitamos la clase de animación inmediatamente
        teclas[indice].boton.classList.remove("activo");
    }
});