import { saveSelectedFilters, selectedFilters } from "../filters.js";
import product from "../products.js";
import { addStylesForButton } from "./addStylesForButton.js";
import { cartData } from "./cartData.js";
import { compareProducts } from "./compare.js";
import { favouritesData } from "./favourites.js";
import { miniGallery } from "./miniGallery.js";
import { pagination } from "./pagination.js";
import { renderProductCards } from "./productCards.js";    

let filteredProducts = [...product].sort((a, b) => b.rate - a.rate);

// console.log(selectedFilters)
const productFilter = (products, filters) => {
    const productContainer = document.getElementById('productContainer');
    const filterContainer = document.querySelector('[data-filter-container]');
    const selectInput = document.getElementById("selectFilter")
    const localSearchInput = document.querySelector('[data-local-search]')
    const productsEmpty = document.querySelector('[data-products-empty]')

    // Функция debounce
    const debounce = (func, waitTime) => {
        let timeout;
        const loader = document.querySelector("[data-products-loader]");
        
        return (...args) => {
            loader.classList.add("is-loading");

            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(this, args); 
                if (productsEmpty.style.display === "flex") {
                    productsEmpty.style.display === "none";
                }
                loader.classList.remove("is-loading");
            }, waitTime);
        };
    };

    // Отображение отфильтрованных товаров на странице
    const renderFilteredProducts = (filteredProducts) => {
        // productContainer.innerHTML = '';
        pagination(filteredProducts, productContainer)
        // renderProductCards(filteredProducts, productContainer)

        addStylesForButton('cart')
        addStylesForButton('compare')
        addStylesForButton('favourites')

        miniGallery()
    };

    // Обновление отфильтрованных продуктов
    const updateFilteredProducts = () => {

        filteredProducts = products

        // Фильтр по цене
        const [minPrice, maxPrice] = selectedFilters.price;
        filteredProducts = filteredProducts.filter(product => 
            product.prices[0] >= minPrice && product.prices[0] <= maxPrice
        );

        // Фильтр по бренду
        if (selectedFilters.brands.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
                selectedFilters.brands.includes(product.main.brand)
            );
        }

        // Фильтр по оперативной памяти
        if (selectedFilters.ram.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
                selectedFilters.ram.includes(product.processorAndMemory.ram)
            );
        }

        // Фильтр по памяти
        if (selectedFilters.memory.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
                selectedFilters.memory.includes(product.processorAndMemory.rom)
            );
        }

        // Фильтр по частоте обновления экрана
        if (selectedFilters.refreshRate.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
                selectedFilters.refreshRate.includes(product.screen.screenRefreshRate)
            );
        }

        // Фильтр по операционной системе
        if (selectedFilters.os.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
                selectedFilters.os.includes(product.main.OS)
            );
        }

        // Фильтр по локальному поиску
		if (selectedFilters.search.trim().length !== 0) {
			const searchText = selectedFilters.search.trim().toLowerCase();
			const searchTerms = searchText.split(/\s+/); 

			filteredProducts = filteredProducts.filter((product) => {
				const productTitle = product.title.toLowerCase(); 

				return searchTerms.every(term => productTitle.includes(term));
			});
		}

        // Сортировка по select
        let selectInputValue = selectedFilters.select
        if (selectInputValue) {
            switch (selectInputValue) {
                case 'ascending':
                    filteredProducts.sort((a, b) => parseFloat(a.prices[0]) - parseFloat(b.prices[0]))
                    // console.log(filteredProducts)
                    break;
                case 'descending':
                    filteredProducts.sort((a, b) => parseFloat(b.prices[0]) - parseFloat(a.prices[0]))
                    // console.log(filteredProducts)
                    break;
                case 'rating':
                    filteredProducts.sort((a, b) => parseFloat(b.rate) - parseFloat(a.rate))
                    break;
            }
        }

        renderFilteredProducts(filteredProducts);
    };

    // Очистка всех фильтров
    const clearFilters = () => {
        document.addEventListener('click', (event) => {
            if (!event.target.closest('[data-button-clear-filters]')) return;
    
            // Сбрасываем все фильтры, кроме select и search
            selectedFilters.price = [...filters.price]; // Возвращаем к исходным значениям
            selectedFilters.brands = [];
            selectedFilters.memory = [];
            selectedFilters.os = [];
            selectedFilters.ram = [];
            selectedFilters.refreshRate = [];
            selectedFilters.rating = [];
    
            // Обновляем UI полей ввода
            const minPriceInput = document.querySelector("[data-min-price]");
            const maxPriceInput = document.querySelector("[data-max-price]");
            if (minPriceInput && maxPriceInput) {
                minPriceInput.value = selectedFilters.price[0];
                maxPriceInput.value = selectedFilters.price[1];
            }
    
            // Сбрасываем все чекбоксы
            document.querySelectorAll('[data-brand-input]').forEach(checkbox => {
                checkbox.checked = false;
            });
            document.querySelectorAll('[data-ram-input]').forEach(checkbox => {
                checkbox.checked = false;
            });
            document.querySelectorAll('[data-rom-input]').forEach(checkbox => {
                checkbox.checked = false;
            });
            document.querySelectorAll('[data-screen-frequency-input]').forEach(checkbox => {
                checkbox.checked = false;
            });
            document.querySelectorAll('[data-os-input]').forEach(checkbox => {
                checkbox.checked = false;
            });
    
            saveSelectedFilters();
            updateFilteredProducts();
        });
    };

    // ============= Функционал фильтров =============

    const selectFilter = () => {
        const loadFiltersFromLocalStorage = () => {
            const savedFilters = JSON.parse(localStorage.getItem('filters'));

            if (!savedFilters) {
                return;
            }

            const savedSelect = savedFilters.select;

            if (savedSelect) {
                selectedFilters.select = savedSelect;
                // saveSelectedFilters()
                selectInput.value = selectedFilters.select; 
                // console.log(selectInput)
            }
            updateFilteredProducts()
        };

        loadFiltersFromLocalStorage()

        selectInput.addEventListener('change', (event) => {
            selectedFilters.select = event.target.value;
            saveSelectedFilters()
            updateFilteredProducts()
        })
    }

    const searchFilter = () => {
        const loadFiltersFromLocalStorage = () => {
            const savedFilters = JSON.parse(localStorage.getItem('filters'));

            if (!savedFilters) {
                return;
            }

            const savedLocalSearch = savedFilters.search;

            if (savedLocalSearch) {
                selectedFilters.search = savedLocalSearch;
                // saveSelectedFilters()
                localSearchInput.value = selectedFilters.search; 
            }
            updateFilteredProducts()
        };

        loadFiltersFromLocalStorage()

        const updateSelectedFilters = (event) => {
            selectedFilters.search = event.target.value;
            saveSelectedFilters()
            updateFilteredProducts()
        }

        const debouncedUpdate = debounce(updateSelectedFilters, 800); // Оптимальное значение - 300 мс, поставил больше для наглядности loader'a

        localSearchInput.addEventListener("input", (event) => {
            debouncedUpdate(event);
        });

        localSearchInput.addEventListener("change", (event) => {
            const trimmedValue = event.target.value.trim(); // Убираем пробелы
            event.target.value = trimmedValue; // Присваиваем очищенное значение обратно
        
            if (trimmedValue.length > 0) {
                selectedFilters.search = trimmedValue; // Обновляем значение фильтра
                saveSelectedFilters();
                updateFilteredProducts();
            } else {
                selectedFilters.search = ''; // Сбрасываем фильтр
                saveSelectedFilters();
                updateFilteredProducts();
            }
        });
    }

    const priceFilter = () => {
        const minPriceInput = filterContainer.querySelector("[data-min-price]");
        const maxPriceInput = filterContainer.querySelector("[data-max-price]");
    
        const loadFiltersFromLocalStorage = () => {
            const savedFilters = JSON.parse(localStorage.getItem('filters')) || {};
        
            // Инициализация если нет данных
            // if (!selectedFilters.price) {
            //     selectedFilters = { ...filters };
            // }

            // Загрузка значений
            const savedMinPrice = savedFilters?.price?.[0] || filters.price[0];
            const savedMaxPrice = savedFilters?.price?.[1] || filters.price[1];
            
            minPriceInput.value = savedMinPrice;
            maxPriceInput.value = savedMaxPrice;
            selectedFilters.price = [savedMinPrice, savedMaxPrice];
        };
    
        loadFiltersFromLocalStorage(); // Загружаем фильтры при инициализации
    
        minPriceInput.addEventListener("change", () => {
            const minPrice = parseFloat(minPriceInput.value);
            const maxPrice = parseFloat(maxPriceInput.value);
            
            if (minPrice < filters.price[0] || isNaN(minPrice) || minPrice > maxPrice) {
                minPriceInput.value = filters.price[0];
                selectedFilters.price[0] = parseFloat(minPriceInput.value);
                saveSelectedFilters()
            } else {
                selectedFilters.price[0] = minPrice;
                saveSelectedFilters();
            }
            updateFilteredProducts();
        });
    
        maxPriceInput.addEventListener("change", () => {
            const minPrice = parseFloat(minPriceInput.value);
            const maxPrice = parseFloat(maxPriceInput.value);
    
            if (maxPrice > filters.price[1] || isNaN(maxPrice) || maxPrice < minPrice) {
                maxPriceInput.value =  parseFloat(filters.price[1]);
                selectedFilters.price[1] = parseFloat(maxPriceInput.value);
                saveSelectedFilters()
            } else {
                selectedFilters.price[1] = maxPrice;
                saveSelectedFilters();
            }
            updateFilteredProducts();
        });
        updateFilteredProducts();
    };

    const brandFilter = () => {
        const checkboxes = filterContainer.querySelectorAll("[data-brand-input]");
        const labels = filterContainer.querySelectorAll("[data-brand-label]");

        const loadFiltersFromLocalStorage = () => {
            const savedFilters = JSON.parse(localStorage.getItem('filters'));

            if (!savedFilters) {
                return;
            }

            const savedBrands = savedFilters.brands;

            if (savedBrands) {
                selectedFilters.brands = savedBrands;
        
                checkboxes.forEach((checkbox, index) => {
                    checkbox.checked = savedBrands.includes(labels[index].textContent);
                });
            }
            updateFilteredProducts()
        };

        loadFiltersFromLocalStorage()
        
        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener('change', () => {
                // Обнуляем массив при любом изменении
                selectedFilters.brands = [];
            
                // Добавляем только выбранные бренды
                checkboxes.forEach((cb, idx) => {
                    if (cb.checked) {
                        selectedFilters.brands.push(labels[idx].textContent);
                    }
                });
                
                saveSelectedFilters();
                updateFilteredProducts();
            });
        });
    };

    const ramFilter = () => {
        const checkboxes = filterContainer.querySelectorAll("[data-ram-input]");
        const labels = filterContainer.querySelectorAll("[data-ram-label]");

        const loadFiltersFromLocalStorage = () => {
            const savedFilters = JSON.parse(localStorage.getItem('filters'));

            if (!savedFilters) {
                return;
            }

            const savedRAM = savedFilters.ram;

            if (savedRAM) {
                selectedFilters.ram = savedRAM;

                checkboxes.forEach((checkbox, index) => {
                    // console.log(labels[index].textContent.replace(/[^0-9]/g, ''))
                    checkbox.checked = savedRAM.includes(parseInt(labels[index].textContent.replace(/[^0-9]/g, '')));
                });
            }
            updateFilteredProducts();
        };

        loadFiltersFromLocalStorage();
        
        checkboxes.forEach((checkbox, index) => {
            checkbox.addEventListener('change', () => {
                // Обнуляем массив при любом изменении
                selectedFilters.ram = []; 
                
                checkboxes.forEach((cb, idx) => {
                    if (cb.checked) {
                        selectedFilters.ram.push(
                            parseInt(labels[idx].textContent.replace(/[^0-9]/g, ''))
                        );
                    }
                });
                
                saveSelectedFilters();
                updateFilteredProducts();
            });
        });
    };

    const romFilter = () => {
        const checkboxes = filterContainer.querySelectorAll("[data-rom-input]");
        const labels = filterContainer.querySelectorAll("[data-rom-label]");

        const loadFiltersFromLocalStorage = () => {
            const savedFilters = JSON.parse(localStorage.getItem('filters'));

            if (!savedFilters) {
                return;
            }

            const savedROM = savedFilters.memory;

            if (savedROM) {
                selectedFilters.memory = savedROM;

                checkboxes.forEach((checkbox, index) => {
                    checkbox.checked = savedROM.includes(parseInt(labels[index].textContent.replace(/[^0-9]/g, '')));
                });
            }
            updateFilteredProducts();
        };

        loadFiltersFromLocalStorage();
        
        checkboxes.forEach((checkbox, index) => {
            checkbox.addEventListener('change', () => {
                // Обнуляем массив при любом изменении
                selectedFilters.memory = []; 
                
                checkboxes.forEach((cb, idx) => {
                    if (cb.checked) {
                        selectedFilters.memory.push(
                            parseInt(labels[idx].textContent.replace(/[^0-9]/g, ''))
                        );
                    }
                });
                
                saveSelectedFilters();
                updateFilteredProducts();
            });
        });
    };
    
    const refreshRateFilter = () => {
        const checkboxes = filterContainer.querySelectorAll("[data-screen-frequency-input]");
        const labels = filterContainer.querySelectorAll("[data-screen-frequency-label]");

        const loadFiltersFromLocalStorage = () => {
            const savedFilters = JSON.parse(localStorage.getItem('filters'));

            if (!savedFilters) {
                return;
            }

            const savedROM = savedFilters.refreshRate;

            if (savedROM) {
                selectedFilters.refreshRate = savedROM;

                checkboxes.forEach((checkbox, index) => {
                    checkbox.checked = savedROM.includes(parseInt(labels[index].textContent.replace(/[^0-9]/g, '')));
                });
            }
            updateFilteredProducts();
        };

        loadFiltersFromLocalStorage();
        
        checkboxes.forEach((checkbox, index) => {
            checkbox.addEventListener('change', () => {
                // Обнуляем массив при любом изменении
                selectedFilters.refreshRate = []; 
                
                checkboxes.forEach((cb, idx) => {
                    if (cb.checked) {
                        selectedFilters.refreshRate.push(
                            parseInt(labels[idx].textContent.replace(/[^0-9]/g, ''))
                        );
                    }
                });
                
                saveSelectedFilters();
                updateFilteredProducts();
            });
        });
    };

    const osFilter = () => {
        const checkboxes = filterContainer.querySelectorAll("[data-os-input]");
        const labels = filterContainer.querySelectorAll("[data-os-label]");

        const loadFiltersFromLocalStorage = () => {
            const savedFilters = JSON.parse(localStorage.getItem('filters'));

            if (!savedFilters) {
                return;
            }

            const savedOS = savedFilters.os;

            if (savedOS.length != 0) {
                selectedFilters.os = savedOS;

                checkboxes.forEach((checkbox, index) => {
                    checkbox.checked = savedOS.includes(labels[index].textContent);
                });
            }
            updateFilteredProducts();
        };

        loadFiltersFromLocalStorage();
        
        checkboxes.forEach((checkbox, index) => {
            checkbox.addEventListener('change', () => {
                // Обнуляем массив при любом изменении
                selectedFilters.os = []; 
                
                checkboxes.forEach((cb, idx) => {
                    if (cb.checked) {
                        selectedFilters.os.push(labels[idx].textContent);
                    }
                });
                
                saveSelectedFilters();
                updateFilteredProducts();
            });
        });
    };

    // ============= Рендер =============

    // Рендер фильтра по цене
    const renderPriceFilter = () => {
        const li = document.createElement('li');
        li.classList.add('filters__item');
        li.setAttribute('data-price-filter', true);
    
        const minPriceValue = selectedFilters.price[0] || filters.price[0];
        const maxPriceValue = selectedFilters.price[1] || filters.price[1];
    
        li.innerHTML = `
            <div class="filters__filter" data-collapse = "open">
                <div class="filters__header" data-collapse-heading>
                    <p class="filters__title">Цена</p>
                </div>
                <div class="filters__body" data-collapse-content>
                    <div class="filters__interval">
                        <label class="filters__label">От 
                            <input class="filters__input"
                                name="inputPriceFrom" 
                                value="${minPriceValue}" 
                                placeholder="${filters.price[0]}" 
                                type="text" data-min-price>
                        </label>
                        <label class="filters__label">До
                            <input class="filters__input" 
                            name="inputPriceTo" 
                            value="${maxPriceValue}" 
                            placeholder="${filters.price[1]}" 
                            type="text" data-max-price>
                        </label>
                    </div>
                </div>
            </div>
        `;
    
        filterContainer.append(li);
        priceFilter(); // Инициализация обработчиков событий
    };

    // Рендер фильтра по бренду
    const renderBrandFilter = () => {
        // saveSelectedFilters()

        const li = document.createElement('li');
        li.classList.add('filters__item');
        li.setAttribute('filters__filter', true);

        li.innerHTML = `
            <div class="filters__filter" data-collapse="open">
                <div class="filters__header" data-collapse-heading>
                    <p class="filters__title">Бренд</p>
                </div>
                <div class="filters__body" data-collapse-content>
                    <ul class="filters__list" data-brand-container>
                    </ul>
                </div>
            </div>
        `;

        filterContainer.append(li);

        const brandContainer = document.querySelector("[data-brand-container]");
        filters.brands.forEach(element => {
            const li = document.createElement('li');
            li.classList.add('filters__list-item');
            const inputId = element.toLowerCase();

            li.innerHTML = `
                <input type="checkbox" name="${inputId}" id="${inputId}" data-brand-input/>
                <label for="${inputId}" data-brand-label>${element}</label>
            `;

            brandContainer.append(li);
        });

        brandFilter();
    };

    // Рендер фильтра оперативной памяти
    const renderRamFilter = () => {
        const li = document.createElement('li');
        li.classList.add('filters__item');
        li.setAttribute('data-ram-filter', true);

        li.innerHTML = `
            <div class="filters__filter" data-collapse="open">
                <div class="filters__header" data-collapse-heading>
                    <p class="filters__title">Оперативная память</p>
                </div>
                <div class="filters__body" data-collapse-content>
                    <ul class="filters__list" data-ram-container>
                    </ul>
                </div>
            </div>
        `;

        filterContainer.append(li);

        const ramContainer = document.querySelector("[data-ram-container]");
        filters.ram.forEach(element => {
            const li = document.createElement('li');
            li.classList.add('filters__list-item');

            li.innerHTML = `
                <input type="checkbox" name="ram-input" id="ram-${element}" data-ram-input/>
                <label for="ram-${element}" data-ram-label>${element} ГБ</label>
            `;

            ramContainer.append(li);
        });

        ramFilter();
    };

    // Рендер фильтра объема памяти
    const renderRomFilter = () => {
        const li = document.createElement('li');
        li.classList.add('filters__item');
        li.setAttribute('data-rom-filter', true);

        li.innerHTML = `
            <div class="filters__filter" data-collapse="open">
                <div class="filters__header" data-collapse-heading>
                    <p class="filters__title">Объем памяти</p>
                </div>
                <div class="filters__body" data-collapse-content>
                    <ul class="filters__list" data-rom-container>
                    </ul>
                </div>
            </div>
        `;

        filterContainer.append(li);

        const memoryContainer = document.querySelector("[data-rom-container]");
        filters.memory.forEach(element => {
            const li = document.createElement('li');
            li.classList.add('filters__list-item');

            li.innerHTML = `
                <input type="checkbox" name="memory-input" id="memory-${element}" data-rom-input/>
                <label for="memory-${element}" data-rom-label>${element} ГБ</label>
            `;

            memoryContainer.append(li);
        });

        romFilter()
    };

    // Рендер фильтра частоты обновления экрана
    const renderScreenFrequencyFilter = () => {
        const li = document.createElement('li');
        li.classList.add('filters__item');
        li.setAttribute('data-screen-frequency-filter', true);

        li.innerHTML = `
            <div class="filters__filter" data-collapse="open">
                <div class="filters__header" data-collapse-heading>
                    <p class="filters__title">Частота экрана</p>
                </div>
                <div class="filters__body" data-collapse-content>
                    <ul class="filters__list" data-screen-frequency-container>
                    </ul>
                </div>
            </div>
        `;

        filterContainer.append(li);

        const refreshRateContainer = document.querySelector("[data-screen-frequency-container]");
        filters.refreshRate.forEach(element => {
            const li = document.createElement('li');
            li.classList.add('filters__list-item');

            li.innerHTML = `
                <input type="checkbox" name="refrase-rate-input" id="refrase-rate-${element}" data-screen-frequency-input/>
                <label for="refrase-rate-${element}" data-screen-frequency-label>${element} Гц</label>
            `;

            refreshRateContainer.append(li);
        });

        refreshRateFilter()
    };

    // Рендер фильтра операционной системы
    const renderOSFilter = () => {
        const li = document.createElement('li');
        li.classList.add('filters__item');
        li.setAttribute('data-os-filter', true);

        li.innerHTML = `
            <div class="filters__filter" data-collapse="open">
                <div class="filters__header" data-collapse-heading>
                    <p class="filters__title">Операционная система</p>
                </div>
                <div class="filters__body" data-collapse-content>
                    <ul class="filters__list" data-os-container>
                    </ul>
                </div>
            </div>
        `;

        filterContainer.append(li);

        const OSContainer = document.querySelector("[data-os-container]");
        filters.os.forEach(element => {
            const li = document.createElement('li');
            li.classList.add('filters__list-item');
            const inputId = element.toLowerCase();

            li.innerHTML = `
                <input type="checkbox" name="${inputId}" id="${inputId}" data-os-input/>
                <label for="${inputId}" data-os-label>${element}</label>
            `;

            OSContainer.append(li);
        });

        osFilter()
    };

    clearFilters();

    renderPriceFilter();
    renderBrandFilter();
    renderRamFilter();
    renderRomFilter();
    renderScreenFrequencyFilter();
    renderOSFilter();

    selectFilter();
    searchFilter();
    renderFilteredProducts(filteredProducts);
};

export { filteredProducts, productFilter };