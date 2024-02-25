
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
        // create the goal here and add to local Storage
        if (!localStorage.getItem("goalList")) {
            // create goalList array if not already in existance, store as STRING
            const goalArray = []
            localStorage.setItem("goalList", JSON.stringify(goalArray));
        }
        // assign default username if not existant (temporary)
        let currentUser = localStorage.getItem("username");
        if (!currentUser) {
            localStorage.setItem("username", "username");
            currentUser = "username";
        }
        // create new Goal
        const newGoal = {
            user: currentUser,
            type: goalType.value,
            content: goalContent.value,
            date: dueDate.value
        }
        // add it to localStorage
        goalList = JSON.parse(localStorage.getItem("goalList"));
        goalList.push(newGoal);
        localStorage.setItem("goalList", JSON.stringify(goalList));
        // redirect
        window.location.href = "profile.html";
    }
})
