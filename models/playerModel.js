const mongoose = require('mongoose');

const Player = mongoose.model('Player',{
    fname: {
        type: String,
        require: true
    },
    lname: {
        type: String,
        require: true
    },
    username:{
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    userType:{
        type: String,
    },
    address: {
        type: String
    },
    phone: {
        type: Number
    },
    email: {
        type: String,
        require: true
    },
    age: {
        type: Number,
    },
    tvwin: {
        type: Number,
    },
    loss: {
        type: Number,
    },
    imagepp:{
        type: String,
        default: "userpp.png"
    }
})

module.exports = Player