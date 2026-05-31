import React from 'react';

export const PrintReport = ({ state, params }) => {
    if (!state) return null;

    const fechaReporte = new Date().toLocaleDateString('es-AR', {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });

    return (
        // El contenedor principal fuerza fondo blanco y texto negro en la impresora
        <div className="hidden print:block print:bg-white print:text-black font-sans w-full max-w-4xl mx-auto p-4 text-sm">
            
            {/* ENCABEZADO FORMAL (Membrete UTN) */}
            <div className="border-b-4 border-black pb-4 mb-8 text-center flex flex-col items-center">
                <h1 className="text-3xl font-black uppercase tracking-widest mb-1">UTN - FRT</h1>
                <h2 className="text-lg font-bold uppercase tracking-wide text-gray-800">Facultad Regional Tucumán</h2>
                
                {/* Etiqueta invertida para el título */}
                <h3 className="text-lg font-bold mt-4 px-6 py-2 uppercase tracking-wider border-2 border-black bg-black text-white" 
                    style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
                    Auditoría de Simulación - Planta ABTC Nevada
                </h3>
                
                <p className="text-xs text-gray-500 mt-3 font-mono">
                    Fecha de Emisión: {fechaReporte} | Ciclo de Operación: 30 Días (720 Hs)
                </p>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
                {/* TABLA 1: PARÁMETROS */}
                <div>
                    <h4 className="font-bold uppercase border-b-2 border-black mb-3 pb-1">1. Parámetros del Motor Estocástico</h4>
                    <table className="w-full text-sm text-left border-collapse">
                        <tbody>
                            <tr className="border-b border-gray-300"><th className="py-1.5 font-semibold">Tasa de Llegada</th><td className="py-1.5 text-right">{params.tasaLlegada} hs</td></tr>
                            <tr className="border-b border-gray-300"><th className="py-1.5 font-semibold">Media de Lote</th><td className="py-1.5 text-right">{params.mediaLote} t (±10%)</td></tr>
                            <tr className="border-b border-gray-300"><th className="py-1.5 font-semibold">Capacidad Fase 1</th><td className="py-1.5 text-right">{params.capacidadFase1} t/ciclo</td></tr>
                            <tr className="border-b border-gray-300"><th className="py-1.5 font-semibold">Capacidad Fase 2</th><td className="py-1.5 text-right">{params.capacidadFase2} t/batch</td></tr>
                            <tr><th className="py-1.5 font-semibold">Límite Buffer</th><td className="py-1.5 text-right">{params.capacidadBuffer} t</td></tr>
                        </tbody>
                    </table>
                </div>

                {/* TABLA 2: BALANCE GLOBAL */}
                <div>
                    <h4 className="font-bold uppercase border-b-2 border-black mb-3 pb-1">2. Balance Global de Materia</h4>
                    <table className="w-full text-sm text-left border-collapse">
                        <tbody>
                            <tr className="border-b border-gray-300"><th className="py-1.5 font-semibold">Total Arribado</th><td className="py-1.5 text-right font-mono">{state.materialArribado?.toFixed(2)} t</td></tr>
                            <tr className="border-b border-gray-300"><th className="py-1.5 font-semibold">Total Procesado (F1)</th><td className="py-1.5 text-right font-mono">{state.materialTrabajado?.toFixed(2)} t</td></tr>
                            <tr className="border-b border-gray-300 text-red-700" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}><th className="py-1.5 font-bold">Mat. Derivado (Pérdida)</th><td className="py-1.5 text-right font-mono font-bold">{state.toneladasDerivadas?.toFixed(2)} t</td></tr>
                            <tr className="border-b border-gray-300"><th className="py-1.5 font-semibold">Ocupación Fase 1</th><td className="py-1.5 text-right font-bold">{state.porcentajeTiempoF1?.toFixed(2)}%</td></tr>
                            <tr><th className="py-1.5 font-semibold">Ocupación Fase 2</th><td className="py-1.5 text-right font-bold">{state.porcentajeTiempoF2?.toFixed(2)}%</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* TABLAS 3: SUBPRODUCTOS ESTEQUIOMÉTRICOS */}
            <h4 className="font-bold uppercase border-b-2 border-black mb-4 pb-1">3. Distribución Estequiométrica (Subproductos)</h4>
            <div className="grid grid-cols-2 gap-8 mb-16">
                
                {/* Tabla Fase 1 */}
                <table className="w-full text-sm text-left border-collapse border border-gray-400">
                    <thead>
                        <tr className="bg-gray-200" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
                            <th className="py-2 px-3 border border-gray-400 font-bold uppercase text-xs">Fase 1 (Separación)</th>
                            <th className="py-2 px-3 border border-gray-400 font-bold uppercase text-xs text-right">Toneladas</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td className="py-1.5 px-3 border border-gray-400">Acero (Carcasa)</td><td className="py-1.5 px-3 border border-gray-400 text-right font-mono">{state.subFase1?.acero?.toFixed(2)}</td></tr>
                        <tr className="bg-gray-100 font-bold" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}><td className="py-1.5 px-3 border border-gray-400">Masa Negra (a Buffer)</td><td className="py-1.5 px-3 border border-gray-400 text-right font-mono">{state.subFase1?.masaNegra?.toFixed(2)}</td></tr>
                        <tr><td className="py-1.5 px-3 border border-gray-400">Cobre / Aluminio</td><td className="py-1.5 px-3 border border-gray-400 text-right font-mono">{state.subFase1?.cobre?.toFixed(2)}</td></tr>
                        <tr><td className="py-1.5 px-3 border border-gray-400">Agua Purificada</td><td className="py-1.5 px-3 border border-gray-400 text-right font-mono">{state.subFase1?.agua?.toFixed(2)}</td></tr>
                        <tr><td className="py-1.5 px-3 border border-gray-400">Plásticos / Polímeros</td><td className="py-1.5 px-3 border border-gray-400 text-right font-mono">{state.subFase1?.plasticos?.toFixed(2)}</td></tr>
                        <tr><td className="py-1.5 px-3 border border-gray-400">Residuos (No Recuperables)</td><td className="py-1.5 px-3 border border-gray-400 text-right font-mono">{state.subFase1?.residuos?.toFixed(2)}</td></tr>
                    </tbody>
                </table>

                {/* Tabla Fase 2 */}
                <table className="w-full text-sm text-left border-collapse border border-gray-400">
                    <thead>
                        <tr className="bg-gray-200" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
                            <th className="py-2 px-3 border border-gray-400 font-bold uppercase text-xs">Fase 2 (Grado Batería)</th>
                            <th className="py-2 px-3 border border-gray-400 font-bold uppercase text-xs text-right">Toneladas</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td className="py-1.5 px-3 border border-gray-400">Sulfato Níquel (NiSO₄)</td><td className="py-1.5 px-3 border border-gray-400 text-right font-mono">{state.subFase2?.NiSO4?.toFixed(2)}</td></tr>
                        <tr><td className="py-1.5 px-3 border border-gray-400">Sulfato Cobalto (CoSO₄)</td><td className="py-1.5 px-3 border border-gray-400 text-right font-mono">{state.subFase2?.CoSO4?.toFixed(2)}</td></tr>
                        <tr><td className="py-1.5 px-3 border border-gray-400">Sulfato Manganeso (MnSO₄)</td><td className="py-1.5 px-3 border border-gray-400 text-right font-mono">{state.subFase2?.MnSO4?.toFixed(2)}</td></tr>
                        <tr><td className="py-1.5 px-3 border border-gray-400">Hidróxido Litio (LiOH)</td><td className="py-1.5 px-3 border border-gray-400 text-right font-mono">{state.subFase2?.LiOH?.toFixed(2)}</td></tr>
                        <tr><td className="py-1.5 px-3 border border-gray-400">Agua Recuperada</td><td className="py-1.5 px-3 border border-gray-400 text-right font-mono">{state.subFase2?.agua?.toFixed(2)}</td></tr>
                        <tr><td className="py-1.5 px-3 border border-gray-400">Sólidos Residuales</td><td className="py-1.5 px-3 border border-gray-400 text-right font-mono">{state.subFase2?.residuos?.toFixed(2)}</td></tr>
                    </tbody>
                </table>
            </div>

         {/* ZONA DE FIRMAS */}
            <div className="mt-32 w-full flex justify-between px-12 text-center pb-8">
                <div className="w-64 flex flex-col items-center">
                    {/* Línea horizontal nativa a prueba de fallos de impresión */}
                    <hr className="w-full border-black border-t-2 mb-2" />
                    <p className="font-bold uppercase text-xs tracking-wider">Firma Ing. Responsable</p>
                    <p className="text-[10px] text-gray-500 mt-1">Aclaración / Matrícula:</p>
                </div>
                <div className="w-64 flex flex-col items-center">
                    <hr className="w-full border-black border-t-2 mb-2" />
                    <p className="font-bold uppercase text-xs tracking-wider">Aprobación Auditoría (Junta)</p>
                    <p className="text-[10px] text-gray-500 mt-1">Sello / Fecha:</p>
                </div>
            </div>

        </div>
    );
};