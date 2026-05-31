// backend/engine.js
const { getUniform, getNormal, getExponential } = require('./rng');

function runSimulation(params) {
    const tasaLlegada = Number(params.tasaLlegada) || 48;
    const mediaLote   = Number(params.mediaLote) || 123;
    const capF1       = Number(params.capacidadFase1) || 10;
    const capF2       = Number(params.capacidadFase2) || 10;
    const capBuffer   = Number(params.capacidadBuffer) || 50;

    let state = {
        colaRecepcion: 0,
        bufferMasaNegra: 0,
        toneladasDerivadas: 0,
        materialArribado: 0,
        materialAceptado: 0,
        materialTrabajado: 0,
        horasOcupadaF1: 0,
        horasOcupadaF2: 0,
        tiempoRestanteF1: 0,
        tiempoRestanteF2: 0,
        // Acumuladores de subproductos basados en tus nuevas proporciones
        subFase1: { acero: 0, plasticos: 0, cobre: 0, masaNegra: 0, residuos: 0, agua: 0 },
        subFase2: { NiSO4: 0, CoSO4: 0, MnSO4: 0, LiOH: 0, residuos: 0, agua: 0 },
        bitacora: []
    };

    let prevEstadoF1 = 'INICIO';
    let prevEstadoF2 = 'INICIO';

    for (let h = 0; h < 720; h++) {
        let eventosEnEstaHora = []; 

        // 1. LLEGADAS
        if (h > 0 && h % tasaLlegada === 0) {
            let cantidad = getNormal(mediaLote, mediaLote * 0.10);
            state.materialArribado += cantidad;
            
            if (state.colaRecepcion + cantidad <= 1600) {
                state.colaRecepcion += cantidad;
                state.materialAceptado += cantidad;
                eventosEnEstaHora.push({ evento: "LLEGADA_ACEPTADA", cant: cantidad });
            } else {
                state.toneladasDerivadas += cantidad;
                eventosEnEstaHora.push({ evento: "LLEGADA_DERIVADA_COLA_LLENA", cant: cantidad });
            }
        }

        // 2. FASE 1: PROCESO ESTRICTO CON RINDE DEL 20%
        let estadoF1Actual = '';
        if (state.tiempoRestanteF1 > 0) {
            state.tiempoRestanteF1--;
            state.horasOcupadaF1++;
            estadoF1Actual = 'PROCESANDO';
        } else {
            if (state.colaRecepcion < capF1) {
                estadoF1Actual = 'F1_ESPERA_MATERIAL';
            } else if (state.bufferMasaNegra + (capF1 * 0.20) > capBuffer) {
                estadoF1Actual = 'F1_BLOQUEADA_BUFFER_LLENO';
            } else {
                let tiempoProceso = Math.round(getUniform(2, 6));
                state.colaRecepcion -= capF1; 
                state.materialTrabajado += capF1;
                
                let masaGenerada = capF1 * 0.20;
                state.bufferMasaNegra += masaGenerada; 
                
                // Distribución Estequiométrica Fase 1
                state.subFase1.acero += (capF1 * 0.13);
                state.subFase1.plasticos += (capF1 * 0.10);
                state.subFase1.cobre += (capF1 * 0.12);
                state.subFase1.masaNegra += masaGenerada;
                state.subFase1.residuos += (capF1 * 0.20);
                state.subFase1.agua += (capF1 * 0.25);

                state.horasOcupadaF1++; 
                state.tiempoRestanteF1 = Math.max(0, tiempoProceso - 1);
                estadoF1Actual = 'INICIA_PROCESO';
                
                eventosEnEstaHora.push({ evento: "PROCESO_FASE1", cant: capF1, extra: `Rinde: ${masaGenerada}t` });
            }
        }

        if (estadoF1Actual !== prevEstadoF1 && estadoF1Actual !== 'PROCESANDO' && estadoF1Actual !== 'INICIA_PROCESO') {
            eventosEnEstaHora.push({ evento: estadoF1Actual, cant: 0 });
        }
        prevEstadoF1 = (estadoF1Actual === 'INICIA_PROCESO') ? 'PROCESANDO' : estadoF1Actual;


        // 3. FASE 2: PROCESAMIENTO
        let estadoF2Actual = '';
        if (state.tiempoRestanteF2 > 0) {
            state.tiempoRestanteF2--;
            state.horasOcupadaF2++;
            estadoF2Actual = 'PROCESANDO';
        } else {
            if (state.bufferMasaNegra < capF2) {
                estadoF2Actual = 'F2_ESPERA_MATERIAL';
            } else {
                let tiempoF2 = Math.round(getUniform(8, 24));
                state.bufferMasaNegra -= capF2; 
                
                state.horasOcupadaF2++;
                state.tiempoRestanteF2 = Math.max(0, tiempoF2 - 1);
                
                // Distribución Estequiométrica Fase 2
                state.subFase2.NiSO4 += (capF2 * 0.25);
                state.subFase2.CoSO4 += (capF2 * 0.10);
                state.subFase2.MnSO4 += (capF2 * 0.08);
                state.subFase2.LiOH += (capF2 * 0.06);
                state.subFase2.residuos += (capF2 * 0.13);
                state.subFase2.agua += (capF2 * 0.38);
                
                estadoF2Actual = 'INICIA_PROCESO';
                eventosEnEstaHora.push({ evento: "PROCESO_FASE2", cant: capF2 });
            }
        }

        if (estadoF2Actual !== prevEstadoF2 && estadoF2Actual !== 'PROCESANDO' && estadoF2Actual !== 'INICIA_PROCESO') {
            eventosEnEstaHora.push({ evento: estadoF2Actual, cant: 0 });
        }
        prevEstadoF2 = (estadoF2Actual === 'INICIA_PROCESO') ? 'PROCESANDO' : estadoF2Actual;


        // 4. GUARDADO DE LOGS
        for (let ev of eventosEnEstaHora) {
            let labelCantidad = ev.cant === 0 ? "-" : `${ev.cant.toFixed(2)} t`;
            if (ev.extra) labelCantidad += ` (${ev.extra})`;

            state.bitacora.push({ 
                hora: h, 
                evento: ev.evento, 
                cantidad: labelCantidad,
                cola: state.colaRecepcion.toFixed(2), 
                bufferStr: `${state.bufferMasaNegra.toFixed(2)} / ${capBuffer}`,
                horasActivasF1: state.horasOcupadaF1,
                horasActivasF2: state.horasOcupadaF2
            });
        }
    }

    return {
        ...state,
        porcentajeTiempoF1: Math.min(100, (state.horasOcupadaF1 / 720) * 100),
        porcentajeTiempoF2: Math.min(100, (state.horasOcupadaF2 / 720) * 100),
        porcentajeDerivacion: state.materialArribado > 0 
            ? (state.toneladasDerivadas / state.materialArribado) * 100 
            : 0,
        subFase1: state.subFase1,
        subFase2: state.subFase2
    };
}

module.exports = { runSimulation };