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
function getUser(userName) {
  return DB.findOne({ userName: userName });
}

async function getAll() {
  try {
    const item = await DB.find().toArray();
    console.log(item);
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


module.exports = {
  getAll,
  getUser,
  createUser,
  setAuthCookie,
  findUserWithToken
};