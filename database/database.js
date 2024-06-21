const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');
const Property=require('./propertySchema')
const DBURL=process.env.DBURL
mongoose.connect(DBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to the database');
});
 
const userSchema = new mongoose.Schema({
  firstname: {
    required: true,
    type: String,
  },
  lastname: {
    required: true,
    type: String,
  },
  phonenumber: {
    required: true,
    type: String,
    minlength: 10, // Corrected typo: changed 'minLength' to 'minlength'
    maxlength: 10, // Corrected typo: changed 'max' to 'maxlength'
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
    minlength: 8,
  },
  calendar:[{
    event:{
      type:String,
      required:true
    },
    startDate: {
      type: String,
      default: function () {
          return formatTime(new Date()); // Create a Date object from the timestamp
      },
  },
  
    endDate:{
      type:String,
      required:true
    },
    propertyId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Property'
    },
    userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
    }
  }]
});

const messageSchema = new mongoose.Schema({
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  messages: [{
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    authorName: String, // New field to store the author's name
    body: {
      type: String,
      required: true,
    },
    time: {
      type: Date,
      default: Date.now,
    },
  }],
}, {
  indexes: [
    { members: 1 },
    { messages: 1 },
  ],
});

function formatTime(timestamp) {
  const year = timestamp.getFullYear();
  const month = (timestamp.getMonth() + 1).toString().padStart(2, '0');
  const day = timestamp.getDate().toString().padStart(2, '0');
  const hours = timestamp.getHours().toString().padStart(2, '0');
  const minutes = timestamp.getMinutes().toString().padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}


const Message = mongoose.model('Message', messageSchema);
const User = mongoose.model('User', userSchema); // Corrected model name to 'User'

module.exports = { Router, User, Message, mongoose };
