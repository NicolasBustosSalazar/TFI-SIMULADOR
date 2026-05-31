import React, { useState } from 'react';
import { initialParams } from './logic/Parameters';
import { Controls } from './components/Controls';
import { Dashboard } from './components/Dashboard';
import { SimulationChart } from './components/SimulationChart';
import { LogTable } from './components/LogTable';
// NUEVA IMPORTACIÓN
import { PrintReport } from './components/PrintReport'; 

function App() {
    const [params, setParams] = useState(initialParams);
    const [state, setState] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isLogMenuOpen, setIsLogMenuOpen] = useState(false);

    const ejecutarSimulacion = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://tfi-simulador.onrender.com/api/simular', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(params)
            });

            if (!response.ok) throw new Error("Error en el servidor");
            
            const resultadoFinal = await response.json();
            
            setState(resultadoFinal);
            setHistory([resultadoFinal]); 
            
        } catch (error) {
            console.error("Error al ejecutar:", error);
            alert("Error al conectar con el backend. Asegúrate de que node server.js esté corriendo.");
        } finally {
            setLoading(false);
        }
    };

    // Función nativa para imprimir
    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            {/* CONTENEDOR PRINCIPAL WEB (Se oculta al imprimir con print:hidden) */}
            <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 relative print:hidden">
                <header className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row gap-4 md:gap-0 justify-between md:items-center">
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl sm:text-4xl font-black text-white">
                            Simulador ABTC <span className="text-blue-500">Nevada</span>
                        </h1>
                        <p className="text-slate-400 text-sm sm:text-base">Motor Estocástico (Congruencial Mixto) - UTN FRT</p>
                    </div>
                    
                    {/* Botones de acción (Solo visibles si ya se simuló) */}
                    {state && (
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                            {/* Botón de Imprimir Reporte */}
                            <button 
                                onClick={handlePrint}
                                className="bg-slate-200 hover:bg-white text-slate-900 border border-slate-300 px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-lg flex items-center gap-2"
                            >
                                🖨️ Imprimir Reporte
                            </button>

                            {/* Botón de Bitácora */}
                            <button 
                                onClick={() => setIsLogMenuOpen(true)}
                                className="bg-slate-800 hover:bg-slate-700 border border-slate-600 px-6 py-3 rounded-xl text-sm font-bold text-emerald-400 transition-all shadow-lg hover:shadow-emerald-900/20 flex items-center gap-2"
                            >
                                📋 Ver Traza
                            </button>
                        </div>
                    )}
                </header>

                <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <section>
                        <Controls params={params} setParams={setParams} />
                    </section>

                    <section>
                        {state ? (
                            <Dashboard state={state} />
                        ) : (
                            <div className="h-full flex items-center justify-center bg-slate-900 rounded-2xl border border-slate-700 text-slate-500 p-6 text-center">
                                Ajusta los parámetros y ejecuta la simulación para ver los resultados
                            </div>
                        )}
                    </section>

                    <section className="lg:col-span-2">
                        <SimulationChart bitacora={state ? state.bitacora : []} />
                    </section>
                </main>

                <footer className="max-w-6xl mx-auto mt-8">
                    <button 
                        onClick={ejecutarSimulacion}
                        disabled={loading}
                        className={`w-full py-6 rounded-2xl font-black text-xl shadow-lg transition-all ${
                            loading 
                            ? "bg-slate-700 cursor-wait text-slate-400" 
                            : "bg-blue-600 hover:bg-blue-500 shadow-blue-900/20 text-white"
                        }`}
                    >
                        {loading ? "Calculando 30 días de operación..." : "Ejecutar Ciclo Completo"}
                    </button>
                </footer>

                {/* MODAL DE LA BITÁCORA */}
                {isLogMenuOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                        <div 
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                            onClick={() => setIsLogMenuOpen(false)}
                        ></div>
                        <div className="relative bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                            <div className="p-5 sm:p-6 border-b border-slate-700 flex justify-between items-center bg-slate-950">
                                <div>
                                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                                        Bitácora del Sistema
                                    </h2>
                                    <p className="text-slate-400 text-sm mt-1">Traza detallada de los últimos eventos estocásticos.</p>
                                </div>
                                <button 
                                    onClick={() => setIsLogMenuOpen(false)}
                                    className="text-slate-400 hover:text-white bg-slate-800 hover:bg-red-500 hover:border-red-500 border border-slate-600 rounded-full w-10 h-10 flex items-center justify-center font-bold transition-colors"
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-900">
                                <LogTable bitacora={state ? state.bitacora : []} />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* REPORTE PARA IMPRESIÓN (Solo visible al presionar imprimir) */}
            <PrintReport params={params} state={state} />
        </>
    );
}

export default App;