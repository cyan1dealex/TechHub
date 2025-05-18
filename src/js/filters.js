// Значения доступных фильтров
const filters = {
    price: [],
    brands: [],
    memory: [],
    os: [],
    ram: [],
    refreshRate: [],
    rating: [],
    select: "",
    search: ""
}

// Фильтры в localStorage
let selectedFilters = {
    price: [],
    brands: [],
    memory: [],
    os: [],
    ram: [],
    refreshRate: [],
    rating: [],
    select: "",
    search: ""
}

const saveSelectedFilters = () =>  {
    localStorage.setItem("filters", JSON.stringify(selectedFilters))
}

// Записываем доступные значения для фильтров
const setFilterValues = (products) => {
    
    // Записываем максимальную и минимальную доступную цену
    function setPriceFilterValues() {
        const prices = products.map(product => product.prices[0]);
        // console.log(prices)

        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);

        filters.price[0] = minPrice
        filters.price[1] = maxPrice
    }

    // Записываем все доступные бренды
    function setBrandFilterValues() {
        const brands = []

        products.forEach(product => {
            if(!brands.includes(product.main.brand)) {
                brands.push(product.main.brand)
            }
        });

        filters.brands = brands;
    }

    // Записываем все доступные значения оперативной памяти
    function setRAMFilterValues() {
        const ram = []

        products.forEach(product => {
            if(!ram.includes(product.processorAndMemory.ram)) {
                ram.push(product.processorAndMemory.ram)
            }
        });
        
        filters.ram = ram.map(Number).sort((a, b) => b - a);
    }

    // Записываем все доступные значения памяти
    function setROMFilterValues() {
        const memory = []

        products.forEach(product => {
            if(!memory.includes(product.processorAndMemory.rom)) {
                memory.push(product.processorAndMemory.rom)
            }
        });
        
        filters.memory = memory.map(Number).sort((a, b) => b - a);
    }

    // Записываем все доступные значения частоты обновления экрана
    function setRefreshRateFilterValues() {
        const refreshRate = []

        products.forEach(product => {
            if(!refreshRate.includes(product.screen.screenRefreshRate)) {
                refreshRate.push(product.screen.screenRefreshRate)
            }
        });
        
        filters.refreshRate = refreshRate.map(Number).sort((a, b) => b - a);
    }

    // Записываем все доступные операционные системы
    function setOSFilterValues() {
        const os = []

        products.forEach(product => {
            if(!os.includes(product.main.OS)) {
                os.push(product.main.OS)
            }
        });
        
        filters.os = os;
    }

    // Инициализация
    setPriceFilterValues()
    setBrandFilterValues()
    setRAMFilterValues()
    setROMFilterValues()
    setRefreshRateFilterValues()
    setOSFilterValues()
    // console.log(selectedFilters)
}

export { filters, selectedFilters }
export { setFilterValues, saveSelectedFilters }