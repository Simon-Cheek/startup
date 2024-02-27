function login() {
    const userName = document.querySelector("#user");
    if (userName.value.length > 40) {
        alert("Username is too long!");
    } else {

        // set current username to existing
        localStorage.setItem("username", userName.value);

        // if username data doesn't already exist, create it
        if (!localStorage.getItem(`user:${userName.value}`)) {
            const newUser = {
                name: userName.value,
                friends: []
            }
            localStorage.setItem(`user:${userName.value}`, JSON.stringify(newUser));
        }

        // navigate to profile
        window.location.href = "profile.html";
    }

}

const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    login();
})
