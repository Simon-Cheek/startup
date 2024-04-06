const logout = document.querySelector("#logout");

logout.addEventListener('click', async (e) => {
    const loggedOut = await fetch('/api/auth/logout', {
        method: "DELETE"
    });
    localStorage.setItem('username', '');
    window.location.href = 'index.html';
});