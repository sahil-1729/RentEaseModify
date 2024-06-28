const mongoose = require("../config/database");
const messageSchema = new mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
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
      },
    ],
  },
  {
    indexes: [{ members: 1 }, { messages: 1 }],
  }
);

const Message = mongoose.model("Message", messageSchema);
Message.then(() => {
  console.log("Message model created");
}).catch((err) => {
  console.log(err);
});

module.exports = Message;
