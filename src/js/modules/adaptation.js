import { filters } from "../filters";

const adaptation = () => {
    // Получаем элементы
    const desktopFiltersContainer = document.querySelector('[data-filters]');
    const mobileFiltersContainer = document.querySelector('[data-mobile-filter-container]');
    
    // Десктопные элементы кнопок
    const desktopCartButtonElement = document.getElementById('cartButton');
    const desktopFavouritesButtonElement = document.getElementById('favouritesButton');
    const desktopCompareButtonElement = document.getElementById('compareButton');
    const desktopThemeButtonElement = document.getElementById('themeButton');
    
    // Мобильные контейнеры для кнопок
    const mobileCartButtonContainer = document.querySelector('[data-mobile-cart-button-container]');
    const mobileFavouritesButtonContainer = document.querySelector('[data-mobile-favourites-button-container]');
    const mobileCompareButtonContainer = document.querySelector('[data-mobile-compare-button-container]');
    const mobileThemeButtonContainer = document.querySelector('[data-mobile-theme-button-container]');

    // Сохраняем оригинальные родительские элементы и позиции
    let originalFilterParent = desktopFiltersContainer?.parentNode;
    let originalCartButtonParent = desktopCartButtonElement?.parentNode;
    let originalFavouritesButtonParent = desktopFavouritesButtonElement?.parentNode;
    let originalCompareButtonParent = desktopCompareButtonElement?.parentNode;
    let originalThemeButtonParent = desktopThemeButtonElement?.parentNode;

    // Сохраняем соседние элементы для правильного возврата на место
    let filterNextSibling = desktopFiltersContainer?.nextElementSibling;
    let cartButtonNextSibling = desktopCartButtonElement?.nextElementSibling;
    let favouritesButtonNextSibling = desktopFavouritesButtonElement?.nextElementSibling;
    let compareButtonNextSibling = desktopCompareButtonElement?.nextElementSibling;
    let themeButtonNextSibling = desktopThemeButtonElement?.nextElementSibling;

    function moveElementsToMobile() {
        // Перемещаем фильтры
        if (desktopFiltersContainer && mobileFiltersContainer) {
            mobileFiltersContainer.innerHTML = '';
            mobileFiltersContainer.appendChild(desktopFiltersContainer);
            desktopFiltersContainer.classList.add('filters--moved');
            desktopFiltersContainer.classList.remove('shop__filters');
        }
        
        // Перемещаем кнопки
        if (desktopCartButtonElement && mobileCartButtonContainer) {
            mobileCartButtonContainer.innerHTML = '';
            mobileCartButtonContainer.appendChild(desktopCartButtonElement);
            desktopCartButtonElement.classList.add('button-moved');
        }
        
        if (desktopFavouritesButtonElement && mobileFavouritesButtonContainer) {
            mobileFavouritesButtonContainer.innerHTML = '';
            mobileFavouritesButtonContainer.appendChild(desktopFavouritesButtonElement);
            desktopFavouritesButtonElement.classList.add('button-moved');
        }
        
        if (desktopCompareButtonElement && mobileCompareButtonContainer) {
            mobileCompareButtonContainer.innerHTML = '';
            mobileCompareButtonContainer.appendChild(desktopCompareButtonElement);
            desktopCompareButtonElement.classList.add('button-moved');
        }
        
        if (desktopThemeButtonElement && mobileThemeButtonContainer) {
            mobileThemeButtonContainer.innerHTML = '';
            mobileThemeButtonContainer.appendChild(desktopThemeButtonElement);
            desktopThemeButtonElement.classList.add('button-moved');
        }
    }

    function moveElementsToDesktop() {
        // Возвращаем фильтры в начало оригинального контейнера
        if (desktopFiltersContainer && originalFilterParent) {
            if (filterNextSibling) {
                originalFilterParent.insertBefore(desktopFiltersContainer, filterNextSibling);
            } else {
                originalFilterParent.appendChild(desktopFiltersContainer);
            }
            desktopFiltersContainer.classList.remove('filters--moved');
            desktopFiltersContainer.classList.add('shop__filters');
        }
        
        // Возвращаем кнопки на их оригинальные позиции
        if (desktopCartButtonElement && originalCartButtonParent) {
            if (cartButtonNextSibling) {
                originalCartButtonParent.insertBefore(desktopCartButtonElement, cartButtonNextSibling);
            } else {
                originalCartButtonParent.appendChild(desktopCartButtonElement);
            }
            desktopCartButtonElement.classList.remove('button-moved');
        }
        
        if (desktopFavouritesButtonElement && originalFavouritesButtonParent) {
            if (favouritesButtonNextSibling) {
                originalFavouritesButtonParent.insertBefore(desktopFavouritesButtonElement, favouritesButtonNextSibling);
            } else {
                originalFavouritesButtonParent.appendChild(desktopFavouritesButtonElement);
            }
            desktopFavouritesButtonElement.classList.remove('button-moved');
        }
        
        if (desktopCompareButtonElement && originalCompareButtonParent) {
            if (compareButtonNextSibling) {
                originalCompareButtonParent.insertBefore(desktopCompareButtonElement, compareButtonNextSibling);
            } else {
                originalCompareButtonParent.appendChild(desktopCompareButtonElement);
            }
            desktopCompareButtonElement.classList.remove('button-moved');
        }
        
        if (desktopThemeButtonElement && originalThemeButtonParent) {
            if (themeButtonNextSibling) {
                originalThemeButtonParent.insertBefore(desktopThemeButtonElement, themeButtonNextSibling);
            } else {
                originalThemeButtonParent.appendChild(desktopThemeButtonElement);
            }
            desktopThemeButtonElement.classList.remove('button-moved');
        }
    }

    function checkScreenWidth() {
        if (window.innerWidth <= 1300) {
            moveElementsToMobile();
        } else {
            moveElementsToDesktop();
        }
    }

    // Инициализация при загрузке
    checkScreenWidth()

    // Следим за изменением размера окна
    window.addEventListener('resize', checkScreenWidth);
}

export { adaptation };