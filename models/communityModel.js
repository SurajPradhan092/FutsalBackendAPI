const mongoose = require('mongoose');

const Post = mongoose.model('Post',{
  post:{ type:String},
  username: { type:String},
  userimage:{type:String},
  createdAt: { type:String},
  userid:{type:String},
  comments: [
    {
      comment: {type:String},
      cusername: {type:String},
      cuserimage: {type:String},
      ccreatedAt: {type:String},
      cuserid:{type:String}
    }
  ]
})

module.exports = Post;