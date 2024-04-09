
export async function friendConfig() {

    // add event listener to adding friends
    const addFriend = document.querySelector("#add-form");

    addFriend.addEventListener("submit", async (e) => {
        e.preventDefault();

        // get friend and look for friend in backend
        const newFriend = document.querySelector("#newfriend");
        const friendUser = newFriend.value;
        newFriend.value = "";
        const friend = await fetch(`/api/${friendUser}`);
        const friendInfo = await friend.json();

        // alert if no friend, else add to friend list
        if (!friendInfo.userName) {
            alert("Prospective friend does not yet exist :(");
        } else {

            // get current user and add friend to friendlist IF not already there
            const userName = localStorage.getItem("username");
            const fetchedUser = await fetch(`/api/${userName}`);
            const userObj = await fetchedUser.json();


            if (userObj.friends.includes(friendUser)) {
                alert("Friend already added!");
            } else if (friendUser == userName) {
                alert("You cannot add yourself!");
            } else {

                // add friend to friendlist
                const addFriend = await fetch(`/api/friend/${friendUser}`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ user: userName })
                });
            }

        }

        location.reload();
    })


    async function displayFriends() {
        // display the friends
        const friendList = document.querySelector(".friendlist")
        const currentUser = localStorage.getItem("username");
        const fetchedUser = await fetch(`/api/${currentUser}`);
        const userInfo = await fetchedUser.json();


        // placeholder for zero friends
        if (userInfo.friends.length == 0) {

            const placeholder = document.createElement("div");
            placeholder.classList.add("friend");

            const words = document.createElement("p");
            words.innerText = 'No friends added yet!';
            placeholder.appendChild(words);
            friendList.appendChild(placeholder);

        } else {

            // add to DOM
            for (const friend of userInfo.friends) {

                const container = document.createElement("div");
                container.classList.add("friend");

                const userText = document.createElement("p");
                userText.innerText = friend;
                container.appendChild(userText);

                // add the view profile button
                const link = document.createElement("a");
                link.href = "friend.html";

                const viewButton = document.createElement("button");
                viewButton.classList.add("bttn-default", "bttn-small");
                viewButton.innerText = "View Profile";
                link.appendChild(viewButton);
                container.appendChild(link);

                // add the remove friend button
                const removeButton = document.createElement("button");
                removeButton.classList.add("bttn-default", "bttn-delete", "bttn-small");
                removeButton.innerText = "Remove Friend";
                removeButton.addEventListener("click", async () => {
                    // friend is the variable to use
                    const removeFriend = await fetch(`/api/friend/${friend}`, {
                        method: 'DELETE',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({ user: currentUser })
                    });
                    location.reload();
                });

                container.appendChild(removeButton);
                friendList.appendChild(container);
            }
        }
    }

    displayFriends();

}