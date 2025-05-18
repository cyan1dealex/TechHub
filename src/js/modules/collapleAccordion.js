const collapseAccordion = () => {
    const contents = document.querySelectorAll('[data-collapse-content]');

    contents.forEach(element => {
        if (element.parentElement.hasAttribute('data-collapse') && element.parentElement.getAttribute('data-collapse') === 'close') {
            element.style.height = 0;
        }
    })

    document.addEventListener('click', (event) => {
        if (!event.target.closest('[data-collapse-heading]')) return; // Игнорируем клики вне заголовков

        const element = event.target.closest('[data-collapse-heading]').parentElement; // Найти родительский элемент
        const content = element.lastElementChild; // Содержимое аккордеона
        const isOpen = element.dataset.collapse === 'open';

        if (isOpen) {
            // Закрываем
            content.style.transition = 'none';
            content.style.height = content.scrollHeight + 'px';

            requestAnimationFrame(() => {
                content.style.transition = 'height 0.3s ease';
                content.style.height = '0';
            });

            element.dataset.collapse = 'close';
        } else {
            // Открываем
            content.style.transition = 'none';
            content.style.height = '0';
            
            requestAnimationFrame(() => {
                content.style.height = content.scrollHeight + 'px';
                content.style.transition = 'height 0.3s ease';
            });
            
            element.dataset.collapse = 'open';
        }
    });
};

export { collapseAccordion }