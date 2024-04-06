async function verify() {
    const user = await fetch('/api/user/me');
    if (user.status !== 200) {
        window.location.href = "index.html"
    } else {
        const userInfo = await user.json();
        localStorage.setItem('username', userInfo.userName);
    }
}

setTimeout(verify, 500);


// async function login() {
//     const userName = document.querySelector("#user");
//     if (userName.value.length > 40) {
//         alert("Username is too long!");
//     } else {

//         // set current username to existing
//         localStorage.setItem("username", userName.value);

//         // if username data doesn't already exist, create it
//         const user = await fetch(`/api/${userName.value}`);
//         const userInfo = await user.text();
//         if (!userInfo) {
//             const newUser = {
//                 name: userName.value,
//                 friends: [],
//                 goals: [],
//             };
//             const createUser = await fetch('/api', {
//                 method: 'POST',
//                 headers: {
//                     'content-type': 'application/json'
//                 },
//                 body: JSON.stringify({ user: newUser })
//             });
//         }

//         // navigate to profile
//         window.location.href = "profile.html";
//     }

// }

// const loginForm = document.querySelector("#login-form");
// loginForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     login();
// })
