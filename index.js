const express = require('express');
const DB = require('./database.js');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const app = express();

let createId = require('uniqid');

// finnhub setup
const finnhub = require('finnhub');
const key = require('./finnConfig.json');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = key.apiKey;
const finnhubClient = new finnhub.DefaultApi();



// middleware
app.use(express.json());
app.use(cookieParser());
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
    let user = findUser(name);
    res.send(user);
});

// gets stock price from finnhub
apiRouter.get('/stock/:company', (req, res) => {
    const company = req.params.company;
    finnhubClient.quote(`${company}`, (error, data, response) => {
        res.send(data.c.toString());
    });
});

// Verifies an Auth Token
apiRouter.get('/user/me', async (req, res) => {
    authToken = req.cookies['token'];
    const user = await DB.findUserWithToken(authToken);
    if (user) {
        res.send({ userName: user.userName });
        return;
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

// creates a user
apiRouter.post('/auth/create', async (req, res) => {

    // makes sure user doesn't already exist
    if (await DB.getUser(req.body.userName)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {

        // creates the user
        const user = await DB.createUser(req.body.userName, req.body.password);

        // creates cookie
        setAuthCookie(res, user.token);

        res.send({
            id: user._id,
        });
    }
});

// authenticates a user
apiRouter.post('/auth/login', async (req, res) => {
    const user = await getUser(req.body.userName);

    // if user, attempts login, if not, don't
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            DB.setAuthCookie(res, user.token);
            res.send({ id: user._id });
            return;
        }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

// adds a goal to a user
apiRouter.post('/goal/:name', (req, res) => {
    let name = req.params.name;
    let userName = findUser(name);
    if (userName) {
        let goal = req.body;
        goal["id"] = createId();
        userName.goals.push(goal);
        res.send("Worked");
    } else {
        console.log('User doesn\'t exist!');
        res.send("Did not work!");
    }
});

// adds a friend to a user
apiRouter.post('/friend/:friendName', (req, res) => {
    let currentUsername = req.body.user; // string "name"
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
apiRouter.post('/', (req, res) => {
    let user = req.body.user;

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

// edits a goal's completion status
apiRouter.patch('/:user/:id', (req, res) => {
    const userName = req.params.user;
    const user = findUser(userName);
    const id = req.params.id;
    const goal = user.goals.find((g) => g.id == id);
    goal.completed = true;
    res.send(user);
});

// deletes a goal from the user's array
apiRouter.delete('/remove/:user/:id', (req, res) => {
    const userName = req.params.user;
    const user = findUser(userName);
    const id = req.params.id;
    const goal = user.goals.find((g) => g.id == id);
    user.goals.splice(user.goals.indexOf(goal), 1);
    res.send(user);
});

// deletes a friend from the user's array
apiRouter.delete('/friend/:friendName', (req, res) => {
    let friendName = req.params.friendName;
    let currentUsername = req.body.user; // string "name"
    let currentUser = findUser(currentUsername);
    currentUser.friends.splice(currentUser.friends.indexOf(friendName), 1);
    res.send(currentUser);
});

// default path if unknown
app.use((req, res) => {
    res.sendFile('index.html', { root: 'public' });
});




app.listen(4000, () => {
    console.log("Listening on port 3000!");
});



// Mock Database Information

let users = [{ name: "username", friends: [], goals: [{}] }];

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
