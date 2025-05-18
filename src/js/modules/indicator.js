const availibilityIndicator = (type, products) => {
    let indicator;

    const currentItemsInCart = (indicatorElement) => {
        let currentItems = 0;

        products.forEach(element => {
            currentItems += element.count;
        })
    
        if (currentItems != 0) {
            indicatorElement.classList.remove("visually-hidden")
            indicatorElement.textContent = currentItems;
        } else {
            indicatorElement.classList.add("visually-hidden")
            indicatorElement.textContent = currentItems;
        }
    }

    const compareAvailibilityIndicator = (indicatorElement) => {
        if (products.length !== 0) {
            indicatorElement.classList.remove("visually-hidden")
        } else {
            indicatorElement.classList.add("visually-hidden")
        }
    }

    const favouritesAvailibilityIndicator = (indicatorElement) => {
        if (products.length !== 0) {
            indicatorElement.classList.remove("visually-hidden")
        } else {
            indicatorElement.classList.add("visually-hidden")
        }
    }

    switch (type) {
        case 'cart':
            indicator = document.querySelector("[data-current-items-cart]");
            currentItemsInCart(indicator)
            break;
        case 'compare':
            indicator = document.querySelector("[data-current-items-compare]");
            compareAvailibilityIndicator(indicator)
            break;
        case 'favourites':
            indicator = document.querySelector("[data-current-items-favourites]");
            favouritesAvailibilityIndicator(indicator)
            break;
    }
}

export { availibilityIndicator }