// document.addEventListener('DOMContentLoaded', function() {
//     // Verificar autenticação e permissões
//     const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
//     if (!currentUser || currentUser.role !== 'admin') {
//         window.location.href = 'dashboard.html';
//         return;
//     }
    
//     // Carregar estatísticas
//     loadStatistics();
    
//     // Configurar eventos
//     document.getElementById('statsPeriod').addEventListener('change', loadStatistics);
// });

// function loadStatistics() {
//     const period = document.getElementById('statsPeriod').value;
    
//     // Dados mockados baseados no período selecionado
//     const data = generateMockData(period);
    
//     // Gráfico de Inscrições
//     renderRegistrationsChart(data.registrations);
    
//     // Gráfico de Tipos de Eventos
//     renderEventTypesChart(data.eventTypes);
    
//     // Gráfico de Arrecadação
//     renderRevenueChart(data.revenue);
// }

// function generateMockData(period) {
//     // Gerar dados fictícios baseados no período
//     const months = getLastMonths(parseInt(period));
    
//     return {
//         registrations: {
//             labels: months.labels,
//             data: generateRandomData(months.count, 50, 200)
//         },
//         eventTypes: {
//             labels: ['Palestras', 'Workshops', 'Cursos'],
//             data: generateRandomData(3, 10, 50)
//         },
//         revenue: {
//             labels: months.labels,
//             data: generateRandomData(months.count, 1000, 5000)
//         }
//     };
// }

// function getLastMonths(count) {
//     const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
//     const date = new Date();
//     const result = [];
    
//     for (let i = count - 1; i >= 0; i--) {
//         const d = new Date();
//         d.setMonth(date.getMonth() - i);
//         result.push(months[d.getMonth()] + ' ' + d.getFullYear());
//     }
    
//     return {
//         labels: result,
//         count: count
//     };
// }

// function generateRandomData(count, min, max) {
//     return Array.from({length: count}, () => Math.floor(Math.random() * (max - min + 1) + min);
// }

// function renderRegistrationsChart(data) {
//     const ctx = document.getElementById('registrationsChart').getContext('2d');
    
//     if (window.registrationsChart) {
//         window.registrationsChart.destroy();
//     }
    
//     window.registrationsChart = new Chart(ctx, {
//         type: 'bar',
//         data: {
//             labels: data.labels,
//             datasets: [{
//                 label: 'Inscrições',
//                 data: data.data,
//                 backgroundColor: 'rgba(255, 36, 74, 0.7)',
//                 borderColor: 'rgba(255, 36, 74, 1)',
//                 borderWidth: 1,
//                 borderRadius: 4
//             }]
//         },
//         options: {
//             responsive: true,
//             maintainAspectRatio: false,
//             plugins: {
//                 legend: {
//                     display: false
//                 },
//                 tooltip: {
//                     mode: 'index',
//                     intersect: false
//                 }
//             },
//             scales: {
//                 y: {
//                     beginAtZero: true,
//                     grid: {
//                         color: 'rgba(0, 0, 0, 0.05)'
//                     },
//                     ticks: {
//                         stepSize: 50
//                     }
//                 },
//                 x: {
//                     grid: {
//                         display: false
//                     }
//                 }
//             }
//         }
//     });
// }

// function renderEventTypesChart(data) {
//     const ctx = document.getElementById('eventTypesChart').getContext('2d');
    
//     if (window.eventTypesChart) {
//         window.eventTypesChart.destroy();
//     }
    
//     window.eventTypesChart = new Chart(ctx, {
//         type: 'doughnut',
//         data: {
//             labels: data.labels,
//             datasets: [{
//                 data: data.data,
//                 backgroundColor: [
//                     'rgba(255, 36, 74, 0.7)',
//                     'rgba(28, 234, 228, 0.7)',
//                     'rgba(255, 233, 16, 0.7)'
//                 ],
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             responsive: true,
//             maintainAspectRatio: false,
//             plugins: {
//                 legend: {
//                     position: 'right'
//                 },
//                 tooltip: {
//                     callbacks: {
//                         label: function(context) {
//                             const label = context.label || '';
//                             const value = context.raw || 0;
//                             const total = context.dataset.data.reduce((a, b) => a + b, 0);
//                             const percentage = Math.round((value / total) * 100);
//                             return `${label}: ${value} (${percentage}%)`;
//                         }
//                     }
//                 }
//             },
//             cutout: '70%'
//         }
//     });
// }

// function renderRevenueChart(data) {
//     const ctx = document.getElementById('revenueChart').getContext('2d');
    
//     if (window.revenueChart) {
//         window.revenueChart.destroy();
//     }
    
//     window.revenueChart = new Chart(ctx, {
//         type: 'line',
//         data: {
//             labels: data.labels,
//             datasets: [{
//                 label: 'Arrecadação (R$)',
//                 data: data.data,
//                 backgroundColor: 'rgba(255, 36, 74, 0.1)',
//                 borderColor: 'rgba(255, 36, 74, 1)',
//                 borderWidth: 2,
//                 tension: 0.4,
//                 fill: true,
//                 pointBackgroundColor: 'rgba(255, 36, 74, 1)'
//             }]
//         },
//         options: {
//             responsive: true,
//             maintainAspectRatio: false,
//             plugins: {
//                 legend: {
//                     display: false
//                 },
//                 tooltip: {
//                     mode: 'index',
//                     intersect: false,
//                     callbacks: {
//                         label: function(context) {
//                             return 'R$ ' + context.raw.toLocaleString('pt-BR');
//                         }
//                     }
//                 }
//             },
//             scales: {
//                 y: {
//                     beginAtZero: true,
//                     grid: {
//                         color: 'rgba(0, 0, 0, 0.05)'
//                     },
//                     ticks: {
//                         callback: function(value) {
//                             return 'R$ ' + value.toLocaleString('pt-BR');
//                         }
//                     }
//                 },
//                 x: {
//                     grid: {
//                         display: false
//                     }
//                 }
//             }
//         }
//     });
// }