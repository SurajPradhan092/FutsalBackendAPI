const express = require('express');
const router = express.Router();
const Post = require('../models/communityModel');
const playerAuth = require('../middleware/playerAuth');
const { check, validationResult } = require('express-validator');


//Community Post Add
router.post('/post/add', playerAuth.verifyUser, [
    check('post', 'You cannot add empty post').not().isEmpty()
], function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const post = req.body.post;
        const username = req.user.username;
        const userimage = req.user.imagepp;
        const createdAt = new Date().toDateString();
        const userid = req.user._id;

        const data = new Post({
            post: post, username: username, userimage: userimage,
            createdAt: createdAt, userid: userid
        })
        data.save().then(function (result) {
            res.status(200).json({success:true,  message: "Post added Successfully" })
        }).catch(function (error) {
            res.status(500).json({
                message: error
            })
        })
    } else {
        res.status(500).json(errors.array())
    }
});

//Post comment add
router.put('/comment/add', playerAuth.verifyUser, function (req, res) {
    
    const id = req.body.id
    const comment = req.body.comment;
    const cusername = req.user.username;
    const cuserid = req.user._id;
    const cuserimage = req.user.imagepp;
    const ccreatedAt = new Date().toDateString();
    const query = {_id: id}
    const comments = [{
        comment:comment, cusername: cusername, cuserid: cuserid,
        cuserimage:cuserimage, ccreatedAt:ccreatedAt
    }]
    const updateComment = {
        $push: {comments: comments}
    }
    Post.findByIdAndUpdate(query, updateComment)
        .then(function (result) {
            res.status(200).json({success: true, message: "Comment Added" })
        })
        .catch(function (err) {
            res.status(500).json({success: false, message: "Comment Add failure" })
        })
})


router.get('/post/fetch', playerAuth.verifyUser, function (req, res) {
    Post.find()
        .then(function (postData) {
            res.status(200).json({ success:true, data: postData });
        })
        .catch(function (error) {
            res.status(500).json({ message: error });
        })
})

//Fetch Single Futsal
router.get('/post/fetch/:id', function (req, res) {
    const id = req.params.id
    Post.findOne({ _id: id })
        .then(function (postData) {
            res.status(200).json({ success: true, data: postData });
        })
        .catch(function (error) {
            res.status(500).json({ message: error })
            console.log(error)
        })
})


router.get('/post/comments/:id', function (req, res) {
    const id = req.params.id
    Post.findOne({ _id: id })
        .then(function (postData) {
            
                const comments = postData.comments
                res.status(200).json({ success: true, data: comments });
            
        })
        .catch(function (error) {
            res.status(500).json({ message: error })
            console.log(error)
        })
})


//Community Post Delete
router.delete('/post/delete/:id', function (req, res) {
    const id = req.params.id
    Post.deleteOne({ _id: id })
        .then(function (result) {
            res.status(200).json({ message: "Post deleted" })
        })
        .catch(function (err) {
            res.status(500).json({ message: "Cannot delete Post" })
        })
});

//Community post update
router.put('/post/update', function (req, res) {
    const post = req.body.post;
    const createdAt = new Date().toISOString();
    const id = req.body.id;
    Post.updateOne({ _id: id }, {
        post: post, createdAt: createdAt
    })
        .then(function (result) {
            res.status(200).json({ message: "Post Updated" })
        })
        .catch(function (err) {
            res.status(500).json({ message: "Post Update failure" })
        })
});


module.exports = router;