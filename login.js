function login() {
    const userName = document.querySelector("#user");
    if (userName.value.length > 40) {
        alert("Username is too long!");
    } else {
        localStorage.setItem("username", userName.value);
        window.location.href = "profile.html";
    }

}

const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    login();
})