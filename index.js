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

// gets a list of all users DELETE THIS BEFORE DEPLOY
apiRouter.get('/users/all', async (req, res) => {
    const users = await DB.getAll();
    res.send(users);
})

// gets specifc user
apiRouter.get('/:name', async (req, res) => {
    try {
        let name = req.params.name;
        const { _id, userName, friends, goals } = await DB.getUser(name);
        res.send({ _id, userName, friends, goals });
    } catch (error) {
        res.send(error);
    }

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
        DB.setAuthCookie(res, user.token);

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
apiRouter.post('/goal/:name', async (req, res) => {
    let name = req.params.name;
    let goal = req.body;
    goal.id = createId();
    const updatedGoal = await DB.addGoal(name, goal);
    res.send(updatedGoal);
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
apiRouter.patch('/:user/:id', async (req, res) => {
    const userName = req.params.user;
    const id = req.params.id;
    const updatedGoals = await DB.completeGoal(userName, id);
    res.send(updatedGoals);
});

// deletes a goal from the user's array
apiRouter.delete('/remove/:user/:id', async (req, res) => {
    const userName = req.params.user;
    const id = req.params.id;
    const updatedUser = await DB.deleteGoal(userName, id);
    res.send(updatedUser);
    // const goal = user.goals.find((g) => g.id == id);
    // user.goals.splice(user.goals.indexOf(goal), 1);
    // res.send(user);
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
    console.log("Listening on port 4000!");
});