const mongoose = require('mongoose');
const { Schema } = mongoose;

//authentication setup
const UserSchema = new Schema({
    name:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    password : {
        type: String,
        required : true
    },
    Date : {
        type : Date,
        default : Date.now
    }
  });

  const User = mongoose.model('user',UserSchema)
  User.createIndexes(); //creating indexes for different ids in our database

  module.exports = User