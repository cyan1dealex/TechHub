import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const initCompareSlider = () => {
    return new Swiper('.swiper', {
        modules: [Navigation],
        slidesPerView: 1,
        spaceBetween:20,
        allowTouchMove: false,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        breakpoints: {
            768: {
                slidesPerView: 1,
            },
            1024: {
                slidesPerView: 2,
            },
            1440: {
                slidesPerView: 3,
            },
        },
    });
};

const initAboutSlider = () => {
    return new Swiper('.swiper-about', {
        modules: [Pagination, Autoplay],
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        slidesPerView: 1,
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        allowTouchMove: false,
    });
};

const initReviewSlider = () => {
    return new Swiper('.swiper-review', {
        modules: [Pagination, Autoplay],
        pagination: {
            el: '.swiper-review-pagination',
            clickable: true,
        },
        slidesPerView: 1,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    });
};

export {initCompareSlider, initAboutSlider, initReviewSlider}