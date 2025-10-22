document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o container principal onde o conteúdo será injetado
    const mainContent = document.querySelector('main'); 
    // Seleciona todos os links da navegação principal
    const navLinks = document.querySelectorAll('header nav a');

    // Função assíncrona para carregar o conteúdo da página via Fetch
    const loadContent = async (pageName) => {
        
        // Se pageName for vazio ou 'index', trata como a página inicial
        if (!pageName || pageName === 'index') {
            console.log("SPA: Carregando/Mantendo conteúdo inicial (index.html)");
            setActiveLink('index'); // Marca o link "Início" como ativo
            // Poderíamos adicionar lógica aqui para recarregar o conteúdo original do index se necessário
            return; 
        }

        // Constrói o caminho para o arquivo HTML a ser buscado
        const filePath = `${pageName}.html`;
        console.log(`SPA: Tentando carregar ${filePath}`); // Log para debug

        try {
            // Faz a requisição para buscar o arquivo HTML
            const response = await fetch(filePath);
            
            // Verifica se a requisição foi bem-sucedida
            if (!response.ok) {
                throw new Error(`Erro ${response.status} ao buscar ${filePath}`);
            }

            // Lê o conteúdo HTML como texto
            const htmlText = await response.text();

            // Usa o DOMParser para transformar o texto HTML em um documento manipulável
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlText, 'text/html');

            // Encontra a tag <main> dentro do documento buscado
            const newMainContent = doc.querySelector('main');

            // Verifica se tanto o container principal quanto o novo conteúdo foram encontrados
            if (newMainContent && mainContent) {
                // Substitui o conteúdo do <main> atual pelo novo conteúdo
                mainContent.innerHTML = newMainContent.innerHTML; 
                console.log(`SPA: Conteúdo de ${pageName} injetado.`); // Log

                // Atualiza o título da aba do navegador
                const newTitle = doc.querySelector('title');
                if (newTitle) {
                    document.title = newTitle.textContent;
                }

                // --- EXECUÇÃO DE SCRIPTS PÓS-CARREGAMENTO ---
                // Verifica se a página carregada é a de transparência
                if (pageName === 'transparencia') {
                    // Adiciona um pequeno delay antes de tentar renderizar os gráficos
                    setTimeout(() => { 
                        // Verifica se a função global renderAllCharts existe (do charts.js)
                        if (typeof renderAllCharts === 'function') {
                            console.log("SPA: Chamando renderAllCharts após delay..."); // Log
                            renderAllCharts(); // Chama a função para desenhar os gráficos
                        } else {
                            console.error('SPA Error: Função renderAllCharts não encontrada. Verifique se charts.js está correto e carregado.');
                        }
                    }, 100); // Espera 100ms para garantir que o DOM foi atualizado
                }
                
                // (Aqui poderíamos adicionar lógica similar para outros scripts específicos de página, se necessário)

            } else {
                // Se não encontrar o <main> no arquivo buscado
                mainContent.innerHTML = '<p>Erro: Conteúdo principal não encontrado no arquivo carregado.</p>';
                console.error(`SPA Error: Tag <main> não encontrada em ${filePath}`);
            }
        } catch (error) {
            // Se ocorrer qualquer erro durante o fetch ou processamento
            console.error('SPA Error: Falha no carregamento da página:', error);
            mainContent.innerHTML = '<p>Erro ao carregar o conteúdo desta seção. Por favor, tente recarregar a página.</p>';
        }
    };

    // Função para marcar o link ativo no menu de navegação
    const setActiveLink = (pageName) => {
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            link.classList.remove('active-link'); // Remove a classe de todos

            // Compara o nome da página com o href do link (tratando # e index.html)
            if (linkHref === `#${pageName}` || (pageName === 'index' && linkHref === 'index.html')) {
                link.classList.add('active-link'); // Adiciona a classe ao link correto
            }
        });
        console.log(`SPA: Link ativo definido para ${pageName}`); // Log
    };

    // Função que lida com a mudança no hash da URL
    const handleHashChange = () => {
        // Pega o hash atual (ex: '#sobre'), removendo o '#' inicial
        const pageName = window.location.hash.substring(1); 
        loadContent(pageName); // Carrega o conteúdo correspondente
        setActiveLink(pageName || 'index'); // Marca o link ativo ('index' se não houver hash)
    };

    // --- INICIALIZAÇÃO E EVENTOS ---

    // 1. "Ouve" por mudanças no hash da URL (navegação por links, botões voltar/avançar)
    window.addEventListener('hashchange', handleHashChange);

    // 2. Chama a função uma vez ao carregar a página para tratar o hash inicial (se houver)
    //    ou carregar o conteúdo padrão (neste caso, mantendo o do index.html).
    handleHashChange(); 

    // 3. Adiciona listeners aos links para atualizar o estado ativo imediatamente (melhora a UX)
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
             const href = link.getAttribute('href');
             // Verifica se é um link SPA (#) ou o link da Home
             if (href && (href.startsWith('#') || href === 'index.html')) {
                 const pageName = href.startsWith('#') ? href.substring(1) : 'index';
                 setActiveLink(pageName); 
                 // Não precisamos mais de event.preventDefault() aqui, pois o hashchange cuidará do carregamento.
             }
        });
    });

});