import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const SimulationChart = ({ bitacora }) => {
    // Pantalla de espera si aún no hay simulación
    if (!bitacora || bitacora.length === 0) {
        return (
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 flex items-center justify-center h-96 text-slate-500 shadow-lg">
                Ejecuta la simulación para visualizar la dinámica de inventarios
            </div>
        );
    }

    const data = {
        labels: bitacora.map(log => `${log.hora}h`),
        datasets: [
            {
                label: 'Cola a Fase 1 (Ton)',
                // Convierte el string "150.00" a número matemático
                data: bitacora.map(log => parseFloat(log.cola)),
                borderColor: '#f59e0b', // Naranja/Ambar
                backgroundColor: 'rgba(245, 158, 11, 0.5)',
                borderWidth: 2,
                pointRadius: 0, // Ocultamos los puntos para una línea más limpia
                pointHoverRadius: 4,
                tension: 0.1, // Línea ligeramente rígida para simular inventarios
            },
            {
                label: 'Buffer Masa Negra (Ton)',
                // Extrae el "10.00" del string "10.00 / 50"
                data: bitacora.map(log => parseFloat(log.bufferStr.split(' / ')[0])),
                borderColor: '#3b82f6', // Azul
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                borderWidth: 2,
                pointRadius: 0,
                pointHoverRadius: 4,
                tension: 0.1,
            }
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false, // Muestra el tooltip de ambas líneas al mismo tiempo
        },
        plugins: { 
            legend: { 
                labels: { color: '#e2e8f0', font: { weight: 'bold' } } 
            },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                titleColor: '#38bdf8',
                bodyColor: '#e2e8f0',
                borderColor: '#334155',
                borderWidth: 1,
            }
        },
        scales: {
            y: { 
                title: { display: true, text: 'Toneladas Acumuladas (t)', color: '#94a3b8' },
                ticks: { color: '#94a3b8' }, 
                grid: { color: '#1e293b' },
                beginAtZero: true
            },
            x: { 
                title: { display: true, text: 'Cronograma de Eventos (Horas)', color: '#94a3b8' },
                ticks: { 
                    color: '#94a3b8', 
                    maxTicksLimit: 24, // Muestra máximo 24 etiquetas para no saturar la pantalla
                    maxRotation: 0
                }, 
                grid: { color: '#1e293b', display: false } 
            }
        }
    };

    return (
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-xl w-full">
            <h3 className="text-emerald-400 font-bold text-sm uppercase mb-4 border-b border-slate-700 pb-2">
                Dinámica de Inventarios (Comportamiento Estocástico)
            </h3>
            <div className="relative h-[400px]">
                <Line data={data} options={options} />
            </div>
        </div>
    );
}