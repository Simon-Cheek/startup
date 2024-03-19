import { setDueDate } from './parseDate.js';


const createForm = document.querySelector("#create-goal");



// handle form submissions and creates the goal
createForm.addEventListener('submit', async (e) => {

    e.preventDefault();
    const goalContent = document.querySelector("#goal-content"); // text
    const goalType = document.querySelector("input[name='goaltype']:checked") // daily OR weekly
    const dueDate = document.querySelector(".goal-deadline") // yyyy-mm-dd

    // convert current date to date object and set current date
    const goalDate = setDueDate(dueDate.value);
    const curDate = new Date();

    // data validation
    if (goalContent.value.length > 300) {
        alert("Goal is too long!");
    } else if (!goalContent.value || !dueDate.value) {
        alert("Please insert a goal and a due date!");
    } else if (curDate > goalDate) {
        alert("Please choose a date in the future!");
    } else {

        let currentUser = localStorage.getItem("username");

        // create new Goal
        const newGoal = {
            type: goalType.value,
            content: goalContent.value,
            date: goalDate,
            completed: false
        }

        // add it to server
        const createGoal = await fetch(`/api/goal/${currentUser}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newGoal)
        });
        const response = await createGoal.text();



        // redirect to profile page
        window.location.href = "profile.html";
    }
})
