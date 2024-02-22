function login() {
    const userName = document.querySelector("#user");
    localStorage.setItem("username", userName.value);
    window.location.href = "profile.html";
}

const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    login();
})