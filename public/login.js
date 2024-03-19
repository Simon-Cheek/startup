
// redirect to profile if logged in
async function verify() {
    const user = await fetch('/api/user/me');
    if (user.status == 200) {
        const userInfo = await user.json();
        localStorage.setItem('username', userInfo.userName);
        window.location.href = 'profile.html';
    }
}

verify();


// otherwise, add login features below
const loginForm = document.querySelector("#login-form");

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = document.querySelector("#user").value;
    const password = document.querySelector("#pw").value;
    console.log(user, password);
    const loginUser = await fetch('/api/auth/login', {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            userName: user,
            password: password
        })
    });

    // failed login
    if (loginUser.status == 401) {
        alert("Unauthorized login or user doesn't exist!");

        // successful login
    } else if (loginUser.status == 200) {
        localStorage.setItem("username", user);
        window.location.href = 'profile.html';

    } else {
        alert("Something unexpected happened!");
    }

});