const express = require('express')
const app = express()
const passport = require('./auth')
// Coneecting to MongoDB Database

const db = require('./db')

// Changing the data or raw data into objects by Express.toJSON()

const bodyParser = require('body-parser')
app.use(bodyParser.json());

// Getting details from env
require('dotenv').config();
const PORT = process.env.PORT || 3030;

// Creating MiddleWares Now

const logChache = (req, res, done) => {
    console.log(`Visiting Time is : [${new Date().toLocaleString}] Request Made to : ${req.originalUrl}`);
}

app.use(passport.initialize());
const loginMWare = passport.authenticate('local', { session: false });


// Applying Middleware to  main page
// app.get('/',logChache, function (req, res) {

app.get('/',function (req, res) {
    res.send("Welcome to the Website , How can i help you ?")
})

const personServer = require('./Routes/personRouts')
const menuItem = require('./Routes/menuItemRouts')


app.use('/person',loginMWare, personServer)
app.use('/menu', menuItem)


app.listen(PORT, function () {
    console.log(`Server Listening on port ${PORT}`);
})