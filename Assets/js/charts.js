/*
 * SCRIPT DOS GRÁFICOS (charts.js)
 *
 * Versão Inteligente:
 * - Define uma função global `renderAllCharts` para desenhar os gráficos.
 * - Lê as cores do tema diretamente das variáveis CSS.
 * - Usa um MutationObserver para detectar a troca de tema e redesenhar os gráficos.
 */

// Array global para guardar as instâncias dos gráficos atuais (necessário para o observer)
let currentCharts = []; 

// Função principal que desenha (ou redesenha) todos os gráficos
function renderAllCharts() {
    console.log("CHART.JS: Iniciando renderização dos gráficos..."); // Log

    // --- 1. PREPARAÇÃO ---
    const rootStyles = getComputedStyle(document.documentElement);
    
    // Destrói os gráficos antigos ANTES de criar os novos.
    // Isso é crucial para evitar erros e sobreposições.
    currentCharts.forEach(chartInstance => {
        if (chartInstance) { // Verifica se a instância é válida
             try {
                 chartInstance.destroy();
             } catch (e) {
                 console.error("CHART.JS: Erro ao destruir gráfico anterior:", e);
             }
        }
    });
    currentCharts = []; // Limpa o array para guardar as novas instâncias

    // Função interna para pegar as cores do tema CSS
    const getThemeColors = () => ({
        textColor: rootStyles.getPropertyValue('--color-text').trim() || '#212121', // Fallback para preto
        primaryColor: rootStyles.getPropertyValue('--color-primary').trim() || '#4CAF50',
        primaryLightColor: rootStyles.getPropertyValue('--color-primary-light').trim() || '#A5D6A7',
        secondaryColor: rootStyles.getPropertyValue('--color-secondary').trim() || '#8D6E63',
        backgroundColor: rootStyles.getPropertyValue('--color-background').trim() || '#FFFFFF', // Fallback para branco
    });

    const colors = getThemeColors(); // Pega as cores atuais

    // --- 2. RENDERIZAÇÃO DOS GRÁFICOS ---

    try { // Adiciona um bloco try...catch geral para capturar erros inesperados
        // --- Gráfico de Pizza ---
        const ctxPie = document.getElementById('chart-pie');
        if (ctxPie) {
            console.log("CHART.JS: Encontrado canvas 'chart-pie'. Renderizando...");
            currentCharts.push(new Chart(ctxPie, {
                type: 'pie',
                data: { 
                    labels: ['Educação', 'Saúde', 'Meio Ambiente'],
                    datasets: [{
                        data: [45, 30, 25],
                        backgroundColor: [colors.primaryColor, colors.secondaryColor, colors.primaryLightColor],
                        borderColor: colors.backgroundColor, 
                        borderWidth: 2
                    }]
                },
                options: { 
                    responsive: true,
                    plugins: { 
                        legend: { 
                            position: 'bottom', // Move legenda para baixo para melhor visualização
                            labels: { color: colors.textColor } 
                        } 
                    }
                }
            }));
        } else {
            console.warn("CHART.JS: Canvas 'chart-pie' não encontrado na página atual.");
        }

        // --- Gráfico de Linha ---
        const ctxLine = document.getElementById('chart-line');
        if (ctxLine) {
            console.log("CHART.JS: Encontrado canvas 'chart-line'. Renderizando...");
            currentCharts.push(new Chart(ctxLine, {
                type: 'line',
                data: { 
                    labels: ['2021', '2022', '2023', '2024', '2025'],
                    datasets: [{
                        label: 'Número de Voluntários',
                        data: [150, 220, 310, 405, 520],
                        borderColor: colors.primaryColor,
                        tension: 0.1,
                        pointBackgroundColor: colors.primaryColor, // Cor dos pontos
                        pointBorderColor: colors.primaryColor
                    }]
                },
                options: { 
                    responsive: true,
                    plugins: { 
                        legend: { 
                            labels: { color: colors.textColor } 
                        } 
                    },
                    scales: {
                        y: { ticks: { color: colors.textColor } }, 
                        x: { ticks: { color: colors.textColor } }
                    }
                }
            }));
        } else {
             console.warn("CHART.JS: Canvas 'chart-line' não encontrado na página atual.");
        }

        // --- Gráfico de Barras ---
        const ctxBar = document.getElementById('chart-bar');
        if (ctxBar) {
            console.log("CHART.JS: Encontrado canvas 'chart-bar'. Renderizando...");
            currentCharts.push(new Chart(ctxBar, {
                type: 'bar',
                data: { 
                    labels: ['Crianças', 'Jovens', 'Adultos', 'Idosos'],
                    datasets: [{
                        label: 'Pessoas Atendidas',
                        data: [1200, 850, 600, 300],
                        backgroundColor: colors.primaryLightColor,
                        borderColor: colors.primaryColor,
                        borderWidth: 1
                    }]
                },
                options: { 
                    responsive: true,
                    plugins: { legend: { display: false } }, // Legenda desativada
                    scales: {
                        y: { ticks: { color: colors.textColor } }, 
                        x: { ticks: { color: colors.textColor } }
                    }
                }
            }));
        } else {
             console.warn("CHART.JS: Canvas 'chart-bar' não encontrado na página atual.");
        }

    } catch (error) {
        console.error("CHART.JS: Erro durante a renderização de um gráfico:", error);
    }

    console.log("CHART.JS: Renderização concluída."); // Log
}

// --- 3. OBSERVADOR DE MUDANÇA DE TEMA ---

// Cria um "vigia" que observa mudanças no atributo 'data-theme' da tag <html>
const themeObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        // Se o atributo modificado foi 'data-theme'...
        if (mutation.attributeName === 'data-theme') {
            console.log("CHART.JS: Mudança de tema detectada, redesenhando gráficos..."); // Log
            // ...chama a função para redesenhar os gráficos com as novas cores
            renderAllCharts(); 
        }
    });
});

// Inicia o "vigia"
themeObserver.observe(document.documentElement, { attributes: true });