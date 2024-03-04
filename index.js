const express = require('express');
const app = express();

app.use(express.json());

app.use(express.static('public'));

// routes api information / requests
let apiRouter = express.Router();
app.use('/api', apiRouter);


apiRouter.get('/users/all', (req, res) => {
    res.send(users);
})

// gets specifc user
apiRouter.get('/:name', (req, res) => {
    let name = req.params.name;
    let userName = findUser(name);
    res.send(userName);
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
