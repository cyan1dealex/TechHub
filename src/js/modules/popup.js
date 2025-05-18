// Модальное окно корзины

const openCart = () => {
    const overlay = document.querySelector("[data-overlay]");
    const openCartElement = document.getElementById("cartButton");
    const cart = document.getElementById('cart');
    
    openCartElement.addEventListener("click", () => {
        document.body.style.overflow = "hidden";
        cart.classList.add("is-active");
        overlay.classList.add("is-active");
    });
}

const closeCart = () => {
    const closeElements = document.querySelectorAll("[data-close-button]");
    const overlay = document.querySelector("[data-overlay]");
    const cart = document.getElementById('cart');

    closeElements.forEach(element => {
        element.addEventListener("click", () => {
            document.body.style.overflow = "";
            cart.classList.remove("is-active");
            overlay.classList.remove("is-active");
        });
    })
}

// Модальное окно сравнения

const openCompare = () => {
    const closeElement = document.querySelector("[data-overlay]");
    const compare = document.querySelector('[data-compare]');
    const openCompareElement = document.getElementById("compareButton");
    const compareInner = document.querySelector('[data-compare-inner]');

    openCompareElement.addEventListener("click", () => {
        if (JSON.parse(localStorage.productsForCompare).length !== 0) {
            document.body.style.overflow = "hidden";
            compare.classList.add("is-active");
            compareInner.classList.add("is-active");
            closeElement.classList.add("is-active");
        } else {
            compare.classList.add("is-active");
            closeElement.classList.add("is-active");
        }
    });
}

const closeCompare = () => {
    const compare = document.querySelector('[data-compare]');
    const compareInner = document.querySelector('[data-compare-inner]');
    const overlay = document.querySelector("[data-overlay]");
    const closeElements = document.querySelectorAll("[data-close-button]");

    closeElements.forEach(element => {
        element.addEventListener("click", () => {
            document.body.style.overflow = "";
            compare.classList.remove("is-active");
            compareInner.classList.remove("is-active");
            overlay.classList.remove("is-active");
        });
    })
}

// Модальное окно избранного

const openFavourites = () => {
    const overlay = document.querySelector("[data-overlay]");
    const openFavouritesElement = document.getElementById("favouritesButton");
    const favourites = document.getElementById('favourites');
    
    openFavouritesElement.addEventListener("click", () => {
        document.body.style.overflow = "hidden";
        favourites.classList.add("is-active");
        overlay.classList.add("is-active");
    });
}

const closeFavourites = () => {
    const closeElements = document.querySelectorAll("[data-close-button]");
    const overlay = document.querySelector("[data-overlay]");
    const favourites = document.getElementById('favourites');

    closeElements.forEach(element => {
        element.addEventListener("click", () => {
            document.body.style.overflow = "";
            favourites.classList.remove("is-active");
            overlay.classList.remove("is-active");
        });
    })
}

// Модальное окно меню

const openMenu = () => {
    const closeElement = document.querySelector("[data-close-menu-button]");
    const openCartElement = document.querySelector("[data-open-menu-button]");
    const mobileOverlay = document.querySelector('[data-mobile-overlay]');
    
    openCartElement.addEventListener("click", () => {
        document.body.style.overflow = "hidden";
        mobileOverlay.classList.add("is-active");
        closeElement.classList.add("is-active");
    });
}

const closeMenu = () => {
    const closeElement = document.querySelector("[data-close-menu-button]");
    const mobileOverlay = document.querySelector('[data-mobile-overlay]');

    closeElement.addEventListener("click", () => {
        document.body.style.overflow = "";
        mobileOverlay.classList.remove("is-active");
        closeElement.classList.remove("is-active");
    });
}

export {
    openCart,
    closeCart,
    openCompare,
    closeCompare,
    openFavourites,
    closeFavourites,
    openMenu,
    closeMenu
}