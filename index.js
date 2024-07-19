require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const Routes=require('./routes/Routes')
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database');
const MessageRepository=require("./repository/messageRepository")
const cors = require('cors');
const corsOptions = require('./middleware/corsSettings');
const path = require('path');
const userSession = require('./session/userSession');
const port = process.env.PORT || 8800;

const app = express();
app.use(cors(corsOptions));
app.use(userSession);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine","ejs")
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("sendMessage", async (data) => {
    try {
      const { senderEmail, receiverEmail, message, authorName } = data;
      console.log("Received message data:", data);

      const messageRepo = new MessageRepository(senderEmail, receiverEmail);
      await messageRepo.init();
      const savedMessage = await messageRepo.createMessage(message, authorName);
      
      console.log("Saved message:", savedMessage);
      
      const conversation = {
        sender: savedMessage.sender,
        receiver: savedMessage.receiver,
        senderName: savedMessage.senderName,
        receiverName: savedMessage.receiverName,
        body: savedMessage.body,
        time: savedMessage.time,
      };

      io.emit("sendMessage", conversation);
    } catch (error) {
      console.error("Error handling and saving the message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


Routes(app);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app; // Export the HTTP server
