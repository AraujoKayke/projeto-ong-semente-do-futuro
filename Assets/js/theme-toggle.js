/*
 * SCRIPT DE TROCA DE TEMA (theme-toggle.js)
 *
 * Funcionalidade:
 * 1. Ao carregar a página, verifica se o usuário já tem um tema salvo no Local Storage.
 * 2. Se tiver, aplica o tema salvo.
 * 3. Adiciona um "ouvinte" de clique ao botão de troca de tema.
 * 4. Ao clicar, inverte o tema atual (de 'light' para 'dark' e vice-versa).
 * 5. Salva a nova escolha no Local Storage para futuras visitas.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos HTML necessários
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const root = document.documentElement; // A tag <html>

    // --- Parte 1: Carregar Tema Salvo ---
    
    // Pega o tema salvo no "banco de dados" do navegador (Local Storage)
    const savedTheme = localStorage.getItem('theme');
    
    // Se um tema foi encontrado...
    if (savedTheme) {
        // ...aplica-o ao elemento <html>
        root.setAttribute('data-theme', savedTheme);
    }

    // Se o botão não existir nesta página, não faz mais nada
    if (!themeToggleBtn) {
        return;
    }

    // --- Parte 2: Lógica do Clique ---

    // Adiciona a função a ser executada quando o botão for clicado
    themeToggleBtn.addEventListener('click', () => {
        // Verifica se o tema atual é 'dark'
        const isDark = root.getAttribute('data-theme') === 'dark';
        
        // Define o novo tema como o oposto do atual
        const newTheme = isDark ? 'light' : 'dark';

        // Aplica o novo tema ao <html>
        root.setAttribute('data-theme', newTheme);
        
        // Salva a nova escolha no Local Storage para ser lembrada
        localStorage.setItem('theme', newTheme);
    });
});