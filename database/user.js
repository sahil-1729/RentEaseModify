const bcrypt = require('bcryptjs');
const express = require('express');
const Router = express.Router(); // Create an express Router without specifying a base URL
const { User,Message } = require('./database');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Property = require('./propertySchema');

function formatTime(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}
const EMAIL=process.env.EMAIL
const PASSWORD=process.env.PASSWORD
const RENTALTOKEN=process.env.RENTALTOKEN
let mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL,
    pass: PASSWORD
  },
});

// Function to generate OTP
function generateOTP() {
  var digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

// Authentication middleware
async function authenticate(req, res, next) {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res.send('Please log in again.');
  }
  try {
    const emailFromToken = jwt.verify(token, RENTALTOKEN);
    req.email = emailFromToken.email; // Store email in the req object for later use
    next();
  } catch (error) {
    return res.send('Please log in again.');
  }
}

Router.get('/api/user/getUser', async (req, res) => {
  try {
    const searchQuery = req.query.search;

    if (!searchQuery) {
      // If no search query provided, render the search page with no results
      return res.render('searchUser', { UserDetails: [] });
    }

    const details = searchQuery.split(' ');
    const detailsfirstName = details[0];
    console.log(detailsfirstName);

    const UserDetails = await User.find(
      { firstname: detailsfirstName },
      { password: 0 } // Exclude the 'password' field
    );

    console.log(UserDetails);

    res.render('searchUser', { UserDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

Router.get('/api/user/chat/:id', authenticate, async (req, res) => {
  try {
    const id = req.params.id;
    const receiverDetails = await User.findOne({ _id: id }, { password: 0 });
    const email = req.email;
    const senderDetails = await User.findOne({ email: email });
    
    // Find the existing message document for these members
    const existingMessage = await Message.findOne({
      $and: [
        { members: receiverDetails._id },
        { members: senderDetails._id },
      ],
    });

    if (!existingMessage) {
      // If no existing message document is found, create a new one
      const newMessage = new Message({
        members: [receiverDetails._id, senderDetails._id],
        messages: [],
      });

      await newMessage.save(); // Save the new message document
    }

    // Retrieve the messages from the message document (whether existing or newly created)
    const messages = await Message.find({
      $and: [
        { members: receiverDetails._id },
        { members: senderDetails._id },
      ],
    }).lean();
    console.log(messages[0].messages)
    const receiverName = receiverDetails.firstname + " " + receiverDetails.lastname;
    const senderName = senderDetails.firstname + " " + senderDetails.lastname;
    
    // Modify the messages to include author names
    const modifiedMessages = messages[0].messages.map(msg => {
      const date=msg.time.toString().substring(0,16)
      console.log(date)
      const time=formatTime(msg.time)
      if (msg.author.toString() === senderDetails._id.toString()) {
        return { ...msg, author: senderName,time,date };
      } else {
        return { ...msg, author: receiverName,time,date };
      }
    });

    const sendMessage = {
      senderId: senderDetails._id,
      senderName: senderName,
      receiverId: receiverDetails._id,
      receiverName: receiverName,
      messages: modifiedMessages ? modifiedMessages : [],
    };
    console.log(sendMessage)
    res.render('message', sendMessage);
  } catch (error) {
    console.log(error);
  }
});




Router.get('/api/user/signup', (req, res) => {
  res.render('signup');
});

var details;
var otp;

Router.post('/api/user/signup', async (req, res) => {
  const { firstname, lastname, email, password, phonenumber } = req.body;
  details = req.body;
  console.log(details);
  if (!firstname || !lastname || !email || !password || !phonenumber) {
    res.send('Please fill out all the details.');
  } else {
    try {
      const existingUser = await User.findOne({ email: email,phonenumber:phonenumber });
      console.log(existingUser)
      if (existingUser) {
        res.send('User already exists.');
      } else {
        otp = generateOTP();
        let mailDetails = {
          from: 'RentEase',
          to: [email],
          subject: 'OTP verification',
          text: `Hi ${firstname} ${lastname}, your OTP for email verification is ${otp}`,
        };
        mailTransporter.sendMail(mailDetails, function (err, data) {
          if (err) {
            console.log('Error Occurs');
            console.error(err);
            res.send('Error sending OTP.');
          } else {
            console.log('Email sent successfully with the OTP as ', otp);
            res.send(`Email sent successfully with the OTP as ${otp}`);
          }
        });
      }
    } catch (error) {
      console.error(error);
      res.send('Some error occurred.');
    }
  }
});

Router.get('/api/user/login', (req, res) => {
  res.render('login');
});

Router.post('/api/user/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  if (!email || !password) {
    res.send('Please fill out all the details.');
  } else {
    try {
      const existingUser = await User.findOne({ email: email });

      if (!existingUser) {
        res.send('User not found');
      } else {
        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        console.log(passwordMatch);
        if (passwordMatch) {
          const token = jwt.sign({ email: existingUser.email }, RENTALTOKEN);
          console.log(token);
          res.cookie('token', token, { httpOnly: true, expires: new Date(Date.now() + 60 * 50000) });
          res.send('authenticated')
        } else {
          res.send('Incorrect password.');
        }
      }
    } catch (error) {
      console.error(error);
      res.send('User not found.');
    }
  }
});

Router.get('/api/user/otp', (req, res) => {
  res.render('otp');
});

Router.post('/api/user/otp', async (req, res) => {
  const { email_otp } = req.body;
  console.log('Entered OTP:', email_otp);
  try {
    if (otp === email_otp) {
      const hashedPassword = await bcrypt.hash(details.password, 10);
      const newUser = new User({
        firstname: details.firstname,
        lastname: details.lastname,
        email: details.email,
        password: hashedPassword,
        phonenumber: details.phonenumber,
      });
      const saveData = await newUser.save();
      const token = jwt.sign({ email: details.email }, RENTALTOKEN);
      console.log(token);
      res.cookie('token', token, { httpOnly: true, expires: new Date(Date.now() + 60 * 50000) });
      res.send('authenticated')
    } else {
      console.log('OTP Verification Failed');
      return res.status(500).json({ message: 'OTP verification failed.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

Router.get('/api/user/profile',authenticate,async (req,res)=>{
  const email=req.email
  console.log(email)
  try{
    const details=await User.findOne({email:email})
    const Properties=await Property.find({contactNo:details.phonenumber})
    res.render('UserProfile',{
      details,Properties
    })
  }catch(err){
    console.log(err)
  }
})

module.exports = {authenticate,Router}

