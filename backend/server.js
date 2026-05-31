// backend/server.js
const express = require('express');
const cors = require('cors');
const { runSimulation } = require('./engine');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/simular', (req, res) => {
    try {
        console.log("=== INICIANDO SIMULACIÓN DE 30 DÍAS ===");
        
        // DEBUG CRÍTICO: Mira qué recibe el servidor desde el Front
        console.log("Parámetros recibidos desde el Frontend:", req.body);
        
        // Ejecución del motor
        const report = runSimulation(req.body);
        
        // Validación: Si el material arribado es 0, es que los parámetros no llegaron bien
        if (report.materialArribado === 0) {
            console.warn("ADVERTENCIA: La simulación finalizó sin llegadas de material.");
        }
        
        // Log detallado para auditoría en consola
        console.log("=== RESULTADOS DE PRODUCCIÓN ===");
        console.table({
            "Métrica": ["Material Arribado (t)", "Tiempo Ocupación F1 (%)", "Tiempo Ocupación F2 (%)", "Tasa Derivación (%)"],
            "Valor": [
                report.materialArribado.toFixed(2),
                report.porcentajeTiempoF1.toFixed(2),
                report.porcentajeTiempoF2.toFixed(2),
                report.porcentajeDerivacion.toFixed(2)
            ]
        });

        console.log("=== PRODUCCIÓN DE SUBPRODUCTOS ===");
        console.table(report.subFase2);

        // Bitácora filtrada: Mostramos solo si hubo eventos
        if (report.bitacora.length > 0) {
            console.log("=== ÚLTIMOS 5 EVENTOS (BITÁCORA) ===");
            console.table(report.bitacora.slice(-5));
        } else {
            console.log("Bitácora vacía: No ocurrieron eventos (revisar tasa llegada).");
        }

        // Enviar respuesta al frontend
        res.json(report);
        
    } catch (error) {
        console.error("Error crítico en servidor:", error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Backend activo en puerto ${PORT}`);
});