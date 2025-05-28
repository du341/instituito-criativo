// document.addEventListener('DOMContentLoaded', function() {
//     const loginForm = document.getElementById('loginForm');
//     const errorMessage = document.getElementById('errorMessage');
    
//     // Dados mockados de usuários (em produção, usar backend)
//     const users = [
//         { id: 1, email: 'admin@educa.com', password: 'admin123', name: 'Administrador', role: 'admin', avatar: 'https://via.placeholder.com/150' },
//         { id: 2, email: 'voluntario@educa.com', password: 'vol123', name: 'Voluntário', role: 'voluntario', avatar: 'https://via.placeholder.com/150' }
//     ];
    
//     loginForm.addEventListener('submit', function(e) {
//         e.preventDefault();
        
//         const email = document.getElementById('email').value;
//         const password = document.getElementById('password').value;
        
//         const user = users.find(u => u.email === email && u.password === password);
        
//         if (user) {
//             // Salva o usuário na sessionStorage
//             sessionStorage.setItem('currentUser', JSON.stringify(user));
            
//             // Redireciona para o dashboard
//             window.location.href = 'dashboard.html';
//         } else {
//             errorMessage.textContent = 'E-mail ou senha incorretos.';
//         }
//     });
    
//     // Verifica se já está logado
//     if (sessionStorage.getItem('currentUser') {
//         window.location.href = 'dashboard.html';
//     }
// });