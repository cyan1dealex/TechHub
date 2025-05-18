import product from "../products.js";
import { addStylesForButton } from "./addStylesForButton.js";
import { collapseAccordion } from "./collapleAccordion.js";
import { availibilityIndicator } from "./indicator.js";
import { initCompareSlider } from "./slider.js";

const compareProducts = () => {
    if (!localStorage.productsForCompare) {
        localStorage.setItem('productsForCompare', JSON.stringify([]))
    }
    
    // DOM элементы
    const compareWindow = document.querySelector('[data-compare]')
    const compareInner = document.querySelector('[data-compare-inner]')
    const compareEmpty = document.querySelector('[data-compare-empty]')
    const productList = document.getElementById('productContainer')
    const compareList = document.querySelector('[data-compare-list]')
    const compareInfoList = document.querySelector('[data-info-list]')
    const compareInfoInner = document.querySelector('[data-compare-info]')

    const slider = initCompareSlider();
    let productsForCompare = JSON.parse(localStorage.getItem("productsForCompare")) || [];

    // Проверка состояния сравнения
    const toggleCompareStatus = () => {
        if (productsForCompare.length !== 0) {
            compareInner.classList.add('is-active')
            compareEmpty.classList.remove('is-active')
        } else {
            compareInner.classList.remove('is-active')
            compareEmpty.classList.add('is-active')
        }
    };

    const getIDfromURL = () => {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    };

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

    const groupByCategory = (products) => {
        const groupedMap = {}; // Используем объект для временного хранения данных
    
        products.forEach(product => {
            Object.entries(product).forEach(([key, value]) => {
                if (typeof value === 'object' 
                    && key !== 'photos'
                    && key !== 'aboutPhotos' 
                    && key !== 'reviews'
                    && key !== 'prices'
                ) {
                    const category = renameCategory(key);
                    if (!groupedMap[category]) {
                        groupedMap[category] = [];
                    }
                    groupedMap[category].push(value);
                }
            });
        });
        
        // Преобразуем объект в массив объектов
        const groupedList = Object.entries(groupedMap).map(([category, items]) => {
            return { [category]: items };
        });
        
        return groupedList;
    };

    // Обновление localStorage
    const updateLocalStorage = (productInfo, action) => {
        if (action === "add") {
            productsForCompare.push(productInfo);
        } else {
            productsForCompare = productsForCompare.filter(p => p.id !== productInfo.id);
        }
        localStorage.setItem("productsForCompare", JSON.stringify(productsForCompare));
    };

    // Общий рендеринг карточки товара
    const renderProductCard = (product) => {
        const div = document.createElement('div');
        div.className = 'compare__item compare-item swiper-slide';
        div.dataset.id = product.id;
        
        div.innerHTML = `
            <span class="close" data-close></span>
            <article class="compare-item__inner">
                <div class="compare-item__image-container">
                    <img src="${product.photos[0]}" alt="${product.title}">
                </div>
                <div class="compare-item__info">
                    <p class="compare-item__title">${product.title}</p>
                    <a href="page.html?id=${product.id}" class="compare-item__link">Перейти на страницу товара</a>
                </div>
                <p class="compare-item__price h3">${product.prices[0]}</p>
            </article>
        `;

        return div;
    };

    // Рендер карточек товара
    const renderProductCards = () => {
        compareList.innerHTML = ''
        productsForCompare.forEach(product => {
            const card = renderProductCard(product)
            compareList.append(card)
        })

        // console.log(slider)
        // slider?.forEach(slider => slider.update())
        slider.update()
    }

    // Рендер информации
    const renderProductInfo = () => {
        const grouped = groupByCategory(productsForCompare);
        
        // Очищаем контейнер перед рендером
        compareInfoInner.innerHTML = '';
        
        grouped.forEach(category => {
            const categoryName = Object.keys(category)[0];
            const itemsInCategory = category[categoryName];
            
            // Создаем строки таблицы на основе данных
            const rowsHtml = Object.keys(itemsInCategory[0]).map(property => {
                return `
                    <div class="info__row">
                        <div class="info__row-aside">${renameKey(property)}</div>
                        <div class="info__row-main swiper">
                            <div class="swiper-wrapper">
                                ${itemsInCategory.map(item => `
                                    <div class="swiper-slide">${item[property] || '—'}</div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
    
            const div = document.createElement('div');
            div.classList.add('compare__info', 'info');
    
            div.innerHTML = `
                <div class="info__accordeon" data-collapse='open'>
                    <p class="info__title" data-collapse-heading>${categoryName}</p>
                    <div class="info__table" data-collapse-content>
                        ${rowsHtml}
                    </div>
                </div>
            `;
            
            compareInfoInner.appendChild(div);
        });
        
        // collapseAccordion()
        initCompareSlider()
    };

    // Обработчики событий
    const setupEventListeners = () => {
        // Добавление/удаление товара

        document.addEventListener('click', event => {
            if (event.target.closest('[data-compare-button]')) {
                const card = event.target.closest('.product-card') || event.target.closest('.favourites__item');
                let productInfo = {}

                if (card) {
                    productInfo = product.find(p => p.id === card.dataset.id);
                } else {
                    let id = getIDfromURL()

                    productInfo = product.find(p => p.id === id);
                }
                updateLocalStorage(productInfo, event.target.classList.contains("disabled") ? "remove" : "add");
                addStylesForButton('compare');
                toggleCompareStatus()
                availibilityIndicator('compare', productsForCompare)

                renderProductCards(productInfo)
                renderProductInfo()
            }
        })

        // Удаление из сравнения
        compareList.addEventListener("click", (e) => {
            if (e.target.hasAttribute("data-close")) {
                const productId = e.target.closest('[data-id]').dataset.id;
                updateLocalStorage({ id: productId }, "remove");
                
                addStylesForButton('compare');
                toggleCompareStatus()
                availibilityIndicator('compare', productsForCompare)
                renderProductCards(productsForCompare)
                renderProductInfo()
            }
        });
    };

    // Инициализация
    renderProductCards()
    renderProductInfo()
    availibilityIndicator('compare', productsForCompare)
    addStylesForButton('compare')
    toggleCompareStatus();
    setupEventListeners();
};

export { compareProducts };