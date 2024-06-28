const { Server } = require('socket.io');
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