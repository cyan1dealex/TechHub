function typingText() {
    const texts = [
        "...",
        "Курсовая работа",
    ];
    
    const element = document.querySelector('[data-typewriter-text]');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // скорость печати (мс)
    let deletingSpeed = 50; // скорость удаления (мс)
    let pauseBetweenTexts = 1500; // пауза между текстами (мс)
    let pauseAfterComplete = 2000; // пауза после полного текста (мс)

    const typeWriter = () => {
        const currentText = texts[textIndex];

        if (isDeleting) {
            // Удаление текста
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Печать текста
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
    
        if (!isDeleting && charIndex === currentText.length) {
            // Если текст напечатан полностью
            if (textIndex === texts.length - 1) {
                // Если это последний текст - пауза перед началом цикла
                setTimeout(() => {
                    isDeleting = true;
                    setTimeout(typeWriter, deletingSpeed);
                }, pauseAfterComplete);
            } else {
                // Пауза перед удалением
                isDeleting = true;
                setTimeout(typeWriter, pauseBetweenTexts);
            }
        } else if (isDeleting && charIndex === 0) {
            // Если текст полностью удален
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeWriter, typingSpeed);
        } else {
            // Продолжаем печать или удаление
            setTimeout(typeWriter, isDeleting ? deletingSpeed : typingSpeed);
        }
    }

    setTimeout(typeWriter, '2000')
}

export { typingText }