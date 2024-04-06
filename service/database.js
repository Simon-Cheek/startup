// DATABASE SETUP

const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const config = require('./dbConfig.json');
const uuid = require('uuid');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const DB = client.db('startup').collection('users');

// Database interaction functions



// Gets the user given specified username
async function getUser(userName) {
  return await DB.findOne({ userName: userName });
}

// Gets all users
async function getAll() {
  try {
    const item = await DB.find().toArray();
    return item;
  } catch (error) {
    console.log("HELP", error);
  }
}


// Creates a new user, hashes password and assigns a token
async function createUser(userName, password) {

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    userName: userName,
    password: hashedPassword,
    token: uuid.v4(),
    friends: [],
    goals: []
  };

  await DB.insertOne(newUser);
  return newUser;
}

// Creates Auth Cookie and Sets it
function setAuthCookie(res, authToken) {
  res.cookie('token', authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// Searches for user with the authtoken
async function findUserWithToken(authToken) {
  const user = await DB.findOne({ token: authToken });
  return user;
}

// Adds a goal to a user's array
async function addGoal(userName, goal) {

  // Find the user document based on the userName
  const filter = { userName: userName };
  const update = { $push: { goals: goal } };
  const options = { returnOriginal: false };

  // Perform the update operation
  const result = await DB.findOneAndUpdate(filter, update, options);

  return result.value;
};

// Returns a user's friend array
async function getFriendList(userName) {
  const user = await DB.findOne({ userName: userName });
  return user.friends;
}

// Adds a friend to a user's array
async function addFriend(userName, friendName) {

  // Find the user document based on the userName
  const filter = { userName: userName };
  const update = { $push: { friends: friendName } };
  const options = { returnOriginal: false };

  // Perform the update operation
  const result = await DB.findOneAndUpdate(filter, update, options);

  return result.value;
};


// Finds a goal and completes it
async function completeGoal(userName, goalID) {
  const foundUser = await getUser(userName);
  const foundUserID = foundUser._id;
  const foundGoals = foundUser.goals;
  const goalToComplete = foundGoals.find((g) => g.id == goalID);
  goalToComplete.completed = true;

  // set the goals array back into the database
  const updatedGoal = await DB.updateOne({ _id: foundUserID }, { $set: { goals: foundGoals } });

  return updatedGoal;
};


// Finds a goal and deletes it
async function deleteGoal(userName, goalID) {
  const foundUser = await getUser(userName);
  const foundUserID = foundUser._id;
  const foundGoals = foundUser.goals;
  const goalToDelete = foundGoals.find((g) => g.id == goalID);
  foundGoals.splice(foundGoals.indexOf(goalToDelete), 1);

  // put back in DB goal array
  const updatedGoal = await DB.updateOne({ _id: foundUserID }, { $set: { goals: foundGoals } });

  return updatedGoal;
};

// Deletes a friend from a User's friend list
async function deleteGoal(userName, friendName) {
  const foundUser = await getUser(userName);
  const foundUserID = foundUser._id;
  const foundFriends = foundUser.friends;
  const friendToDelete = foundFriends.find((f) => f == friendName);
  foundFriends.splice(foundFriends.indexOf(friendToDelete), 1);

  // put back in DB friend array
  const updatedList = await DB.updateOne({ _id: foundUserID }, { $set: { friends: foundFriends } });

  return updatedList;
};



module.exports = {
  getAll,
  getUser,
  createUser,
  setAuthCookie,
  findUserWithToken,
  addGoal,
  completeGoal,
  deleteGoal,
  addFriend,
  getFriendList,
  deleteGoal
};