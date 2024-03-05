
// set placeholders to the username in local storage
const userInfo = document.querySelector(".user-info");
if (localStorage.getItem("username")) {
    userInfo.textContent = localStorage.getItem("username");
}


// place the goals in the list-display
const dailyList = document.querySelector("#daily-list-js");
const weeklyList = document.querySelector("#weekly-list-js")
const goals = localStorage.getItem("goalList")
const totalGoals = JSON.parse(goals);

// check and get user
let currentUser = localStorage.getItem("username");
if (!currentUser) {
    currentUser = "username";
}

// fetch today's date
const curDate = new Date();


// inserts goals into div
function injectGoalHtml(goalList, area) {

    for (const goal of goalList) {

        // create a div with the goals
        let goalDiv = document.createElement("div");
        goalDiv.classList.add("goal");

        let content = document.createElement("p");
        content.innerText = goal.content;
        goalDiv.appendChild(content);

        let finishButton = document.createElement("button");
        finishButton.classList.add("finish-goal");
        finishButton.innerText = "Complete";
        finishButton.addEventListener("click", () => {
            goal.completed = true;
            localStorage.setItem("goalList", JSON.stringify(totalGoals));
            location.reload();
        })
        goalDiv.appendChild(finishButton);

        let cancelButton = document.createElement("button");
        cancelButton.classList.add("bttn-default", "bttn-delete");
        cancelButton.addEventListener("click", () => {
            totalGoals.splice(totalGoals.indexOf(goal), 1);
            localStorage.setItem("goalList", JSON.stringify(totalGoals));
            location.reload();
        })
        cancelButton.innerText = "Cancel";
        goalDiv.appendChild(cancelButton);

        area.appendChild(goalDiv);
    }
}



// Abstract Function for inserting Goals into a DIV
function inputGoals(goalType, typeStr) {

    if (goals) {

        // add Goals to daily list that match current user
        // GOALS: user, type, content, date

        // filter goals depending on status, daily goals due today, weekly goals due within a week
        let userGoals = [];
        if (typeStr == "daily") {
            userGoals = totalGoals.filter((goal) => (goal.user == currentUser) && (goal.type == "daily") && (goal.completed === false) && (new Date(goal.date).getDate() == curDate.getDate()) && (new Date(goal.date).getMonth() == curDate.getMonth()));
        } else {
            userGoals = totalGoals.filter((goal) => {
                if (goal.user != currentUser || goal.type != "weekly" || goal.completed === true) {
                    return false;
                }

                // calculate date and confirm goal is due within a week
                let goalDate = new Date(goal.date).getTime();
                let timeDiff = goalDate - curDate.getTime();
                if (0 <= timeDiff && timeDiff <= (7 * 24 * 60 * 60 * 1000)) {
                    return true;
                }
                return false;
            })
        }


        // add to DOM
        if (userGoals.length == 0) {

            // display default
            let placeholder = document.createElement("p");
            placeholder.innerText = `You haven't set any ${typeStr} goals yet!`;
            goalType.appendChild(placeholder);

        } else {

            injectGoalHtml(userGoals, goalType);

        }
    } else {
        let placeholder = document.createElement("p");
        placeholder.innerText = `You haven't set any ${typeStr} goals yet!`;
        goalType.appendChild(placeholder);
    }
}


// updates the goal count for each category on profile page
function updateStatus() {

    // count active, completed, and expired
    let activeCount = 0;
    let completedCount = 0;
    let expiredCount = 0;

    if (goals) {

        // obtain current user's goals
        const allUserGoals = totalGoals.filter((goal) => goal.user == currentUser);

        for (const goal of allUserGoals) {

            // calculate time difference between due date and current date
            let goalDate = new Date(goal.date).getTime();
            let timeDiff = goalDate - curDate.getTime();

            // add active goals to count
            if (!goal.completed && timeDiff > 0) {
                activeCount++;
            } else if (goal.completed === true) {
                completedCount++;
            } else {
                expiredCount++;
            }
        } // end for loop

        const activeStatus = document.querySelector("#active-goals");
        const completedStatus = document.querySelector("#completed-goals");
        const expiredStatus = document.querySelector("#expired-goals");

        activeStatus.innerText = (activeCount != 1) ? `${activeCount} Active Goals` : `${activeCount} Active Goal`;
        completedStatus.innerText = (completedCount != 1) ? `${completedCount} Completed Goals` : `${completedCount} Completed Goal`;
        expiredStatus.innerText = (expiredCount != 1) ? `${expiredCount} Expired Goals` : `${expiredCount} Expired Goal`;

    }

}


// for profile.html

if (dailyList) {
    inputGoals(dailyList, "daily");
    inputGoals(weeklyList, "weekly");
    updateStatus();
}




// goals.html integration
const totalList = document.querySelector("#total-list");

if (totalList && goals) {

    let userGoals = [];

    userGoals = totalGoals.filter((goal) => {

        // calculate time difference between due date and current date
        let goalDate = new Date(goal.date).getTime();
        let timeDiff = goalDate - curDate.getTime();

        // return incomplete active goals that have not expired
        return (goal.completed === false && goal.user == currentUser && timeDiff > 0)
    });

    if (userGoals.length == 0) {

        // display default
        let placeholder = document.createElement("p");
        placeholder.innerText = `You haven't set any goals yet!`;
        totalList.appendChild(placeholder);

    } else {

        // add to DOM
        injectGoalHtml(userGoals, totalList);
    }


    // add expired goals to the expired tab
    userGoals = totalGoals.filter((goal) => {

        // calculate time difference between due date and current date
        let goalDate = new Date(goal.date).getTime();
        let timeDiff = goalDate - curDate.getTime();

        // return incomplete active goals that have not expired
        return ((timeDiff <= 0 || goal.completed == true) && goal.user == currentUser);
    });

    if (userGoals.length === 0) {
        console.log("reached!");

        // display default
        let placeholder = document.createElement("p");
        placeholder.innerText = `You haven't finished any goals yet!`;
        const expiredList = document.querySelector("#expired-list");
        expiredList.appendChild(placeholder);
    } else {
        // loop through and add to div
        for (const goal of userGoals) {
            const expiredList = document.querySelector("#expired-list");
            const para = document.createElement("p");
            para.innerText = goal.content;
            if (goal.completed == true) {
                para.classList.add("green");
            } else {
                para.classList.add("red");
            }
            expiredList.appendChild(para);
        }
    }


} else if (totalList) {

    // display default
    const placeholder = document.createElement("p");
    placeholder.innerText = `You haven't set any goals yet!`;
    totalList.appendChild(placeholder);

    const expiredList = document.querySelector("#expired-list");
    const expiredPlaceholder = document.createElement("p");
    expiredPlaceholder.innerText = `You haven't finished any goals yet!`
    expiredList.appendChild(expiredPlaceholder);
}



