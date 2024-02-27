if (!localStorage.getItem("username")) {
    alert("Please Sign In!");
    window.location.href = "index.html";
}

console.log(localStorage.getItem("username"));