const express = require('express')
const app = express()

// Coneecting to MongoDB Database

const db = require('./db')

// Changing the data or raw data into objects by Express.toJSON()

const bodyParser = require('body-parser')
app.use(bodyParser.json());

// Getting details from env
require('dotenv').config();
const PORT = process.env.PORT || 3000


app.get('/', function (req, res) {
    res.send("Welcome to the Website , How can i help you ?")
})

const personServer = require('./ServerRouts/personRouts')
const menuItem = require('./ServerRouts/menuItemRouts')


app.use('/person', personServer)
app.use('/menu', menuItem)


app.listen(PORT, function () {
    console.log("Server Listening on port 3000");
})