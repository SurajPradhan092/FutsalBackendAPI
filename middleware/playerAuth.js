const jwt = require('jsonwebtoken');
const player = require('../models/playerModel');
//Main Guard
module.exports.verifyUser = function(req, res, next){
    try{
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, "secretKey")
    player.findOne({_id: data.uid})
    .then(function(result){
        // success
        req.user = result;
        next();
    })
    .catch(function(result){
        // error
        res.status('403').json({error:"Customer Auth Failed"})
    })
}
catch(e){
    res.status(403).json({error: e})
}
}


//Admin Guard
module.exports.verifyAdmin = function (req, res, next){
    if(!req.user){
        
        return res.status(401).json({message: 'Authentication Failed'})
    }
    else if(req.user.userType!== "Admin"){
        return res.status(401).json({message: "Permission Denied"})
    }
    next();
}
