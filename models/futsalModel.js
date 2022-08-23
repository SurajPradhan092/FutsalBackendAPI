const mongoose = require('mongoose');

const Futsal = mongoose.model('Futsal',{
    name:{
        type: String,
        require:true
    },
    address:{
        type: String,
        require:true
    },
    phoneNumber:{
        type: Number,
        require:true
    },
    fmail:{
        type: String

    },
    description:{
        type: String
    },
    image:{
        type: String
    },
    grounds:{
        type: Number
    },
    fee:{
        type: String
    },
    userid:{
        type:String
    },
    approve:{
        type: Boolean
    }
})

module.exports = Futsal