const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    senderName: {
      type: String,
      required: true,
    },
    receiverName: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    time: {
      type: Date,
      default: Date.now,
    },
  }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
