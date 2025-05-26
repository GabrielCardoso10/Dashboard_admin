document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
    
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      
      if (username === 'admin' && password === 'admin123') {
        // Armazena informação de autenticação
        localStorage.setItem('ligoju_auth', JSON.stringify({
          user: username,
          token: 'simulated_token_123456',
          isAuth: true
        }));
        
        // Redireciona para o dashboard
        window.location.href = 'dashboard.html';
      } else {
        // Exibe mensagem de erro
        errorMessage.style.display = 'block';
        
        // Limpa a senha
        document.getElementById('password').value = '';
      }
    });
  });