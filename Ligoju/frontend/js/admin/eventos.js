document.addEventListener('DOMContentLoaded', function() {
    // Verificação de autenticação
    checkAuth();
    
    // Elementos do DOM
    const btnNovoEvento = document.getElementById('btn-novo-evento');
    const modalEvento = document.getElementById('modal-evento');
    const btnClose = modalEvento.querySelector('.btn-close');
    const btnCancelar = document.getElementById('cancelar');
    const formEvento = document.getElementById('form-evento');
    const deleteButtons = document.querySelectorAll('.btn-delete');
    
    // Abre o modal para adicionar novo evento
    btnNovoEvento.addEventListener('click', function() {
      // Reseta o formulário
      formEvento.reset();
      modalEvento.querySelector('.modal-header h3').textContent = 'Adicionar Novo Evento';
      formEvento.dataset.mode = 'add';
      
      // Mostra o modal
      modalEvento.classList.add('show');
    });
    
    // Fecha o modal
    btnClose.addEventListener('click', closeModal);
    btnCancelar.addEventListener('click', closeModal);
    
    // Manipula o envio do formulário
    formEvento.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Coleta os dados do formulário
      const formData = new FormData(formEvento);
      const eventoData = {
        titulo: formData.get('titulo'),
        data: formData.get('data'),
        local: formData.get('local'),
        descricao: formData.get('descricao'),
        status: formData.get('status')
      };
      
      // usando fetch() ou XMLHttpRequest
      console.log('Dados do evento:', eventoData);
      
      // Simulação de sucesso (em produção, isso seria feito após resposta do servidor)
      showNotification('Evento salvo com sucesso!');
      
      // Fecha o modal
      closeModal();
      
      // Em um sistema real, você recarregaria os dados ou atualizaria a tabela
      // Por ora, apenas recarrega a página para simular
      setTimeout(() => {
        location.reload();
      }, 1500);
    });
    
    // Configura botões de exclusão
    deleteButtons.forEach(button => {
      button.addEventListener('click', function() {
        const id = this.dataset.id;
        
        if (confirm('Tem certeza que deseja excluir este evento?')) {
          // Em um sistema real, aqui você enviaria uma requisição DELETE para o backend
          console.log(`Excluindo evento ID: ${id}`);
          
          // Simulação de sucesso
          showNotification('Evento excluído com sucesso!');
          
          // Remove a linha da tabela (simulação)
          this.closest('tr').remove();
        }
      });
    });
    
    // Configura a busca
    const searchInput = document.getElementById('busca-eventos');
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
    
    function closeModal() {
      modalEvento.classList.remove('show');
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