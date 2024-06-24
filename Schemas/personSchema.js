const mongoose = require('mongoose')


const personSchema = new mongoose.Schema({
    name: {
        type:String,
        required : true
    },
    age: {
        type:String,
        
    },
    work: {
        type:String,
        required : true
    },
    mobile: {
        type:Number,
        required : true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    address: {
        type:String,
    },
    salary: {
        type: Number,
        required:true
    }
})

const aadmi = mongoose.model('aadmi', personSchema);
module.exports = aadmi;
