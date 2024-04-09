export async function logOut() {
    const loggedOut = await fetch('/api/auth/logout', {
        method: "DELETE"
    });
    localStorage.setItem('username', '');
    window.location.href = '/';
}