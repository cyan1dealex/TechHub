const changeTheme = () => {
    // Инициализация темы
    const currentTheme = localStorage.getItem('theme') || 'light';
    localStorage.setItem('theme', currentTheme); // Всегда записываем тему (упрощает логику)
    document.body.classList.toggle('dark-theme', currentTheme === 'dark');

    // Обработчик клика
    document.addEventListener('click', (event) => {
        if (!event.target.closest('#themeButton')) return;
        
        const newTheme = localStorage.getItem('theme') === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        document.body.classList.toggle('dark-theme', newTheme === 'dark');
    });
}

export { changeTheme }