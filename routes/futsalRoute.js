const express = require('express');
const router = express.Router();
const Futsal = require('../models/futsalModel');
const playerAuth = require('../middleware/playerAuth');
const { check, validationResult } = require('express-validator');
const upload = require('../middleware/imgUpload')

// Futsal Register
router.post('/futsal/register', playerAuth.verifyUser, upload.single('image'), function (req, res) {
    // const errors = validationResult(req);
    if (req.file == undefined) {
        res.status(500).json({ message: "File type mismatch" })
    }
    // if(errors.isEmpty()){
    const name = req.body.name;
    const address = req.body.address;
    const phoneNumber = req.body.phoneNumber;
    const description = req.body.description;
    const image = req.file.filename;
    const grounds = req.body.grounds;
    const fee = req.body.fee;
    // const fmail = req.body.fmail;
    const userid = req.body.userid;
    const approve = req.body.approve;
    const data = new Futsal({
        name: name, address: address, phoneNumber: phoneNumber, description: description,
        image: image, grounds: grounds, fee: fee, userid: userid, approve: approve
    })
    data.save()
        .then(function (result) {
            // success
            res.status(200).json({ message: "Futsal registered successfully" })
        }).catch(function (error) {
            res.status(500).json({ message: error })
        })
    // }
    // else{
    //     res.status(500).json(errors.array())
    // }
})

router.get('/futsal/fetch', function (req, res) {
    Futsal.find()
        .then(function (futsalData) {
            res.status(200).json({ success:true, data: futsalData, count: futsalData.length });
        })
        .catch(function (error) {
            res.status(500).json({ success:false, message: error });
        })
})

router.get('/futsal/fetchuser', playerAuth.verifyUser, function(req,res){
    Futsal.find({userid: req.user._id})
    .then(function (futsaldata){
        res.status(200).json({ success: true, data: futsaldata})
    })
    .catch(function (error){
        res.status(500).json({message: error})
    })
})

//Fetch Single Futsal
router.get('/futsal/fetch/:id', function (req, res) {
    const id = req.params.id
    Futsal.findOne({ _id: id })
        .then(function (futsaldata) {
            res.status(200).json({ success: true, data: futsaldata });
        })
        .catch(function (error) {
            res.status(500).json({ message: error })
            
        })
})

// Futsal Delete
router.delete('/futsal/delete/:id', function (req, res) {
    const id = req.params.id
    Futsal.deleteOne({ _id: id })
        .then(function (result) {
            res.status(200).json({ message: "Futsal deleted" })
        })
        .catch(function (err) {
            res.status(500).json({ message: "Cannot delete Futsal" })
        })
})


// Futsal update
router.put('/futsal/update',  playerAuth.verifyUser, function (req, res) {
    const name = req.body.name;
    const address = req.body.address;
    const phoneNumber = req.body.phoneNumber;
    const description = req.body.description;
    const fmail = req.body.fmail;
    const grounds = req.body.grounds;
    const fee = req.body.fee;
    const id = req.body.id;
    Futsal.updateOne({ _id: id }, {
        name: name, address: address, phoneNumber: phoneNumber,
        description: description, fmail: fmail, grounds: grounds, fee: fee
    })
        .then(function (result) {
            res.status(200).json({ message: "Futsal Updated" })
        })
        .catch(function (err) {
            res.status(500).json({ message: "Update failure" })
        })
})


router.put('/futsaladmin/update', playerAuth.verifyUser, playerAuth.verifyAdmin, function (req, res) {
    
    var objectid = require('mongodb').ObjectID;
    const approve = req.body.approve;
    const id = objectid(req.body._id);
    Futsal.updateOne({ _id: id }, {
        approve: approve
    })
        .then(function (result) {
            res.status(200).json({result, message: "Futsal Updated" })
        })
        .catch(function (err) {
            res.status(500).json({ message: "Update failure" })
        })
})
module.exports = router