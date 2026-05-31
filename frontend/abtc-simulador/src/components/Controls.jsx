export const Controls = ({ params, setParams }) => {
    const handleChange = (key, value) => setParams(prev => ({ ...prev, [key]: Number(value) }));

    const inputClass = "w-full bg-slate-900 border border-slate-600 p-3 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";

    return (
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl">
            <h2 className="text-lg font-semibold text-blue-400 mb-6 flex items-center">
                ⚙️ Configuración del Sistema
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Parámetros de Llegada (Los que faltaban) */}
                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Tasa Llegada (Hs)</label>
                    <input type="number" value={params.tasaLlegada} onChange={(e) => handleChange('tasaLlegada', e.target.value)} className={inputClass}/>
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Media Lote (Ton)</label>
                    <input type="number" value={params.mediaLote} onChange={(e) => handleChange('mediaLote', e.target.value)} className={inputClass}/>
                </div>

                <hr className="sm:col-span-2 border-slate-600 my-2" />

                {/* Parámetros de Planta */}
                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Cap. F1 (Ciclo)</label>
                    <input type="number" value={params.capacidadFase1} onChange={(e) => handleChange('capacidadFase1', e.target.value)} className={inputClass}/>
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Cap. F2 (Batch)</label>
                    <input type="number" value={params.capacidadFase2} onChange={(e) => handleChange('capacidadFase2', e.target.value)} className={inputClass}/>
                </div>
                <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Buffer Intermedio (Ton)</label>
                    <input type="number" value={params.capacidadBuffer} onChange={(e) => handleChange('capacidadBuffer', e.target.value)} className={inputClass}/>
                </div>
            </div>
        </div>
    );
};