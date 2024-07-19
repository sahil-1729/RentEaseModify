const UserRepository = require("./userRepository");
const Message = require("../models/message");
const formatDateTime=require("../helpers/formatDateTime")

class MessageRepository extends UserRepository {
  constructor(senderEmail, receiverEmail) {
    super();
    this.senderEmail = senderEmail;
    this.receiverEmail = receiverEmail;
    this.user1 = null;
    this.user2 = null;
    this.user1Name = null;
    this.user2Name = null;
    this.messageObject = null;
  }

  async init() {
    if (!this.senderEmail || !this.receiverEmail) {
      throw new Error("User can't be found");
    }
    this.user1 = await this.getUserByEmail(this.senderEmail);
    this.user2 = await this.getUserByEmail(this.receiverEmail);
    if (!this.user1 || !this.user2) {
      throw new Error("User can't be found");
    }

    this.user1Name = `${this.user1.firstname} ${this.user1.lastname}`;
    this.user2Name = `${this.user2.firstname} ${this.user2.lastname}`;
    console.log(this.user1Name, this.user2Name);

    let messages = await Message.find({
      $or: [
        { sender: this.user1._id, receiver: this.user2._id },
        { sender: this.user2._id, receiver: this.user1._id },
      ],
    });

    if (messages.length === 0) {
      messages = [];
    }

    this.messageObject = {
      sender: this.user1._id,
      receiver: this.user2._id,
      senderName: this.user1Name,
      receiverName: this.user2Name,
      messages: messages.map((msg)=>({
        ...msg.toObject(),
        time:formatDateTime(msg.time)
      }))
    };
    

    console.log(this.messageObject);
  }

  async createMessage(message, authorName) {
    if (!this.user1 || !this.user2) {
      throw new Error("Users are not initialized");
    }

    let sender, receiver, senderName, receiverName;

    if (this.user1Name === authorName) {
      sender = this.user1._id;
      receiver = this.user2._id;
      senderName = this.user1Name;
      receiverName = this.user2Name;
    } else if (this.user2Name === authorName) {
      sender = this.user2._id;
      receiver = this.user1._id;
      senderName = this.user2Name;
      receiverName = this.user1Name;
    } else {
      throw new Error("Author name does not match either user");
    }

    const newMessage = new Message({
      sender: sender,
      receiver: receiver,
      senderName: senderName,
      receiverName: receiverName,
      body: message,
      time: Date.now(),
    });

    const savedMessage = await newMessage.save();
    return savedMessage;
  }
}

module.exports = MessageRepository;