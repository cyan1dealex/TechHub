const addStylesForButton = (typeButton) => {
    let buttons;
    let storageKey;

    switch (typeButton) {
        case 'cart':
            buttons = document.querySelectorAll('[data-cart]');
            storageKey = 'productsInCart'
            break;
        case 'compare':
            buttons = document.querySelectorAll('[data-compare-button]');
            storageKey = 'productsForCompare'
            break;
        case 'favourites':
            buttons = document.querySelectorAll('[data-favourites-button]');
            storageKey = 'productsInFavourites'
            break;
    }

    // Получаем данные из localStorage
    const storedItems = JSON.parse(localStorage.getItem(storageKey)) || [];

    const getIDfromURL = () => {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    };

    buttons.forEach(button => {
        const closestElement = button.closest('[data-id]');
        let productId = closestElement ? closestElement.dataset.id : getIDfromURL();

        const isProductInStorage = storedItems.some(item => item.id === productId);

        button.classList.toggle('disabled', isProductInStorage);
        
        if (typeButton === 'cart') {
            const span = button.querySelector('span');
            if (span) {
                span.textContent = isProductInStorage ? 'Добавлено' : 'В корзину';
            }
        }
    });
};

export { addStylesForButton };