const tabs = () => {
    const buttonElements = document.querySelectorAll("[data-tab]")
    const contentElements = document.querySelectorAll("[data-content]")

    buttonElements.forEach(btn => {
        btn.addEventListener("click", (event) => {
            let currentButton = event.target;
            let tabID = currentButton.dataset.tab;

            const removeClass = () => {
                buttonElements.forEach(element => {
                    element.classList.remove("is-active")
                })
    
                contentElements.forEach(element => {
                    element.classList.remove("is-active")
                })
            }

            removeClass();

            contentElements.forEach(element => {
                if (element.dataset.content === tabID) {
                    element.classList.add("is-active")
                }
            })

            currentButton.classList.add("is-active")
        })
    })
}

export {tabs}