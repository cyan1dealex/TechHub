const preloader = () => {
    const preloaderElement = document.querySelector('.preloader')

    document.body.classList.add('is-loading');
    document.body.style.overflow = 'hidden'
    
    // Через заданное время (например, 1.2s, как в вашем CSS) удаляем класс
    setTimeout(() => {
        document.body.classList.remove('is-loading');
        document.body.style.overflow = ''
        preloaderElement.style.display = 'none'
    }, 3000);
};

export { preloader }