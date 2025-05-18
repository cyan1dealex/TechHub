const miniGallery = () => {
    const productCards = document.querySelectorAll("[data-galery]");

    productCards.forEach((imageContainer) => {
        const imagesElement = imageContainer.querySelectorAll("[data-image]");
        const paginationElement = imageContainer.querySelector("[data-image-pagination]").querySelectorAll("span");

        // Скрываем все изображения кроме первого и обновляем пагинацию
        imagesElement.forEach((img, index) => {
            img.style.opacity = index === 0 ? 1 : 0; // Первое изображение показано, остальные скрыты
            if (paginationElement[index]) {
                paginationElement[index].classList.toggle("is-active", index === 0); // Первая точка активна
            }
        });

        imageContainer.addEventListener('mousemove', (event) => {
            const { width } = imageContainer.getBoundingClientRect();
            const mouseX = event.clientX - imageContainer.getBoundingClientRect().left;

            let index;
            if (mouseX < width / 4) {
                index = 0;
            } else if (mouseX < (width / 4) * 2) {
                index = 1;
            } else if (mouseX < (width / 4) * 3) {
                index = 2;
            } else {
                index = 3;
            }

            imagesElement.forEach((img, i) => {
                img.style.opacity = (i === index) ? 1 : 0; // Показываем текущее изображение
            });

            // Обновляем пагинацию
            paginationElement.forEach((span, i) => {
                span.classList.toggle("is-active", i === index);
            });
        });

        imageContainer.addEventListener('mouseleave', () => {
            imagesElement.forEach((img, i) => {
                img.style.opacity = (i === 0) ? 1 : 0; // Возвращаем к первому изображению
            });

            // Обновляем пагинацию, чтобы активировать первую точку
            paginationElement.forEach((span) => {
                span.classList.remove("is-active");
            });
            if (paginationElement[0]) {
                paginationElement[0].classList.add("is-active");
            }
        });
    });
}

export { miniGallery };