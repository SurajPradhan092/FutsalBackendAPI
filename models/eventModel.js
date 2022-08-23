const mongoose = require('mongoose');

const Event = mongoose.model('Event',{
    name: {type:String},
    description:{type:String},
    image:{type:String},
    date:{type:String},
    fee: {type: String},
    phone:{type: Number},
    location:{type:String},
    approve:{type:Boolean},
    userid:{type:String}
});

module.exports = Event;