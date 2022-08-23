const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/futsaldb',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})