
// set placeholders to the username in local storage
const userInfo = document.querySelector(".user-info");
if (localStorage.getItem("username")) {
    userInfo.textContent = localStorage.getItem("username");
}


// place the goals in the list-display
const dailyList = document.querySelector("#daily-list-js");
const weeklyList = document.querySelector("weekly-list-js")
const currentUser = localStorage.getItem("username");
if (!currentUser) {
    currentUser = "username";
}
console.log(currentUser);


const goals = localStorage.getItem("goalList")
if (goals) {

    // add Goals to daily list that match current user
    // GOALS: user, type, content, date
    let activeDailyGoals = [];
    const totalGoals = JSON.parse(goals);


    // filter for user's daily goals that are due today
    const curDate = new Date()
    console.log(totalGoals);
    console.log(new Date(totalGoals[2].date).getDate);
    const userGoals = totalGoals.filter((goal) => (goal.user == currentUser) && (goal.type == "daily") && (new Date(goal.date).getDate() == curDate.getDate()) && (new Date(goal.date).getMonth() == curDate.getMonth()));

    // add to DOM
    if (userGoals.length == 0) {

        // display default
        let placeholder = document.createElement("p");
        placeholder.innerText = "You haven't set any daily goals yet!";
        dailyList.appendChild(placeholder);

    } else {

        for (const goal of userGoals) {

            // create a div with the goals
            let goalDiv = document.createElement("div");
            goalDiv.classList.add("goal");

            let content = document.createElement("p");
            content.innerText = goal.content;
            goalDiv.appendChild(content);

            let finishButton = document.createElement("button");
            finishButton.classList.add("finish-goal");
            finishButton.innerText = "Complete";
            goalDiv.appendChild(finishButton);

            let cancelButton = document.createElement("button");
            cancelButton.classList.add("bttn-default", "bttn-delete");
            cancelButton.innerText = "Cancel";
            goalDiv.appendChild(cancelButton);

            dailyList.appendChild(goalDiv);
            console.log(dailyList.innerHTML);
        }
    }

}

