import PhotoSwipeLightbox from '../../../node_modules/photoswipe/dist/photoswipe-lightbox.esm';
import '../../../node_modules/photoswipe/dist/photoswipe.css';

export const initGallery = () => {
    const images = document.querySelectorAll("a")

    images.forEach(element => {
        let img = new Image()
        const href = element.getAttribute("href");

        img.onload = function() {
            // document.body.style.overflow = 'hidden'
            element.dataset.pswpWidth = this.width * 2
            element.dataset.pswpHeight = this.height * 2
        }
        img.src = href
    })

    const lightbox = new PhotoSwipeLightbox({
        gallery: '.gallery',
        children: 'a',
        
        pswpModule: () => import('photoswipe')
    });
    
    lightbox.init();
}