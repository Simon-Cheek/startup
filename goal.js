
// set placeholders to the username in local storage
const userInfo = document.querySelector(".user-info");
if (localStorage.getItem("username")) {
    userInfo.textContent = localStorage.getItem("username");
}


// places the goals in the list-display

const dailyList = document.querySelector("#daily-list-js");
const weeklyList = document.querySelector("weekly-list-js")