
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

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.querySelector("user");
    const password = document.querySelector("pw");
});