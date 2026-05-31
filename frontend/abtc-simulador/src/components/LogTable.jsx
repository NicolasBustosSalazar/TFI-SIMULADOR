import React from 'react';

export const LogTable = ({ bitacora }) => {
    if (!bitacora || bitacora.length === 0) return null;

    const ultimosEventos = [...bitacora].reverse().slice(0, 30);

    // Función para renderizar un Badge con color dinámico según la criticidad
    const getBadgeStyle = (evento) => {
        if (evento.includes("DERIVADA") || evento.includes("BLOQUEADA")) {
            return "bg-red-500/20 text-red-400 border-red-500/50";
        }
        if (evento.includes("ESPERA")) {
            return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
        }
        if (evento.includes("PROCESO_FASE1")) {
            return "bg-blue-500/20 text-blue-300 border-blue-500/50";
        }
        if (evento.includes("PROCESO_FASE2")) {
            return "bg-emerald-500/20 text-emerald-300 border-emerald-500/50";
        }
        if (evento.includes("LLEGADA")) {
            return "bg-purple-500/20 text-purple-300 border-purple-500/50";
        }
        return "bg-slate-700 text-slate-300 border-slate-600";
    };

    return (
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 shadow-2xl mt-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                    Traza de Operaciones (Últimos 30 Eventos)
                </h2>
                <div className="flex gap-3 text-xs font-semibold">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> Alarmas</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> Ocio</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Producción</span>
                </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-700/50">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-800/80 text-slate-400 uppercase text-xs tracking-wider">
                        <tr>
                            <th className="p-4 font-semibold">Hora</th>
                            <th className="p-4 font-semibold">Estado / Acción</th>
                            <th className="p-4 font-semibold">Métricas (Cant)</th>
                            <th className="p-4 font-semibold">Cola a F1</th>
                            <th className="p-4 font-semibold">Buffer Masa Negra</th>
                            <th className="p-4 font-semibold">Hs Ocupación (F1 | F2)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {ultimosEventos.map((log, i) => (
                            <tr key={i} className="hover:bg-slate-800/50 transition-colors duration-150">
                                <td className="p-4 font-mono font-bold text-slate-300">
                                    {log.hora}h
                                </td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getBadgeStyle(log.evento)}`}>
                                        {log.evento.replace(/_/g, ' ')}
                                    </span>
                                </td>
                                <td className="p-4 font-medium text-slate-200">
                                    {log.cantidad}
                                </td>
                                <td className="p-4 font-mono">
                                    <span className={parseFloat(log.cola) > 1000 ? "text-red-400 font-bold" : "text-slate-400"}>
                                        {log.cola} t
                                    </span>
                                </td>
                                <td className="p-4 font-mono text-orange-300">
                                    {log.bufferStr}
                                </td>
                                <td className="p-4 font-mono text-slate-400 text-xs">
                                    <span className="bg-blue-900/40 text-blue-300 px-2 py-1 rounded">F1: {log.horasActivasF1}h</span>
                                    <span className="mx-1 opacity-50">|</span>
                                    <span className="bg-emerald-900/40 text-emerald-300 px-2 py-1 rounded">F2: {log.horasActivasF2}h</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};