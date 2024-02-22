

// set placeholders to the username in local storage
const userInfo = document.querySelector(".user-info");
userInfo.textContent = localStorage.getItem("username");