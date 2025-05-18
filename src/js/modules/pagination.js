import { changeGrid } from "./changeGrid";
import { miniGallery } from "./miniGallery";
import { renderProductCards } from "./productCards";

const pagination = (products, productContainer) => {
    const buttonNextPagination = document.querySelector('[data-button-next]');
    const buttonPrevPagination = document.querySelector('[data-button-prev]');
    const paginationList = document.querySelector('[data-pagination]');

    // console.log(productCard)
    
    let productCount = 6;
    let currentPage = Number(sessionStorage.getItem('currentPage')) || 1; // Приводим к числу

    const saveCurrentPage = (page) => {
        sessionStorage.setItem('currentPage', page); // Не нужно JSON.stringify для числа
    };
    
    const renderProducts = (products, container, numberOfProducts, page) => {
        productContainer.innerHTML = '';
        const firstProductIndex = numberOfProducts * (page - 1);
        const lastProductIndex = firstProductIndex + numberOfProducts;
        const productsOnPage = products.slice(firstProductIndex, lastProductIndex);

        renderProductCards(productsOnPage, container);
        miniGallery();
    };

    const renderPaginationElements = (products, numberOfProducts) => {
        const pagesCount = Math.ceil(products.length / numberOfProducts);

        // Если количество страниц 1 и меньше, то скрываем пагинацию
        document.querySelector('.pagination').style.display = pagesCount <= 1 ? 'none' : ''

        paginationList.innerHTML = '';
        
        for (let i = 1; i <= pagesCount; i++) {
            const li = renderBtn(i);
            paginationList.append(li);
        }
    };

    const renderBtn = (page) => {
        const li = document.createElement('li');
        li.classList.add('pagination__item');
        li.setAttribute('data-pagination-item', '');
        li.textContent = page;

        if (currentPage === page) { // Используем строгое сравнение ===
            li.classList.add('is-active');
        }
        
        return li;
    };

    const updatePagination = () => {
        document.addEventListener('click', (event) => {
            const paginationItem = event.target.closest('[data-pagination-item]');
            
            if (!paginationItem) return;
            
            currentPage = Number(paginationItem.textContent);
            saveCurrentPage(currentPage);
            renderProducts(products, productContainer, productCount, currentPage);

            document.querySelectorAll('[data-pagination-item]').forEach(item => {
                item.classList.remove('is-active');
            });
            paginationItem.classList.add('is-active');
        });
    };

    const handlePagination = (event) => {
        const liElements = document.querySelectorAll('[data-pagination-item]');
        let newPage;

        if (event.target.closest('[data-button-next]')) {
            newPage = currentPage + 1;
            if (newPage > liElements.length) newPage = 1;
        } else {
            newPage = currentPage - 1;
            if (newPage < 1) newPage = liElements.length;
        }

        currentPage = newPage;
        saveCurrentPage(newPage);
        renderProducts(products, productContainer, productCount, currentPage);

        liElements.forEach(li => {
            li.classList.remove('is-active');
            if (Number(li.textContent) === currentPage) {
                li.classList.add('is-active');
            }
        });
    };

    renderPaginationElements(products, productCount);
    renderProducts(products, productContainer, productCount, currentPage);
    updatePagination();

    buttonNextPagination.addEventListener('click', handlePagination);
    buttonPrevPagination.addEventListener('click', handlePagination);
};

export { pagination };