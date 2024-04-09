export async function register() {

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

        // Redirect or alert if failed!
        if (registerUser.status == 200) {
            localStorage.setItem('username', userName);
            window.location.href = "profile.html";
        } else {
            alert("Authentication Failed!");
        }



    });

}