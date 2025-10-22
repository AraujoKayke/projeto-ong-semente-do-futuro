// Em Assets/js/validation.js (Escopo Corrigido)

document.addEventListener('DOMContentLoaded', () => {

    // --- FUNÇÕES AUXILIARES (Definidas ANTES de serem usadas) ---

    // Valida todos os campos requeridos ou com regras dentro de um formulário
    const validateForm = (form) => {
        let isValid = true; 
        clearAllErrors(form); 
        const fieldsToValidate = form.querySelectorAll('[required], [pattern], [minlength], [maxlength], [min], [max], [type="email"]');
        fieldsToValidate.forEach(field => {
            if (!field.checkValidity()) {
                isValid = false; 
                showError(field); 
            }
        });
        return isValid; 
    };

    // Exibe a mensagem de erro abaixo de um campo inválido
    const showError = (field) => {
        let errorSpan = field.nextElementSibling;
        if (!errorSpan || !errorSpan.classList.contains('error-message')) {
            errorSpan = document.createElement('span');
            errorSpan.classList.add('error-message');
            field.parentNode.insertBefore(errorSpan, field.nextSibling); 
        }
        errorSpan.textContent = field.validationMessage; 
        field.classList.add('invalid');
    };

    // Remove a mensagem de erro de um campo específico
    const clearError = (field) => {
        const errorSpan = field.nextElementSibling;
        if (errorSpan && errorSpan.classList.contains('error-message')) {
            errorSpan.remove(); 
        }
        field.classList.remove('invalid'); 
    };

    // Remove todas as mensagens de erro e classes de erro de um formulário
    const clearAllErrors = (form) => {
        form.querySelectorAll('.error-message').forEach(span => span.remove());
        form.querySelectorAll('.invalid').forEach(field => field.classList.remove('invalid'));
    };
    
    // Mostra o modal de sucesso, atualizando seu conteúdo
    const showSuccessModal = (form) => {
        const title = form.dataset.modalTitle || 'Enviado com Sucesso!';
        const text = form.dataset.modalText || 'Recebemos suas informações.';
        const modal = document.getElementById('success-modal');
        const modalTitle = modal?.querySelector('h3');
        const modalText = modal?.querySelector('p');

        if (modal && modalTitle && modalText) {
            modalTitle.textContent = title;
            modalText.textContent = text;
            modal.classList.add('ativo'); 
        } else {
            console.error("Validation.js: Modal (#success-modal) ou seus elementos internos (h3, p) não encontrados.");
            alert(title); // Fallback
        }
    };

    // --- OUVINTE PRINCIPAL DE SUBMIT (DELEGAÇÃO NO DOCUMENT) ---
    document.addEventListener('submit', (event) => {
        const form = event.target;
        if (form && form.tagName === 'FORM' && form.dataset.validate === 'true') {
            event.preventDefault(); 
            console.log("Validation.js: Default form submission PREVENTED for form:", form.id || 'sem ID'); 

            // AGORA AS FUNÇÕES ESTÃO ACESSÍVEIS AQUI
            const isValid = validateForm(form); 
            console.log("Validation.js: Form validation result:", isValid); 

            if (isValid) {
                console.log('Formulário válido! Mostrando modal...'); 
                showSuccessModal(form); 
            } else {
                console.log('Formulário inválido. Corrija os erros.'); 
            }
        } 
    });

    // --- VALIDAÇÃO "EM TEMPO REAL" ---
    document.addEventListener('input', (event) => {
        const field = event.target;
        if (field && field.closest('form[data-validate="true"]') && (field.required || field.pattern || field.minLength > -1 || field.type === 'email') && field.checkValidity()) {
             clearError(field); 
        }
    });
    
     document.addEventListener('change', (event) => {
        const field = event.target;
        if (field && field.closest('form[data-validate="true"]') && field.tagName === 'SELECT' && field.checkValidity()) {
             clearError(field);
        }
    });

}); 