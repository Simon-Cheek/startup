
// only allow signed in users onto this page
if (!localStorage.getItem("username")) {
    alert("Please Sign In!");
    window.location.href = "index.html";
}

// add event listener to adding friends
const addFriend = document.querySelector("#add-form");

addFriend.addEventListener("submit", (e) => {
    e.preventDefault();

    // get friend and look for friend in localStorage
    const newFriend = document.querySelector("#newfriend");
    const friendUser = newFriend.value;
    newFriend.value = "";
    const friendInfo = localStorage.getItem(`user:${friendUser}`)

    // alert if no friend, else add to friend list
    if (!friendInfo) {
        alert("Prospective friend does not yet exist :(");
    } else {

        // get current user and add friend to friendlist IF not already there
        const userName = localStorage.getItem("username");
        const userObj = JSON.parse(localStorage.getItem(`user:${userName}`));

        if (userObj.friends.includes(friendUser)) {
            alert("Friend already added!");
        } else {
            userObj.friends.push(friendUser);
            localStorage.setItem(`user:${userName}`, JSON.stringify(userObj));
        }

        console.log(localStorage.getItem(`user:${userName}`));
    }

    location.reload();
})



// display the friends
const friendList = document.querySelector(".friendlist")
const currentUser = localStorage.getItem("username");
const userInfo = JSON.parse(localStorage.getItem(`user:${currentUser}`));

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

        // LATER: ADD EVENT LISTENER TO ACTUALLY REMOVE FRIEND

    }
}