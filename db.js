const mongoose = require('mongoose')
require('dotenv').config();

// const mongoUrl = 'mongodb://127.0.0.1:27017/hotels';

const mongoUrl = process.env.MONGO_URL

mongoose.connect(mongoUrl, {
    // useNewUrlPaser: true,
    // useUnifiedTopology:true
})


const db = mongoose.connection;

db.on('connected', () => {
    console.log("Connetcted to MongoDB");
})
db.on('disconnected', () => {
    console.log("Disconnected from MongoDB");
})
db.on('error', () => {
    console.log("MongoDB connection error");
})

module.exports = db