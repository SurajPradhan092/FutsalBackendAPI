const express = require('express');
const router = express.Router();
const FutsalBook = require('../models/futsalbookModel');
const playerAuth = require('../middleware/playerAuth');
const nodemailer = require('nodemailer');
const SMTPPool = require('nodemailer/lib/smtp-pool');

router.post('/futsalbook', function (req, res){
    const futsalname = req.body.futsalname
    const futsalid = req.body.futsalid
    const date = req.body.date
    const time = req.body.time
    const username = req.body.username
    const userid = req.body.userid
    const email = req.body.email
    const fmail = req.body.fmail
    const data = new FutsalBook({futsalname: futsalname, futsalid: futsalid, date: date,
    time: time, username: username, userid: userid, email: email, fmail: fmail});
    data.save()
    .then(function (result){
        res.status(200).json({success: true, message: "Booking Completed"})
        var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'suraj.pradhan092@gmail.com',
    pass: 'mcys brce pews hqti'
  }
});

console.log(" look",fmail , email)
var mailOptions = {
  from: 'suraj.pradhan092@gmail.com',
  to: email,
  subject: 'otp code for booking',
  text: "User name: " + username + " has booked " +futsalname+ " for " +date+ "," +time+ "." +" This" + x + "is the otp code to show in futsal.",


};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }

  

  
});

var mailOptions = {
  from: 'suraj.pradhan092@gmail.com',
  to: fmail,
  subject: 'otp code for booking',
  text: "User name: " + username + " has booked " +futsalname+ " for " +date+ ", " +time+ "." +" This " + x + " is the otp code to compare in futsal.",
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }

  
});

    })
    .catch(function (error){
        res.status(500).json({message: error})
    })
})

let x = Math.floor((Math.random() * 200) + 1000);//


router.get('/futsalbookget', playerAuth.verifyUser, function (req, res){
    const id = req.user._id
    FutsalBook.find({ userid: id })
        .then(function (bookdata) {
            res.status(200).json({ success: true, data: bookdata });
        })
        .catch(function (error) {
            res.status(500).json({ message: error })
            console.log(error)
        })
})

router.delete('/futsalbook/delete/:id', function (req, res) {
    const id = req.params.id
    FutsalBook.deleteOne({ _id: id })
        .then(function (result) {
            res.status(200).json({ success: true, message: "Futsal Booking deleted" })
        })
        .catch(function (err) {
            res.status(500).json({ success: true, message: "Cannot delete Futsal Booking" })
        })
})



module.exports = router;