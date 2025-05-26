document.addEventListener('DOMContentLoaded', function() {
    // Verificação de autenticação
    checkAuth();
    
    // Elementos do DOM
    const btnNovaNoticia = document.getElementById('btn-nova-noticia');
    const modalNoticia = document.getElementById('modal-noticia');
    const btnClose = modalNoticia.querySelector('.btn-close');
    const btnCancelar = document.getElementById('cancelar');
    const formNoticia = document.getElementById('form-noticia');
    const deleteButtons = document.querySelectorAll('.btn-delete');
    
    // Abre o modal para adicionar nova notícia
    btnNovaNoticia.addEventListener('click', function() {
      // Reseta o formulário
      formNoticia.reset();
      modalNoticia.querySelector('.modal-header h3').textContent = 'Adicionar Nova Notícia';
      formNoticia.dataset.mode = 'add';
      
      // Mostra o modal
      modalNoticia.classList.add('show');
    });
    
    // Fecha o modal
    btnClose.addEventListener('click', closeModal);
    btnCancelar.addEventListener('click', closeModal);
    
    // Manipula o envio do formulário
    formNoticia.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Coleta os dados do formulário
      const formData = new FormData(formNoticia);
      const noticiaData = {
        titulo: formData.get('titulo'),
        data: formData.get('data'),
        resumo: formData.get('resumo'),
        conteudo: formData.get('conteudo'),
        status: formData.get('status')
      };
      
      // usando fetch() ou XMLHttpRequest
      let method = formNoticia.dataset.mode === 'edit' ? 'update' : 'add';

      fetch('../../backend/api/noticias.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noticiaData)
      })
      .then(response => response.json())
      .then(result => {
        if (result.status === 'criado' || result.status === 'atualizado') {
          showNotification('Notícia salva com sucesso!');
          closeModal();
          setTimeout(() => {
            location.reload();
          }, 1500);
        } else {
          showNotification('Erro ao salvar notícia!');
        }
      });
      
    });
    
    // Configura botões de exclusão
    deleteButtons.forEach(button => {
      button.addEventListener('click', function() {
        const id = this.dataset.id;
        
        if (confirm('Tem certeza que deseja excluir esta notícia?')) {
          console.log(`Excluindo notícia ID: ${id}`);
          
          // Simulação de sucesso
          showNotification('Notícia excluída com sucesso!');
          
          // Remove a linha da tabela (simulação)
          this.closest('tr').remove();
        }
      });
    });
    
    // Configura a busca
    const searchInput = document.getElementById('busca-noticias');
    const searchButton = document.querySelector('.btn-search');
    
    searchButton.addEventListener('click', function() {
      const searchTerm = searchInput.value.toLowerCase();
      
      const rows = document.querySelectorAll('.content-table tbody tr');
      
      rows.forEach(row => {
        const title = row.cells[0].textContent.toLowerCase();
        if (title.includes(searchTerm)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
    
    // Funções auxiliares
    function closeModal() {
      modalNoticia.classList.remove('show');
    }
    
    function showNotification(message) {
      // Criar notificação
      const notification = document.createElement('div');
      notification.className = 'notification';
      notification.textContent = message;
      
      // Estilizar
      notification.style.position = 'fixed';
      notification.style.bottom = '20px';
      notification.style.right = '20px';
      notification.style.backgroundColor = '#4CAF50';
      notification.style.color = 'white';
      notification.style.padding = '15px 20px';
      notification.style.borderRadius = '4px';
      notification.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
      notification.style.zIndex = '1000';
      
      // Adicionar ao DOM
      document.body.appendChild(notification);
      
      // Remover após 3 segundos
      setTimeout(() => {
        notification.remove();
      }, 3000);
    }
    
    function checkAuth() {
      const auth = JSON.parse(localStorage.getItem('ligoju_auth') || '{}');
      if (!auth.isAuth) {
        window.location.href = 'login.html';
      }
    }
  });