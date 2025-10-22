
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos do modal necessários para FECHAR
    const modal = document.getElementById('success-modal');
    const closeModalBtn = modal?.querySelector('.modal-close-btn'); // Usamos 'modal?.' para segurança

    // Se não encontrar o modal ou o botão de fechar, não faz nada
    if (!modal || !closeModalBtn) {
        // console.warn("Modal.js: Elementos do modal não encontrados."); // Aviso opcional
        return; 
    }
    
    // Função para fechar o modal
    const closeModal = () => {
        modal.classList.remove('ativo');
    };

    // --- EVENTOS PARA FECHAR O MODAL ---

    // 1. Ao CLICAR no botão de fechar ('X')...
    closeModalBtn.addEventListener('click', closeModal);

    // 2. Ao CLICAR no fundo escuro (fora da janela do modal)...
    modal.addEventListener('click', (event) => {
        // Verifica se o clique foi diretamente no elemento 'modal' (o fundo)
        if (event.target === modal) {
            closeModal(); 
        }
    });

    // 3. Ao PRESSIONAR a tecla "Escape"...
    window.addEventListener('keydown', (event) => {
        // Verifica se o modal está ativo antes de fechar com Esc
        if (event.key === 'Escape' && modal.classList.contains('ativo')) {
            closeModal(); 
        }
    });
});