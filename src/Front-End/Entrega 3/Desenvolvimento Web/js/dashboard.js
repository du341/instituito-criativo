// document.addEventListener('DOMContentLoaded', function() {
//     // Verificar autenticação
//     const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
//     if (!currentUser) {
//         window.location.href = 'index.html';
//         return;
//     }
    
//     // Atualizar interface com dados do usuário
//     updateUserUI(currentUser);
    
//     // Carregar dados do dashboard
//     loadDashboardData();
    
//     // Configurar eventos
//     setupEventListeners();
// });

// function updateUserUI(user) {
//     // Atualizar avatar e nome do usuário
//     const userAvatar = document.querySelector('.user-avatar img');
//     const userName = document.querySelector('.header h2');
    
//     if (user.avatar) {
//         userAvatar.src = user.avatar;
//     }
    
//     if (user.name) {
//         userName.textContent = `Olá, ${user.name.split(' ')[0]}`;
//     }
    
//     // Mostrar/ocultar itens de admin
//     if (user.role !== 'admin') {
//         document.querySelectorAll('.admin-only').forEach(el => {
//             el.style.display = 'none';
//         });
//     }
// }

// function loadDashboardData() {
//     // Carregar eventos (mockado - em produção seria uma chamada API)
//     loadUpcomingEvents();
//     loadMyRegistrations();
// }

// function loadUpcomingEvents() {
//     // Dados mockados
//     const events = [
//         {
//             id: 1,
//             title: 'Workshop de Programação Web',
//             description: 'Aprenda os fundamentos de HTML, CSS e JavaScript',
//             date: '15/12/2023',
//             time: '14:00 - 17:00',
//             type: 'workshop',
//             image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
//             registered: 24,
//             capacity: 30
//         },
//         {
//             id: 2,
//             title: 'Palestra: Educação no Século XXI',
//             description: 'Novas metodologias e tecnologias educacionais',
//             date: '20/12/2023',
//             time: '19:00 - 21:00',
//             type: 'palestra',
//             image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
//             registered: 45,
//             capacity: 100
//         },
//         {
//             id: 3,
//             title: 'Curso de Design Instrucional',
//             description: 'Crie materiais educacionais eficazes',
//             date: '05/01/2024',
//             time: '09:00 - 12:00',
//             type: 'curso',
//             image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
//             registered: 12,
//             capacity: 25
//         }
//     ];
    
//     const container = document.getElementById('upcomingEvents');
//     container.innerHTML = '';
    
//     events.forEach(event => {
//         const progress = Math.min(Math.round((event.registered / event.capacity) * 100), 100);
        
//         const eventCard = document.createElement('div');
//         eventCard.className = 'event-card card';
//         eventCard.innerHTML = `
//             <div class="event-image">
//                 <img src="${event.image}" alt="${event.title}">
//                 <span class="event-badge">${event.type}</span>
//             </div>
//             <div class="event-content">
//                 <h4 class="event-title">${event.title}</h4>
//                 <p class="event-description">${event.description}</p>
//                 <div class="event-meta">
//                     <span>${event.date}</span>
//                     <span>${event.time}</span>
//                 </div>
//                 <div class="progress-bar mt-3">
//                     <div class="progress-track">
//                         <div class="progress-fill" style="width: ${progress}%;"></div>
//                     </div>
//                     <div class="progress-text">${event.registered}/${event.capacity} inscritos</div>
//                 </div>
//                 <div class="event-actions mt-3">
//                     <button class="btn btn-primary btn-sm" onclick="viewEvent(${event.id})">
//                         Ver detalhes
//                     </button>
//                 </div>
//             </div>
//         `;
        
//         container.appendChild(eventCard);
//     });
// }

// function loadMyRegistrations() {
//     // Dados mockados
//     const registrations = [
//         {
//             id: 1,
//             eventId: 1,
//             title: 'Workshop de Programação Web',
//             date: '15/12/2023',
//             time: '14:00 - 17:00',
//             status: 'confirmado'
//         },
//         {
//             id: 2,
//             eventId: 2,
//             title: 'Palestra: Educação no Século XXI',
//             date: '20/12/2023',
//             time: '19:00 - 21:00',
//             status: 'pendente'
//         }
//     ];
    
//     const container = document.getElementById('myRegistrations');
//     container.innerHTML = '';
    
//     if (registrations.length === 0) {
//         container.innerHTML = `
//             <div class="empty-state">
//                 <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M9 12L11 14L15 10M21 16V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16Z" stroke="var(--light-gray)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
//                 </svg>
//                 <p>Você não está inscrito em nenhum evento</p>
//                 <a href="eventos.html" class="btn btn-outline mt-2">Explorar eventos</a>
//             </div>
//         `;
//         return;
//     }
    
//     registrations.forEach(reg => {
//         const statusClass = reg.status === 'confirmado' ? 'badge-success' : 'badge-warning';
        
//         const regCard = document.createElement('div');
//         regCard.className = 'registration-card card';
//         regCard.innerHTML = `
//             <div class="registration-content">
//                 <h4>${reg.title}</h4>
//                 <div class="registration-meta">
//                     <span>${reg.date}</span>
//                     <span>${reg.time}</span>
//                 </div>
//                 <div class="registration-status mt-2">
//                     <span class="badge ${statusClass}">${reg.status}</span>
//                 </div>
//                 <div class="registration-actions mt-3">
//                     <button class="btn btn-outline btn-sm" onclick="cancelRegistration(${reg.id})">
//                         Cancelar inscrição
//                     </button>
//                 </div>
//             </div>
//         `;
        
//         container.appendChild(regCard);
//     });
// }

// function setupEventListeners() {
//     // Logout
//     document.querySelector('.user-menu').addEventListener('click', function() {
//         if (confirm('Deseja sair do sistema?')) {
//             sessionStorage.removeItem('currentUser');
//             window.location.href = 'index.html';
//         }
//     });
    
//     // Mobile menu toggle (se aplicável)
//     const menuToggle = document.querySelector('.menu-toggle');
//     if (menuToggle) {
//         menuToggle.addEventListener('click', function() {
//             document.querySelector('.sidebar').classList.toggle('active');
//         });
//     }
// }

// // Funções globais
// function viewEvent(id) {
//     window.location.href = `eventos.html?eventId=${id}`;
// }

// function cancelRegistration(id) {
//     if (confirm('Tem certeza que deseja cancelar esta inscrição?')) {
//         // Em produção, seria uma chamada API
//         alert('Inscrição cancelada com sucesso!');
//         loadMyRegistrations();
//     }
// }