const rating = (rate) => {
    let starsHtml = '';
    const maxStars = 5; // Максимальное количество звезд
    const fullStars = Math.floor(rate); // Целая часть оценки
    const hasHalfStar = rate % 1 >= 0.5; // Есть ли половинка звезды
    
    // Создаем полные звезды
    for (let i = 1; i <= fullStars; i++) {
        starsHtml += '<span class="active"></span>';
    }
    
    // Добавляем половинку звезды если нужно
    if (hasHalfStar && fullStars < maxStars) {
        starsHtml += '<span class="half"></span>';
    }
    
    // Добавляем оставшиеся пустые звезды
    const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 1; i <= emptyStars; i++) {
        starsHtml += '<span></span>';
    }
    
    return `
        <div class="rating">
            <div class="rating__stars">
                ${starsHtml}
            </div>
            <p class="rating__num">${rate}</p>
        </div>
    `;
};

export { rating }