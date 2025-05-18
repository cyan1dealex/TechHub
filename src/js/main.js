import { filters, saveSelectedFilters, selectedFilters } from './filters.js';

import product from './products.js';
import { cartData } from './modules/cartData.js';
import { closeCart, closeCompare, closeFavourites, closeMenu, openCart, openCompare, openFavourites, openMenu } from './modules/popup.js';
import { miniGallery } from './modules/miniGallery.js';
import { changeGrid } from './modules/changeGrid.js';
import { productFilter } from './modules/productFilter.js';
import { setFilterValues } from './filters.js';

import { compareProducts } from './modules/compare.js';
import { initGallery } from './modules/photoGallery.js';
import { tabs } from './modules/tabs.js';
import { initAboutSlider, initReviewSlider } from './modules/slider.js';
import { renderPage } from './modules/renderPage.js';
import { addStylesForButton } from './modules/addStylesForButton.js';
import { favouritesData } from './modules/favourites.js';
import { pagination } from './modules/pagination.js';
import { changeTheme } from './modules/changeTheme.js';
import { preloader } from './modules/preloader.js';
import { typingText } from './modules/typingText.js';
import { collapseAccordion } from './modules/collapleAccordion.js';
import { adaptation } from './modules/adaptation.js';

window.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname;
    
    const initShopPage = () => {
        // const productContainer = document.getElementById('productContainer');
        typingText()
        preloader()
        openCart()
        closeCart()
        openCompare()
        closeCompare()
        openFavourites()
        closeFavourites()
        openMenu()
        closeMenu()
        changeGrid()
        setFilterValues(product)
        productFilter(product, filters)
        // miniGallery(product)
        saveSelectedFilters()
        cartData()
        compareProducts()
        favouritesData()
        changeTheme()
        collapseAccordion()
        adaptation()
    }

    const initProductPage = () => {
        renderPage()

        preloader()
        openCart()
        closeCart()
        openCompare()
        closeCompare()
        openFavourites()
        closeFavourites()
        openMenu()
        closeMenu()
        initGallery()
        tabs()
        initAboutSlider()
        initReviewSlider()
        addStylesForButton('cart')
        addStylesForButton('compare')
        addStylesForButton('favourites')
        cartData()
        compareProducts()
        favouritesData()
        changeTheme()
        collapseAccordion()
        adaptation()
    }
    
    switch (currentPage) {
        case '/':
            initShopPage()
            break;
        case '/page.html':
            initProductPage()
            break;
    }
})