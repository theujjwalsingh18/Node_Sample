const express = require('express')
const app = express()

// Coneecting to MongoDB Database

const db = require('./db')

// Changing the data or raw data into objects by Express.toJSON()

const bodyParser = require('body-parser')
app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.send("Welcome to the Website , How can i help you ?")
})

const personServer = require('./ServerRouts/personRouts')
const menuItem = require('./ServerRouts/menuItemRouts')


app.use('/person', personServer)
app.use('/menu', menuItem)


app.listen(3000, function () {
    console.log("Server Listening on port 3000");
})