const express = require('express');
const DB = require('./database.js');
const { launchSock, alertFriends } = require('./websock.js');
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
app.use(express.static('public', { maxAge: 3600000 }));
// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

// routes api information / requests
let apiRouter = express.Router();
app.use('/api', apiRouter);

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
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
            return;
        }
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
    const user = await DB.getUser(req.body.userName);

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
apiRouter.post('/friend/:friendName', async (req, res) => {
    let currentUsername = req.body.user; // string "name"
    let userFriends = await DB.getFriendList(currentUsername);

    let friendName = req.params.friendName;
    let friend = await DB.getUser(friendName);

    if (!friend) {
        res.status(400).send({ msg: "Friend doesn't exist!" });
        return;
    }

    if (userFriends.includes(friendName)) {
        res.status(400).send({ msg: "Already a friend!" });
        return;
    } else {
        const newFriend = await DB.addFriend(currentUsername, friendName);
        alertFriends(currentUsername, friendName);
        res.send(newFriend);
    }
});


// edits a goal's completion status
apiRouter.patch('/:user/:id', async (req, res) => {
    const userName = req.params.user;
    const id = req.params.id;
    const updatedGoals = await DB.completeGoal(userName, id);
    res.send(updatedGoals);
});

// logs current user out
apiRouter.delete('/auth/logout', (req, res) => {
    res.clearCookie('token');
    res.status(204).send();
});

// deletes a goal from the user's array
apiRouter.delete('/remove/:user/:id', async (req, res) => {
    const userName = req.params.user;
    const id = req.params.id;
    const updatedUser = await DB.deleteGoal(userName, id);
    res.send(updatedUser);
});

// deletes a friend from the user's array
apiRouter.delete('/friend/:friendName', async (req, res) => {
    let currentUsername = req.body.user; // string "name"
    let userFriends = await DB.getFriendList(currentUsername);

    let friendName = req.params.friendName;

    if (userFriends.includes(friendName)) {
        const newFriendList = await DB.deleteFriend(currentUsername, friendName);
        res.send(newFriendList);
        return;
    } else {
        res.status(400).send({ msg: "Not already a friend!" });
    }
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});



const httpServer = app.listen(4000, () => {
    console.log("Listening on port 4000!");
});

launchSock(httpServer);