const express = require('express');
const app = express();

app.use(express.json());

app.use(express.static('public'));

// routes api information / requests
let apiRouter = express.Router();
app.use('/api', apiRouter);


// gets users array
apiRouter.get('/:name', (req, res) => {
    let name = req.params.name;
    let userName = findUser(name);
    res.send(userName);
});





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
    return user ? user : {};
}