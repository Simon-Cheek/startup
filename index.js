const express = require('express');
const app = express();

app.use(express.json());

app.use(express.static('public'));

// routes api information / requests
let apiRouter = express.Router();
app.use('/api', apiRouter);

// gets a list of all users
apiRouter.get('/users/all', (req, res) => {
    res.send(users);
})

// gets specifc user
apiRouter.get('/:name', (req, res) => {
    let name = req.params.name;
    let userName = findUser(name);
    res.send(userName);
});

// adds a goal to a user
apiRouter.post('/goal/:name', (req, res) => {
    let name = req.params.name;
    let userName = findUser(name);
    if (userName) {
        let goal = req.body;
        userName.goals.push(goal);
        res.send(1);
    } else {
        console.log('User doesn\'t exist!');
        res.send(0);
    }
});

// adds a friend to a user
apiRouter.post('/friend/:friendName', (req, res) => {
    let currentUsername = req.body; // string "name"
    let friendName = req.params.friendName;
    if (findUser(friendName)) {
        let currentUser = findUser(currentUsername);
        currentUser.friends.push(friendName);
        res.send(currentUser);
    } else {
        console.log("Friend does not exist!");
        res.send(0);
    }
});

// adds a user to the array
apiRouter.post('/:user', (req, res) => {
    let user = req.body;

    // parse out prospective username to make sure username isn't already in use
    let name = user.name;
    let existingUser = findUser(name);


    if (user.name && user.friends && user.goals && !existingUser) {

        // push user to array of users
        users.push(user);
        res.send(users);
    } else {
        console.log("Tried to create invalid user!");
        res.send([]);
    }
});

// deletes a goal from the user's array
apiRouter.delete('/goal/:user', (req, res) => {
    let goal = req.body;
    let userName = req.params.user;
    const user = findUser(userName);
    user.splice(user.goals.indexOf(goal), 1);
    res.send(user);
});

// deletes a friend from the user's array
apiRouter.delete('/friend/:friendName', (req, res) => {
    let friendName = req.params.friendName;
    let currentUsername = req.body; // string "name"
    let currentUser = findUser(currentUsername);
    currentUser.friends.splice(currentUser.friends.indexOf(friendName), 1);
    res.send(currentUser);
})





app.listen(3000, () => {
    console.log("Listening on port 3000!");
});



// Mock Database Information

let users = [{ name: "test", friends: [], goals: [{}] }];

/* 

USER
name: name
friends: []
goals: [{}]

GOAL
type: daily/weekly
content: content
date: date
completed: false


*/


// Database Manipulation Placeholders

// search for user within array of users
function findUser(name) {
    let user = users.find((u) => {
        return u.name == name;
    });
    return user ? user : null;
}
