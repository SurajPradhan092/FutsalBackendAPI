const mongoose = require('mongoose');

const FutsalBook = mongoose.model('FutsalBook',{
 futsalname: {type: String},
 futsalid:{type: String},
 date: {type:Date},
 time: {type:String},
 email: {type:String},
 fmail:{type:String},
 username: {type:String},
 userid: {type:String}
 
})

module.exports = FutsalBook;