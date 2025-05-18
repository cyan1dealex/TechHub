import product from "../products.js";
import { addStylesForButton } from "./addStylesForButton.js";
import { availibilityIndicator } from "./indicator.js";

const cartData = () => {
    const productList = document.getElementById('productContainer');
    const cart = document.getElementById('cart');
    const cartList = document.getElementById('cartOrderList');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartOrder = document.getElementById('cartOrder');

    if (!localStorage.productsInCart) {
        localStorage.setItem('productsInCart', JSON.stringify([]))
    }
    
    let productsInLocalStorage = localStorage.productsInCart ? JSON.parse(localStorage.productsInCart) : []; // Массив для продуктов

    // Проверка состояния корзины
    const toggleCartStatus = () => {
        if (cartList.querySelector(".cart-item")) {
            cartEmpty.classList.remove('is-active');
            cartOrder.classList.add('is-active');
        } else {
            cartEmpty.classList.add('is-active');
            cartOrder.classList.remove('is-active');
        }
    };

    // Счетчики количества товаров
    const updateCartItemCount = () => {
        cart.addEventListener('click', (event) => {
            // Делегирование
            if (!event.target.dataset.action === "plus" || !event.target.dataset.action === "minus") {
                return;
            }

            if (event.target.dataset.action === "plus" || event.target.dataset.action === "minus") {
                const counter = event.target.closest(".counter");
                const currentItems = counter.querySelector("[data-counter]");
                const minusBtn = counter.querySelector('[data-action="minus"]');
                const cartItemId = counter.closest(".cart-item").dataset.id;

                if (event.target.dataset.action === "plus") {
                    currentItems.textContent = ++currentItems.textContent;
                    minusBtn.removeAttribute("disabled");
                    updateLocalStorage({ id: cartItemId, count: parseInt(currentItems.textContent) }, "update");
                    
                } else if (event.target.dataset.action === "minus") {
                    if (parseInt(currentItems.textContent) > 1) {
                        currentItems.textContent = --currentItems.textContent;
                        updateLocalStorage({ id: cartItemId, count: parseInt(currentItems.textContent) }, "update");
                    }
                    if (parseInt(currentItems.textContent) === 1) {
                        minusBtn.setAttribute("disabled", true);
                    }
                }
                calculateTotalPrice();
            }
        });
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
        localStorage.setItem("productsInCart", JSON.stringify(productsInLocalStorage));
        productsInLocalStorage = JSON.parse(localStorage.getItem("productsInCart"));
    };

    // Рендерим товары в корзине из localStorage
    const renderProductCardInCart = () => {
        cartList.innerHTML = ''; // Очистка списка перед рендерингом

        productsInLocalStorage.forEach(element => {
            const li = document.createElement('li');
            li.classList.add('cart__item', 'cart-item');
            li.setAttribute("data-id", element.id);

            li.innerHTML = `
                <span class="close" data-close></span>
                <article class="cart-item__inner">
                    <div class="cart-item__image-container">
                        <img src="${element.image}" alt="Изображение">
                    </div>
                    <div class="cart-item__info">
                        <p class="cart-item__title">${element.title}</p>
                        <a href="page.html?id=${element.id}" class="cart-item__link">Перейти на страницу товара</a>
                        <div class="cart-item__counter counter">
                            <button type="button" class="counter__minus" data-action="minus" disabled>-</button>
                            <div class="counter__current-items" data-counter>${element.count}</div>
                            <button type="button" class="counter__plus" data-action="plus">+</button>
                        </div>
                    </div>
                    <p class="cart-item__price h3" data-price="${element.price}"><span>${element.price}</span></p>
                </article>
            `;
            cartList.append(li);
        });
        toggleCartStatus();
        calculateTotalPrice();
    };

    const getIDfromURL = () => {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    };

    // Добавление товара в корзину
    const addProductToCart = () => {
        document.addEventListener('click', event => {
            if (event.target.closest('[data-cart]')) {
                const card = event.target.closest('.product-card');
                let productInfo = {}

                if (card) {
                    product.forEach((product) => {
                        if (product.id === card.dataset.id) {
                            productInfo = {
                                id: product.id,
                                title: product.title,
                                price: parseFloat(product.prices[0]),
                                image: product.photos[0],
                                totalPrice: parseFloat(product.prices[0]),
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
                                price: parseFloat(product.prices[0]),
                                image: product.photos[0],
                                totalPrice: parseFloat(product.prices[0]),
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
    
                renderProductCardInCart();
                availibilityIndicator('cart', productsInLocalStorage)
                addStylesForButton('cart')
            }
        })
    };

    // Удаление товара из корзины
    const removeProductFromCart = () => {
        cart.addEventListener("click", (event) => {
            if (event.target.hasAttribute("data-close")) {
                const idCartElement = event.target.closest("[data-id]").dataset.id;
                updateLocalStorage({ id: idCartElement }, "remove");
                renderProductCardInCart();
            }
            availibilityIndicator('cart', productsInLocalStorage)
            addStylesForButton('cart')
        });
    };

    // Подсчет стоимости в корзине
    const calculateTotalPrice = () => {
        const cartItems = cartList.querySelectorAll("[data-id]");
        const totalCartPrice = cart.querySelector("[data-cart-price]");
        let totalCartValue = 0;

        cartItems.forEach(element => {
            const itemCount = parseInt(element.querySelector("[data-counter]").textContent);
            const itemPrice = parseFloat(element.querySelector("[data-price]").dataset.price);
            const itemTotalPrice = itemCount * itemPrice;

            element.querySelector("[data-price] span").textContent = itemTotalPrice.toFixed(2);
            totalCartValue += itemTotalPrice;
        });

        totalCartPrice.textContent = totalCartValue.toFixed(2);
    };

    // Инициализация
    availibilityIndicator('cart', productsInLocalStorage)
    updateCartItemCount();
    renderProductCardInCart();
    addProductToCart();
    removeProductFromCart();
    calculateTotalPrice();
};

export {cartData}