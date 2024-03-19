const registerForm = document.querySelector("#register-form");

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // get inputted information
    const userName = document.querySelector("#user").value;
    const password = document.querySelector("#pw").value;

    const registerUser = await fetch('/api/auth/create', {
        method: "POST",
        body: JSON.stringify({
            userName: userName,
            password: password
        }),
        headers: {
            'content-type': 'application/json'
        }
    });
    console.log(registerUser);
});