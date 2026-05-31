// src/logic/State.js
export const getInitialState = () => ({
    h: 0,
    colaRecepcion: 0,
    bufferMasaNegra: 0,
    estadoF1: "LIBRE",
    estadoF2: "LIBRE",
    horasOcupadaF1: 0,
    horasOcupadaF2: 0, // <--- ESTA ES LA CLAVE
    horasBloqueoF1: 0,
    horasEsperaF2: 0,
    toneladasDerivadas: 0,
    horaFinF1: 0,
    horaFinF2: 0,
    horaLlegada: 0
});