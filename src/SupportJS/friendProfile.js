
export async function getFriend(friendName) {

    function filterWeekly(goal, curDate) {
        if (goal.type != "weekly" || goal.completed === true) {
            return false;
        }

        // calculate date and confirm goal is due within a week
        let goalDate = new Date(goal.date).getTime();
        let timeDiff = goalDate - curDate.getTime();
        if (0 <= timeDiff && timeDiff <= (7 * 24 * 60 * 60 * 1000)) {
            return true;
        }
        return false;
    }


    // updates the goal count for each category on profile page
    function updateStatus(userObj) {

        // count active, completed, and expired
        let activeCount = 0;
        let completedCount = 0;
        let expiredCount = 0;

        if (userObj.goals) {

            for (const goal of userObj.goals) {

                // fetch today's date
                const curDate = new Date();

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



    // main function



    if (!friendName) {
        window.location.href = "/profile";
    } else {
        const friendInfo = await fetch(`/api/${friendName}`);
        if (friendInfo.ok) {


            // fetch today's date
            const curDate = new Date();

            // Make username show on screen
            let nameHolder = document.querySelector(".collab");
            nameHolder.innerText = friendName;

            // Convert into object and display stats
            const friendObj = await friendInfo.json();
            updateStatus(friendObj);


            // Display Goals
            for (const goal of friendObj.goals) {

                const dailyList = document.querySelector("#daily-list-js");
                const weeklyList = document.querySelector("#weekly-list-js");
                const expiredList = document.querySelector("#expired-list-js");

                if ((goal.type == "daily") && (goal.completed === false) && (new Date(goal.date).getDate() == curDate.getDate()) && (new Date(goal.date).getMonth() == curDate.getMonth())) {
                    let content = document.createElement("p");
                    content.innerText = goal.content;
                    content.style.fontStyle = "italic";
                    dailyList.appendChild(content);

                } else if (filterWeekly(goal, curDate)) {
                    let content = document.createElement("p");
                    content.innerText = goal.content;
                    content.style.fontStyle = "italic";
                    weeklyList.appendChild(content);

                } else {
                    let content = document.createElement("p");
                    content.innerText = goal.content;
                    if (goal.completed == true) {
                        content.classList.add("green");
                    } else {
                        content.classList.add("red");
                    }


                    expiredList.appendChild(content);
                }
            }









        }
    }

}