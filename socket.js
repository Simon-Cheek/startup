const createPopUp = new Promise((res, rej) => {

    setInterval(
        () => {

            // create the div and manage
            const newPopUp = document.createElement("div");
            newPopUp.classList.add("pop-up");

            const info = document.createElement("p");
            info.style.marginBottom = "0";
            info.innerText = `Friend${Math.floor(Math.random() * 1000)} added you to their list!`
            newPopUp.appendChild(info);

            const page = document.querySelector("main");
            page.appendChild(newPopUp);

            setTimeout(() => {
                newPopUp.classList.add("disappear");
            }, 4000)

            setTimeout(() => {
                newPopUp.style.display = "none";
            }, 5000)

            setTimeout(() => {
                newPopUp.remove();
            }, 6000)

        }, 15000
    )
})


