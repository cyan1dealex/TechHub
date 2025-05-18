import { rating } from "./rating";

const renderProductCard = ({id, title, main, screen, processorAndMemory, mainCamera, rate, photos, prices}) => {
    const productList = document.querySelector('#productContainer')
    const li = document.createElement('li');
    li.classList.add('products__item');

        li.innerHTML = `
            <article class="product-card" data-id="${id}">
                <div class="product-card__image-body" data-galery>
                    <div class="product-card__image-container" data-image-container>
                        <a href="page.html?id=${id}" class="product-card__image" data-image>
                            <img src="${photos[0]}"
                                alt="Product Card Image" 
                            >
                        </a>
                        <a href="page.html?id=${id}" class="product-card__image" data-image>
                            <img src="${photos[1]}"
                                alt="Product Card Image" 
                            >
                        </a>
                        <a href="page.html?id=${id}" class="product-card__image" data-image>
                            <img src="${photos[2]}"
                                alt="Product Card Image" 
                            >
                        </a>
                        <a href="page.html?id=${id}" class="product-card__image" data-image>
                            <img src="${photos[3]}"
                                alt="Product Card Image"
                            >
                        </a>
                    </div>
                    <div class="product-card__image-pagination" data-image-pagination>
                        <span class="is-active"></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div class="product-card__container">
                    <div class="product-card__info">
                        <a href="page.html?id=${id}" class="product-card__title h4">${title}</a>
                        <p class="product-card__availability">В наличии</p>
                        <ul class="product-card__description-list">
                            <li class="product-card__description-item">
                                <p><span>Экран:</span>  ${screen.screenDiagonal} " ${screen.screenResolution} пикселей,  ${screen.screenTechnology} , ${screen.screenRefreshRate} Гц</p>
                            </li>
                            <li class="product-card__description-item">
                                <p><span>Процессор:</span>   ${processorAndMemory.cpu} , ${processorAndMemory.cores} ядр., ${processorAndMemory.frequency} ГГц</p>
                            </li>
                            <li class="product-card__description-item">
                                <p><span>Память:</span>  ОЗУ ${processorAndMemory.ram} , ${processorAndMemory.rom} ГБ</p>
                            </li>
                            <li class="product-card__description-item">
                                <p><span>Поддержка eSIM:</span>  ${main.esim}</p>
                            </li>
                            <li class="product-card__description-item">
                                <p><span>Разрешение основного модуля камеры:</span>  ${mainCamera.mainCameraResolution} Мп</p>
                            </li>
                        </ul>
                        ${rating(rate)}
                    </div>
                    <div class="product-card__purchase">
                        <p class="product-card__price">${prices[0]}</p>
                        <button class="product-card__add-to-cart-button add-to-cart-button" data-cart>
                            <span>В корзину</span>
                        </button>

                        <div class="product-card__nav">
                            <button class="product-card__comparison-button comparison-button" data-compare-button>
                                <img src="/icons/compare.svg" alt="Compare button" width="38" height="38">
                            </button>
                            <button class="product-card__favourites-button favourites-button" data-favourites-button>
                                <img src="/icons/favourites.svg" alt="Favourites button" width="38" height="38">
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        `;

    return li;
};

const appendProductCard = (product, container) => {
    container.append(product);
}

const renderProductCards = (products, container) => {
    const productsEmptyList = document.querySelector("[data-products-empty]");
    if (products.length != 0) {
        productsEmptyList.classList.remove('is-active');

        products.forEach((product) => {
            const card = renderProductCard(product);
    
            appendProductCard(card, container);
        });
    } else {
        productsEmptyList.classList.add('is-active');
    }
};

export {
    renderProductCards
};