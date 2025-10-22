/*
 * SCRIPT DO CARROSSEL (carousel.js)
 *
 * Funcionalidade:
 * - Controla o carrossel de imagens na seção Hero da página inicial.
 * - Troca as imagens automaticamente a cada 5 segundos.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todas as imagens dentro do carrossel
    const images = document.querySelectorAll('.hero-carousel .carousel-image');
    
    // Se não houver imagens nesta página, o script para
    if (images.length === 0) {
        return;
    }

    // Variável para controlar qual imagem está sendo exibida
    let currentIndex = 0;
    
    // Define um intervalo para chamar a função `nextImage` a cada 5000ms (5s)
    setInterval(nextImage, 5000);

    // Função que avança para a próxima imagem
    function nextImage() {
        // Remove a classe 'active' da imagem atual, fazendo-a desaparecer
        images[currentIndex].classList.remove('active');

        // Avança para o próximo índice. O '%' garante que volte a 0 no final da lista.
        currentIndex = (currentIndex + 1) % images.length;

        // Adiciona a classe 'active' na nova imagem, fazendo-a aparecer
        images[currentIndex].classList.add('active');
    }
});