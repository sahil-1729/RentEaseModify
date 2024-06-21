/* The code you provided is a server-side JavaScript code using the Express.js framework. It sets up a
server that listens on a specified port (either the value of the `PORT` environment variable or
8800) and handles HTTP requests. */
const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config()
const app = express();
const http = require('http');
const path = require('path');
const server = http.createServer(app);
const { Server } = require('socket.io');
const { Message } = require('./database/database');
const io = new Server(server);
const port = process.env.PORT || 8800;
const cors = require('cors');
const FRONTENDURL=process.env.FRONTENDURL
const corsOptions = {
  origin: FRONTENDURL, // Change this to the origin of your frontend application
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Pass cookies, if any
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'public')));

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');

app.use(require('./database/property')); // Define property routes in propertyRoutes.js
app.use(require('./database/user').Router); // Define user routes in userRoutes.js
app.use(require('./database/calendar'))
io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  socket.emit('a user connected', socket.id);

  socket.on('sendMessage', async (message) => {
    console.log(message);

    try {
      // Find or create a Message document based on the receiverId and senderId
      let receiverMessage = await Message.findOne({
        $and: [
          { members: message.receiverId },
          { members: message.senderId },
        ],
      });

      console.log(receiverMessage);

      // If a message document for the receiver doesn't exist, create it
      if (!receiverMessage) {
        receiverMessage = new Message({
          members: [message.receiverId, message.senderId],
          messages: [],
        });
      }

      // Create a new message object
      const newMessage = {
        author: message.senderId,
        authorName: message.authorName, // Include authorName
        body: message.body.trim(),
        time: new Date(),
      };
      console.log(newMessage);

      // Add the new message to the receiver's message document
      if (!receiverMessage.messages) {
        receiverMessage.messages = [];
      }
      receiverMessage.messages.push(newMessage);

      // Save the receiver's message document
      await receiverMessage.save();
      console.log('saved');

      // Broadcast the message to all connected clients
      io.emit('sendMessage', newMessage);
    } catch (error) {
      console.error('Error handling and saving the message:', error);
    }
  });
});


module.exports = server; // Export the HTTP server
