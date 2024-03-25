// Websocket placeholder

// const createPopUp = new Promise((res, rej) => {

//     setInterval(
//         () => {

//             // create the div and manage
//             const newPopUp = document.createElement("div");
//             newPopUp.classList.add("pop-up");

//             const info = document.createElement("p");
//             info.style.marginBottom = "0";
//             info.innerText = `Friend${Math.floor(Math.random() * 1000)} added you to their list!`
//             newPopUp.appendChild(info);

//             const page = document.querySelector("main");
//             page.appendChild(newPopUp);

//             setTimeout(() => {
//                 newPopUp.classList.add("disappear");
//             }, 4000)

//             setTimeout(() => {
//                 newPopUp.style.display = "none";
//             }, 5000)

//             setTimeout(() => {
//                 newPopUp.remove();
//             }, 6000)

//         }, 15000
//     )
// })

function displayFriendNotif(friendName) {
    const createPopUp = new Promise((res, rej) => {

        // create the div and manage
        const newPopUp = document.createElement("div");
        newPopUp.classList.add("pop-up");

        const info = document.createElement("p");
        info.style.marginBottom = "0";
        info.innerText = `${friendName} added you to their Friends List!`
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
            res('Finished Notification!');
        }, 6000)

    });
}


const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
const socketURL = `${protocol}://localhost:9900?userName=${localStorage.getItem('username')}`
console.log(socketURL)
const socket = new WebSocket(socketURL);

socket.onmessage = async (e) => {
    const friendedUser = e.data;
    displayFriendNotif(friendedUser);
}


