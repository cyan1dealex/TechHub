import product from "../products.js";
import { addStylesForButton } from "./addStylesForButton.js";
import { availibilityIndicator } from "./indicator.js";

const favouritesData = () => {
    const productList = document.getElementById('productContainer');
    const favourites = document.getElementById('favourites');
    const favouritesList = document.getElementById('favouritesOrderList');
    const favouritesEmpty = document.getElementById('favouritesEmpty');
    const favouritesOrder = document.getElementById('favouritesOrder');

    if (!localStorage.productsInFavourites) {
        localStorage.setItem('productsInFavourites', JSON.stringify([]))
    }
    
    let productsInLocalStorage = localStorage.productsInFavourites ? JSON.parse(localStorage.productsInFavourites) : []; // Массив для продуктов

    // Проверка состояния избранного
    const toggleFavouritesStatus = () => {
        if (favouritesList.querySelector(".favourites-item")) {
            favouritesEmpty.classList.remove('is-active');
            favouritesOrder.classList.add('is-active');
        } else {
            favouritesEmpty.classList.add('is-active');
            favouritesOrder.classList.remove('is-active');
        }
    };

    // Добавляем товары в localStorage
    const updateLocalStorage = (productInfo, action) => {
        if (action === "add") {
            productsInLocalStorage.push(productInfo);
        } else if (action === "remove") {
            productsInLocalStorage = productsInLocalStorage.filter(product => product.id !== productInfo.id);
            // console.log(products)
        } else if (action === "update") {
            const product = productsInLocalStorage.find(product => product.id === productInfo.id);
            // console.log(productInfo)
            if (product) {
                product.count = productInfo.count; // Обновляем количество
            }   
        }
        localStorage.setItem("productsInFavourites", JSON.stringify(productsInLocalStorage));
        productsInLocalStorage = JSON.parse(localStorage.getItem("productsInFavourites"));
    };

    // Рендерим товары в избранное из localStorage
    const renderProductCardInFavourites = () => {
        favouritesList.innerHTML = ''; // Очистка списка перед рендерингом

        productsInLocalStorage.forEach(element => {
            const li = document.createElement('li');
            li.classList.add('favourites__item', 'favourites-item');
            li.setAttribute("data-id", element.id);

            li.innerHTML = `
                <span class="close" data-close></span>
                <article class="favourites-item__inner">
                    <div class="favourites-item__image-container">
                        <img src="${element.image}" alt="Изображение">
                    </div>
                    <div class="favourites-item__info">
                        <p class="favourites-item__title">${element.title}</p>
                        <a href="page.html?id=${element.id}" class="favourites-item__link">Перейти на страницу товара</a>

                        <div class="favourites-item__nav-buttons">
                            <button class="favourites-item__comparison-button comparison-button" data-compare-button>
                                <img src="/icons/compare.svg" alt="Compare button" width="38" height="38">
                            </button>
                        </div>
                    </div>
                    <p class="favourites-item__price h3" data-price="${element.price}"><span>${element.price}</span></p>
                </article>
            `;
            favouritesList.append(li);
        });
        toggleFavouritesStatus();
    };

    const getIDfromURL = () => {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    };

    // Добавление товара в избранное
    const addProductToFavourites = () => {
        document.addEventListener('click', event => {
            if (event.target.closest('[data-favourites-button]')) {
                const card = event.target.closest('.product-card');
                let productInfo = {}

                if (card) {
                    product.forEach((product) => {
                        if (product.id === card.dataset.id) {
                            productInfo = {
                                id: product.id,
                                title: product.title,
                                price: parseFloat(product.prices[0]).toFixed(2),
                                image: product.photos[0],
                                count: 1
                            };
                        }
                    })
                } else {
                    let id = getIDfromURL();
                    product.forEach((product) => {
                        if (product.id === id) {
                            productInfo = {
                                id: product.id,
                                title: product.title,
                                price: parseFloat(product.prices[0]).toFixed(2),
                                image: product.photos[0],
                                count: 1
                            };
                        }
                    })
                }
                
                if (!event.target.classList.contains("disabled")) {
                    updateLocalStorage(productInfo, "add");
                } else {
                    updateLocalStorage(productInfo, "remove");
                }
    
                renderProductCardInFavourites();
                availibilityIndicator('favourites', productsInLocalStorage)
                addStylesForButton('favourites')
            }
        })
    };

    // Удаление товара из избранного
    const removeProductFromFavourites = () => {
        favourites.addEventListener("click", (event) => {
            if (event.target.hasAttribute("data-close")) {
                const idFavouritesElement = event.target.closest("[data-id]").dataset.id;
                updateLocalStorage({ id: idFavouritesElement }, "remove");
                renderProductCardInFavourites();
            }
            availibilityIndicator('favourites', productsInLocalStorage)
            addStylesForButton('favourites')
        });
    };

    // Инициализация
    availibilityIndicator('favourites', productsInLocalStorage)
    addStylesForButton('favourites')
    toggleFavouritesStatus()
    renderProductCardInFavourites();
    addProductToFavourites();
    removeProductFromFavourites();
};

export {favouritesData}