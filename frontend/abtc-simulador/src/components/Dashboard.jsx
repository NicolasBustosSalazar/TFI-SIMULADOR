import React from 'react';

export const Dashboard = ({ state }) => {
    if (!state) return null;

    return (
        <div className="flex flex-col h-full gap-4">
            
            {/* CUADROS SUPERIORES: Indicadores de Ocupación */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-900 border border-slate-700 p-4 rounded-xl shadow-lg flex flex-col justify-center">
                    <h3 className="text-slate-400 text-xs font-bold uppercase mb-1">Ocupación F1</h3>
                    <p className="text-3xl font-black text-blue-400">
                        {state.porcentajeTiempoF1?.toFixed(1)}%
                    </p>
                </div>
                <div className="bg-slate-900 border border-slate-700 p-4 rounded-xl shadow-lg flex flex-col justify-center">
                    <h3 className="text-slate-400 text-xs font-bold uppercase mb-1">Ocupación F2</h3>
                    <p className="text-3xl font-black text-blue-400">
                        {state.porcentajeTiempoF2?.toFixed(1)}%
                    </p>
                </div>
            </div>

            {/* NUEVO: BALANCE DE MATERIA (ENTRADAS) */}
            <div className="bg-slate-900 border border-slate-700 p-4 rounded-xl shadow-lg">
                <h3 className="text-purple-400 font-bold text-xs uppercase mb-3 border-b border-slate-700 pb-2">
                    Balance Global de Recepción
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                    <div className="bg-slate-800/50 p-2 rounded-lg border border-slate-700/50">
                        <p className="text-slate-400 text-[10px] font-bold uppercase mb-1">Total Arribado</p>
                        <p className="text-lg font-black text-white">{state.materialArribado?.toFixed(1)} t</p>
                    </div>
                    <div className="bg-slate-800/50 p-2 rounded-lg border border-slate-700/50">
                        <p className="text-slate-400 text-[10px] font-bold uppercase mb-1">Total Aceptado</p>
                        <p className="text-lg font-black text-emerald-400">{state.materialAceptado?.toFixed(1)} t</p>
                    </div>
                    <div className="bg-slate-800/50 p-2 rounded-lg border border-slate-700/50">
                        <p className="text-slate-400 text-[10px] font-bold uppercase mb-1">Procesado F1</p>
                        <p className="text-lg font-black text-blue-400">{state.materialTrabajado?.toFixed(1)} t</p>
                    </div>
                </div>
            </div>

            {/* TABLA DE PRODUCCIÓN FASE 1 */}
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-lg">
                <h3 className="text-emerald-400 font-bold text-xs uppercase mb-3 border-b border-slate-700 pb-2">
                    Producción Fase 1 (Separación Física)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-300">
                    <div className="flex justify-between items-center bg-slate-800/50 p-2 rounded">
                        <span>Acero (Carcasa):</span> 
                        <span className="font-bold text-white whitespace-nowrap">{state.subFase1?.acero?.toFixed(1) || 0} t</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-800/50 p-2 rounded">
                        <span>Masa Negra (A Buffer):</span> 
                        <span className="font-bold text-yellow-400 whitespace-nowrap">{state.subFase1?.masaNegra?.toFixed(1) || 0} t</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-800/50 p-2 rounded">
                        <span>Cobre / Aluminio:</span> 
                        <span className="font-bold text-white whitespace-nowrap">{state.subFase1?.cobre?.toFixed(1) || 0} t</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-800/50 p-2 rounded">
                        <span>Agua Purificada:</span> 
                        <span className="font-bold text-blue-400 whitespace-nowrap">{state.subFase1?.agua?.toFixed(1) || 0} t</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-800/50 p-2 rounded">
                        <span>Plásticos/Polímeros:</span> 
                        <span className="font-bold text-white whitespace-nowrap">{state.subFase1?.plasticos?.toFixed(1) || 0} t</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-800/50 p-2 rounded border-l-2 border-red-500/50">
                        <span>Residuos (No Recup):</span> 
                        <span className="font-bold text-red-400 whitespace-nowrap">{state.subFase1?.residuos?.toFixed(1) || 0} t</span>
                    </div>
                </div>
            </div>

            {/* TABLA DE PRODUCCIÓN FASE 2 */}
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-lg">
                <h3 className="text-blue-400 font-bold text-xs uppercase mb-3 border-b border-slate-700 pb-2">
                    Compuestos Grado Batería (Fase 2)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-300">
                    <div className="flex justify-between items-center bg-slate-800/50 p-2 rounded">
                        <span>Sulfato Níquel (NiSO₄):</span> 
                        <span className="font-bold text-white whitespace-nowrap">{state.subFase2?.NiSO4?.toFixed(1) || 0} t</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-800/50 p-2 rounded">
                        <span>Sulfato Cobalto (CoSO₄):</span> 
                        <span className="font-bold text-white whitespace-nowrap">{state.subFase2?.CoSO4?.toFixed(1) || 0} t</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-800/50 p-2 rounded">
                        <span>Sulfato Manganeso (MnSO₄):</span> 
                        <span className="font-bold text-white whitespace-nowrap">{state.subFase2?.MnSO4?.toFixed(1) || 0} t</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-800/50 p-2 rounded">
                        <span>Hidróxido Litio (LiOH):</span> 
                        <span className="font-bold text-white whitespace-nowrap">{state.subFase2?.LiOH?.toFixed(1) || 0} t</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-800/50 p-2 rounded">
                        <span>Agua Recuperada:</span> 
                        <span className="font-bold text-blue-400 whitespace-nowrap">{state.subFase2?.agua?.toFixed(1) || 0} t</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-800/50 p-2 rounded border-l-2 border-red-500/50">
                        <span>Sólidos Residuales:</span> 
                        <span className="font-bold text-red-400 whitespace-nowrap">{state.subFase2?.residuos?.toFixed(1) || 0} t</span>
                    </div>
                </div>
            </div>

            {/* ALERTA DE DERIVACIÓN */}
            <div className="mt-auto bg-red-950/20 border border-red-900/50 p-4 rounded-xl flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between items-center text-center sm:text-left">
                <span className="text-red-500 font-bold uppercase text-xs">Pérdida por Estrangulamiento</span>
                <span className="text-red-400 font-black text-lg">
                    Tasa Derivación: {state.porcentajeDerivacion?.toFixed(2)}%
                </span>
            </div>
            
        </div>
    );
};