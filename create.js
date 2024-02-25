
const createForm = document.querySelector("#create-goal");


// handle form submissions and creates the goal
createForm.addEventListener('submit', (e) => {

    e.preventDefault();
    const goalContent = document.querySelector("#goal-content"); // text
    const goalType = document.querySelector("input[name='goaltype']:checked") // daily OR weekly
    const dueDate = document.querySelector(".goal-deadline") // yyyy-mm-dd

    // data validation
    if (goalContent.value.length > 300) {
        alert("Goal is too long!");
    } else if (!goalContent.value || !dueDate.value) {
        alert("Please insert a goal and a due date!");
    } else {
        alert("Success!");
    }
})
