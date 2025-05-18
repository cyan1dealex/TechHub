import product from "../products";
import { rating } from "./rating";

const renderPage = () => {
    const getProductIdFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    };

    const getProductDetails = () => {
        let id = getProductIdFromUrl()

        let productDetails = product.find(element => element.id === id)

        return productDetails
    }

    const renderDetails = ({id, title, main, screen, processorAndMemory, mainCamera, rate, prices, photos}) => {
        document.title = title;

        document.body.innerHTML = 
        `
            <div class="preloader"></div>
            <header class="header-page">
                <div class="header-page__inner container">
                    <a href="/" class="header-page__logo logo">
                        <img src="/public/icons/logo.svg" alt="Logo image">
                    </a>
                    <nav class="header-page__nav navigation" data-navigation>
                        <button class="header-page__nav-button theme-button" id="themeButton">
                        </button>
                        
                        <button class="header-page__nav-button compare-button" id="compareButton">
                            <img src="/public/icons/compare.svg" alt="Кнопка открытия сравнения товаров">
                            <span class="compare-button__current-items visually-hidden" data-current-items-compare></span>
                        </button>
                        
                        <button class="header-page__nav-button favourite-button" id="favouritesButton">
                            <img src="/public/icons/favourites.svg" alt="Кнопка открытия избранных товаров">
                            <span class="favourite-button__current-items visually-hidden" data-current-items-favourites></span>
                        </button>
            
                        <button class="header-page__nav-button cart-button" id="cartButton">
                            <img src="/public/icons/cart.svg" alt="Кнопка открытия корзины товаров">
                            <span class="cart-button__current-items visually-hidden" data-current-items-cart></span>
                        </button>
                    </nav>
                    <button class="header-page__burger-button burger-button" type="button" data-open-menu-button>
                        <span class="visually-hidden">Open navigation menu</span>
                    </button>
                </div>
            </header>
            <main class="content-page">
                <div class="cart" id="cart">
                    <span class="cart__close close close--huge" data-close-button></span>

                    <div class="cart__empty" id="cartEmpty">
                        <div class="empty">
                            <p class="empty__title">Ваша корзина пустая</p>
                            <img class="empty__image" src="/public/gif/icons8-empty-cart.gif" alt="List is empty">
                        </div>
                    </div>

                    <div class="cart__inner" id="cartOrder">
                        <p class="cart__title">Корзина</p>
                        <form action="server.php" method="post" class="cart__order-container">
                            <ul class="cart__list" id="cartOrderList">
                                
                            </ul>
                            <div class="cart__total">
                                <p class="cart__total-title">
                                    Итого: <span class="h3" data-cart-price></span>
                                </p>
                                <button type="submit" class="cart__order-button order-button">
                                    <span>Оформить заказ</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="compare"  data-compare>     
                    <span class="compare__close close close--huge" data-close-button></span>

                    <div class="compare__empty" data-compare-empty>
                        <div class="empty">
                            <p class="empty__title">Добавьте товары в сравнение</p>
                            <img class="empty__image" src="/public/gif/icons8-list-is-empty.gif" alt="List is empty">
                        </div>
                    </div>
                    
                    <div class="compare__inner"  data-compare-inner>
                        <p class="compare__title">Сравнение товаров</p>
                        <div class="compare__section">
                            
                            <div class="compare__main swiper">
                                <div class="compare__list swiper-wrapper" data-compare-list>
                                    
                                </div>
                                <div class="swiper-button-prev"></div>
                                <div class="swiper-button-next"></div>
                            </div>
                            
                        </div>
                        <div class="compare__info-inner" data-compare-info>
                            
                        </div>
                    </div>
                </div>
                <div class="favourites" id="favourites">
                    <span class="favourites__close close close--huge" data-close-button></span>
                    
                    <div class="favourites__empty" id="favouritesEmpty">
                        <div class="empty">
                            <p class="empty__title">В списке избранного ничего нет</p>
                            <img class="empty__image" src="/public/gif/icons8-heart.gif" alt="List is empty">
                        </div>
                    </div>

                    <div class="favourites__inner" id="favouritesOrder">
                        <p class="favourites__title">Избранное</p>
                        <div class="favourites__order-container">
                            <ul class="favourites__list" id="favouritesOrderList">
                                
                            </ul>
                        </div>
                    </div>
                </div>
                <span class="overlay" data-close-button data-overlay></span>

                <section class="product-page">
                    <div class="product-page__inner container">
                        <div class="product-page__main">
                            <div class="product-page__gallery gallery">
                                <div class="gallery__inner">
                                    <a href="${photos[0]}"
                                        class="gallery__main-image-container"
                                        data-pswp-width=""
                                        data-pswp-height=""
                                        >
                                        <img src="${photos[0]}" alt="Image 1">
                                    </a>
                                    <div class="gallery__mini-row">
                                        <a href="${photos[1]}"
                                            class="gallery__mini-row-image-container"
                                            data-pswp-width=""
                                            data-pswp-height=""
                                        >
                                            <img src="${photos[1]}" alt="Image 2">
                                        </a>
                                        <a href="${photos[2]}"
                                            class="gallery__mini-row-image-container"
                                            data-pswp-width=""
                                            data-pswp-height=""
                                        >
                                            <img src="${photos[2]}" alt="Image 3">
                                        </a>
                                        <a href="${photos[3]}"
                                            class="gallery__mini-row-image-container"
                                            data-pswp-width=""
                                            data-pswp-height=""
                                        >
                                            <img src="${photos[3]}" alt="Image 4">
                                        </a>
                                        <a href="${photos[3]}"
                                            class="gallery__mini-row-image-container"
                                            data-pswp-width=""
                                            data-pswp-height=""
                                        >
                                            <img src="${photos[3]}" alt="Image 4">
                                        </a>

                                    </div>
                                </div>
                            </div>
                            <div class="product-page__info">
                                <div class="product-page__info-container">
                                    <h2 class="product-page__title h3">${title}</h2>
                                    <ul class="product-page__info-list">
                                        <li class="product-page__info-item">
                                            <p><span>Экран:</span>  ${screen.screenDiagonal} " ${screen.screenResolution} пикселей,  ${screen.screenTechnology} , ${screen.frequency} Гц</p>
                                        </li>
                                        <li class="product-page__info-item">
                                            <p><span>Процессор:</span>${processorAndMemory.cpu} , ${processorAndMemory.cores} ядр., ${processorAndMemory.frequency} ГГц</p>
                                        </li>
                                        <li class="product-page__info-item">
                                            <p><span>Память:</span>  ОЗУ ${processorAndMemory.ram} , ${processorAndMemory.rom} ГБ</p>
                                        </li>
                                        <li class="product-page__info-item">
                                            <p><span>Поддержка eSIM:</span>  ${main.esim}</p>
                                        </li>
                                        <li class="product-page__info-item">
                                            <p><span>Разрешение основного модуля камеры:</span>  ${mainCamera.mainCameraResolution} Мп</p>
                                        </li>
                                    </ul>
                                    ${ rating(rate) }
                                </div>
                                <div class="product-page__nav">
                                    <p class="product-page__price">${prices[0]}</p>
                                    <button class="product-page__add-to-cart-button add-to-cart-button" data-cart>
                                        <span>В корзину</span>
                                    </button>

                                    <div class="product-page__nav-buttons">
                                        <button class="product-page__comparison-button comparison-button" data-compare-button>
                                            <img src="/public/icons/compare.svg" alt="Compare button" width="38" height="38">
                                        </button>
                                        <button class="product-page__favourites-button favourites-button" data-favourites-button>
                                            <img src="/public/icons/favourites.svg" alt="Favourites button" width="38" height="38">
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="product-page__tabs tabs">
                            <div class="tabs__nav">
                                <button class="tabs__nav-button is-active" type="button" data-tab="about">О товаре</button>
                                <button class="tabs__nav-button" type="button" data-tab="specifications">Характеристики</button>
                                <button class="tabs__nav-button" type="button" data-tab="reviews">Отзывы</button>
                            </div>
                            <div class="tabs__content">
                                <div class="tabs__item is-active" data-content="about">
                                    <div class="tabs__slider swiper-about">
                                        <div class="tabs__slider-wrapper swiper-wrapper">
                                            
                                        </div>
                                        <div class="swiper-pagination"></div>
                                    </div>
                                </div>
                                <div class="tabs__item" data-content="specifications">
                                    <div class="specifications" data-specifications>
                                    </div>
                                </div>
                                <div class="tabs__item" data-content="reviews">
                                    <div class="tabs__review-slider swiper-review">
                                        <div class="tabs__review-slider-wrapper swiper-wrapper">
                                            
                                        </div>

                                        <div class="swiper-review-pagination"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer class="footer">
                <div class="footer__hero">
                    <div class="footer__hero-inner container">
                        <a href="/" class="footer__logo logo">
                            <img src="/public/icons/logo.svg" alt="Logo image">
                        </a>
                        <ul class="footer__soc1als-list soc1als">
                            <li class="soc1als__item">
                                <a href="" class="soc1als__link">
                                    <img src="/public/icons/icons8-youtube.svg" alt="Facebook">
                                </a>
                            </li>
                            <li class="soc1als__item">
                                <a href="" class="soc1als__link">
                                    <img src="/public/icons/icons8-vk-circled.svg" alt="Facebook">
                                </a>
                            </li>
                            <li class="soc1als__item">
                                <a href="" class="soc1als__link">
                                    <img src="/public/icons/icons8-twitter-circled.svg" alt="Facebook">
                                </a>
                            </li>
                            <li class="soc1als__item">
                                <a href="" class="soc1als__link">
                                    <img src="/public/icons/icons8-facebook-circled.svg" alt="Facebook">
                                </a>
                            </li>
                            <li class="soc1als__item">
                                <a href="" class="soc1als__link">
                                    <img src="/public/icons/icons8-github.svg" alt="Facebook">
                                </a>
                            </li>
                            <li class="soc1als__item">
                                <a href="" class="soc1als__link">
                                    <img src="/public/icons/icons8-instagram.svg" alt="Facebook">
                                </a>
                            </li>
                        </ul>
                        <form action="" class="footer__contact-us contact-us">
                            <label class="contact-us__title" for="email">Подписка на акции</label>
                            <div class="contact-us__input-block">
                                <input placeholder="Электронная почта" id="email" type="email" class="contact-us__input">
                                <button type="submit" class="contact-us__button">
                                    <span>Подписаться</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="footer__main">
                    <div class="footer__main-inner container">
                        <nav class="footer__menu">
                            <div class="footer__menu-column">
                                <a href="/" class="footer__menu-main-link">Компания</a>
                                <ul class="footer__menu-list">
                                    <li class="footer__menu-item">
                                        <a href="/" class="footer__menu-link">О компании</a>
                                    </li>
                                    <li class="footer__menu-item">
                                        <a href="/" class="footer__menu-link">Новости</a>
                                    </li>
                                    <li class="footer__menu-item">
                                        <a href="/" class="footer__menu-link">Контакты</a>
                                    </li>
                                    <li class="footer__menu-item">
                                        <a href="/" class="footer__menu-link">Отзывы</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="footer__menu-column">
                                <a href="/" class="footer__menu-main-link">Покупателям</a>
                                <ul class="footer__menu-list">
                                    <li class="footer__menu-item">
                                        <a href="/" class="footer__menu-link">Как сделать заказ</a>
                                    </li>
                                    <li class="footer__menu-item">
                                        <a href="/" class="footer__menu-link">Доставка и оплата</a>
                                    </li>
                                    <li class="footer__menu-item">
                                        <a href="/" class="footer__menu-link">Кредит и рассрочка</a>
                                    </li>
                                    <li class="footer__menu-item">
                                        <a href="/" class="footer__menu-link">Гарантия</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="footer__menu-column">
                                <a href="/" class="footer__menu-main-link">Помощь</a>
                                <ul class="footer__menu-list">
                                    <li class="footer__menu-item">
                                        <a href="/" class="footer__menu-link">FAQ</a>
                                    </li>
                                    <li class="footer__menu-item">
                                        <a href="/" class="footer__menu-link">Как выбрать смартфон</a>
                                    </li>
                                    <li class="footer__menu-item">
                                        <a href="/" class="footer__menu-link">Сравнение моделей</a>
                                    </li>
                                    <li class="footer__menu-item">
                                        <a href="/" class="footer__menu-link">Тех. поддержка</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="footer__menu-column">
                                <a href="/" class="footer__menu-main-link">Контакты</a>
                                <ul class="footer__menu-list">
                                    <li class="footer__menu-item">
                                        <a href="tel:375291234567" class="footer__menu-link">+375 (29) 123-45-67</a>
                                    </li>
                                    <li class="footer__menu-item">
                                        <a href="mailto:info@example.com" class="footer__menu-link">info@example.com</a>
                                    </li>
                                    <li class="footer__menu-item">
                                        <a href="/" class="footer__menu-link">г. Гомель, ул. Советская, 102</a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </footer>
            
            <div class="mobile-overlay" data-mobile-overlay>
                <h2 class="mobile-overlay__title">Меню</h2>
                <button class="close close--huge" type="submit" data-close-menu-button>
                    <span class="visually-hidden">Close navigation menu</span>
                </button>
                <ul class="mobile-overlay__list">
                    <li class="mobile-overlay__item">
                        <div class="mobile-overlay__cart" data-mobile-cart-button-container></div>
                    </li>
                    <li class="mobile-overlay__item">
                        <div class="mobile-overlay__favourites" data-mobile-favourites-button-container></div>
                    </li>
                    <li class="mobile-overlay__item">
                        <div class="mobile-overlay__compare" data-mobile-compare-button-container></div>
                    </li>
                    <li class="mobile-overlay__item">
                        <div class="mobile-overlay__theme" data-mobile-theme-button-container></div>
                    </li>
                </ul>
            </div>
        `
    }

    const renderTabs = (product) => {
        const navList = document.querySelectorAll('[data-tab]')
        const contentList = document.querySelectorAll('[data-content]')

        const renameCategory = (key) => {
            switch (key) {
                case 'main': return 'Основные';
                case 'screen': return 'Экран';
                case 'processorAndMemory': return 'Процессор и память';
                case 'mainCamera': return 'Основная камера';
                case 'frontCamera': return 'Фронтальная камера';
                case 'interfaces': return 'Интерфейсы';
                case 'power': return 'Питание';
                case 'sizeWeight': return 'Размеры и вес';
            }
        }

        const renameKey = (key) => {
            switch (key) {
                case 'brand': return 'Бренд';
                case 'releaseDate': return 'Дата релиза';
                case 'OS': return 'Операционная система';
                case 'esim': return 'eSim';
                case 'complectation': return 'Комплектация';
                case 'screenTechnology': return 'Технология экрана';
                case 'aspectRatio': return 'Соотношение сторон экрана';
                case 'screenDiagonal': return 'Диагональ экрана';
                case 'screenResolution': return 'Разрешение экрана';
                case 'screenRefreshRate': return 'Частота обновления экрана ';
                case 'cpu': return 'Процессор';
                case 'cores': return 'Размеры и вес';
                case 'frequency': return 'Количество ядер процессора';
                case 'ram': return 'Объем оперативной памяти';
                case 'rom': return 'Объем встроенной памяти';
                case 'modules': return 'Количество модулей основной камеры';
                case 'mainCameraResolution': return 'Разрешение основного модуля камеры';
                case 'maxResolutionVideo': return 'Максимальное разрешение при записи видео ';
                case 'stabilisation': return 'Стабилизация';
                case 'frontCamera': return 'Фронтальная камера';
                case 'frontCameraResolution': return 'Разрешение основного модуля фронт. камеры ';
                case 'wifi': return 'Wi-Fi';
                case 'bluetooth': return 'Bluetooth';
                case 'audioOutput': return 'Аудиовыход';
                case 'connectionConnector': return 'Разъём подключения';
                case 'batteryСapacity': return 'Емкость аккумулятора';
                case 'fastCharging': return 'Поддержка быстрой зарядки';
                case 'wirelessСharging': return 'Поддержка беспроводной зарядки';
                case 'length': return 'Длина';
                case 'width': return 'Ширина';
                case 'thickness': return 'Толщина';
                case 'weight': return 'Вес';

                default: return key;
            }
        }

        const renderAbout = () => {
            const tabNavAbout = document.querySelector('[data-tab="about"]')
            const tabAboutContent = document.querySelector('[data-content="about"]')
    
            if (product.aboutPhotos.length !== 0) {
                const aboutList = tabAboutContent.querySelector('.tabs__slider-wrapper')

                product.aboutPhotos.forEach(photo => {
                    const li = document.createElement('div')
                    li.classList.add('tabs__slider-slide', 'swiper-slide')

                    li.innerHTML = `
                        <img src="${photo}" alt="About photo">
                    `

                    aboutList.appendChild(li)
                });
            } else {
                tabNavAbout.remove()
                tabAboutContent.remove()
                navList[1].classList.add('is-active')
                contentList[1].classList.add('is-active')
            }
        }

        const renderSpecifications = () => {
            const tabNavSpecifications = document.querySelector('[data-tab="specifications"]')
            const tabContentSpecifications = document.querySelector('[data-content="specifications"]')
    
            const specificationsList = tabContentSpecifications.querySelector('[data-specifications]')

            const groupByCategory = () => {
                let groupedList = []

                Object.entries(product).forEach(([key, value]) => {
                    if (typeof value === 'object' 
                        && key !== 'photos'
                        && key !== 'aboutPhotos' 
                        && key !== 'reviews'
                        && key !== 'prices'
                    ) {
                        groupedList.push({[renameCategory(key)] : value})
                    }
                })
                
                return groupedList
            }

            let specifications = groupByCategory()
            // console.log(specifications)

            const renderSpecificationsInner = (key, value) => {
                // console.log(value)
                const div = document.createElement('div')
                div.classList.add('specifications__inner')

                div.innerHTML = `
                    <div class="specifications__title">${key}</div>
                    <table class="specifications__table specifications-table" data-specifications-table>
                        <tr>
                                
                        </tr>
                    </table>
                `
                specificationsList.appendChild(div)

                const specificationsTable = div.querySelector('[data-specifications-table]')

                Object.entries(value).forEach(([key, value]) => {
                    const tr = document.createElement('tr')
                    tr.innerHTML = `
                        <td>${renameKey(key)}</td>
                        <td>${value}</td>
                    `

                    specificationsTable.appendChild(tr)
                })
            }

            specifications.forEach(element => {
                Object.entries(element).forEach(([key, value]) => {
                    renderSpecificationsInner(key, value)
                })
            })
        }

        const renderReviews = () => {
            const tabNavReviews = document.querySelector('[data-tab="reviews"]')
            const tabReviewsContent = document.querySelector('[data-content="reviews"]')
    
            if (product.reviews.length !== 0) {
                const reviewsList = tabReviewsContent.querySelector('.tabs__review-slider-wrapper')
                
                product.reviews.forEach(review => {
                    const li = document.createElement('div')
                    li.classList.add('tabs__review-slider-slide', 'swiper-slide')
    
                    li.innerHTML = `
                        <div class=tabs__review-hero>
                            <p class="tabs__review-slider-title">${review.username}</p>
                            ${rating(review.rate)}
                        </div>
                        <div class="tabs__review-slider-text">
                            <p>${review.text}</p>
                        </div>
                    `
    
                    reviewsList.appendChild(li)
                });
            } else {
                tabNavAbout.remove()
                tabAboutContent.remove()
                navList[1].classList.add('is-active')
                contentList[1].classList.add('is-active')
            }
        }

        renderAbout()
        renderSpecifications()
        renderReviews()
    }

    renderDetails(getProductDetails())
    renderTabs(getProductDetails())
}

export { renderPage }