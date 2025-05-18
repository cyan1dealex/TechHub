const changeGrid = (productCount) => {
    const changeGridButton = document.querySelector("[data-change-grid]");
    const productContainer = document.getElementById("productContainer");

    // Функция для применения сетки с учетом ширины экрана и localStorage
    const applyGridLayout = () => {
        const isLargeScreen = window.innerWidth > 1024;
        
        if (isLargeScreen) {
            // На больших экранах учитываем localStorage
            const savedGrid = localStorage.getItem('grid') || 'grid-by-lines';
            const isCells = savedGrid === 'grid-by-cells';
            
            productContainer.classList.toggle('grid-by-cells', isCells);
            changeGridButton.classList.toggle('is-active', isCells);
        } else {
            // На мобильных всегда cells
            productContainer.classList.add("grid-by-cells");
            changeGridButton.classList.add("is-active");
        }
    };

    // Применяем сетку сразу при загрузке
    applyGridLayout();

    changeGridButton.addEventListener("click", () => {
        // Изменяем сетку только на больших экранах
        if (window.innerWidth > 1024) {
            const isCells = productContainer.classList.toggle("grid-by-cells");
            changeGridButton.classList.toggle("is-active");
            
            // Сохраняем текущее состояние
            localStorage.setItem('grid', isCells ? 'grid-by-cells' : 'grid-by-lines');
        }
    });

    window.addEventListener('resize', applyGridLayout);
}

export {changeGrid}