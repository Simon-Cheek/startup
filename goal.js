
// set placeholders to the username in local storage
const userInfo = document.querySelector(".user-info");
if (localStorage.getItem("username")) {
    userInfo.textContent = localStorage.getItem("username");
}


// place the goals in the list-display
const dailyList = document.querySelector("#daily-list-js");
const weeklyList = document.querySelector("#weekly-list-js")



// Abstract Function for inserting Goals into a DIV
function inputGoals(goalType, typeStr) {

    // check and get user
    let currentUser = localStorage.getItem("username");
    if (!currentUser) {
        currentUser = "username";
    }

    const goals = localStorage.getItem("goalList")


    if (goals) {

        // add Goals to daily list that match current user
        // GOALS: user, type, content, date
        let activeDailyGoals = [];
        const totalGoals = JSON.parse(goals);
        // console.log(totalGoals);


        // filter for user's daily goals that are due today
        const curDate = new Date()

        let userGoals = [];
        if (typeStr == "daily") {
            userGoals = totalGoals.filter((goal) => (goal.user == currentUser) && (goal.type == "daily") && (new Date(goal.date).getDate() == curDate.getDate()) && (new Date(goal.date).getMonth() == curDate.getMonth()));
        } else {
            userGoals = totalGoals.filter((goal) => {
                if (goal.user != currentUser || goal.type != "weekly") {
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
                cancelButton.addEventListener("click", () => {
                    totalGoals.splice(totalGoals.indexOf(goal), 1);
                    localStorage.setItem("goalList", JSON.stringify(totalGoals));
                    location.reload();
                })
                cancelButton.innerText = "Cancel";
                goalDiv.appendChild(cancelButton);

                goalType.appendChild(goalDiv);
            }
        }

    } else {
        let placeholder = document.createElement("p");
        placeholder.innerText = `You haven't set any ${typeStr} goals yet!`;
        goalType.appendChild(placeholder);
    }
}

inputGoals(dailyList, "daily");
inputGoals(weeklyList, "weekly");

