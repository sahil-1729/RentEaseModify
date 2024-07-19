const MessageRepository = require("../repository/messageRepository");

const initializeMessageRepository = async (req, res, next) => {
  try {
    const senderEmail = req.session.user.email;
    const receiverEmail = req.params.email ;

    if (!senderEmail || !receiverEmail) {
      return res.status(400).json({ message: "Sender and receiver email are required" });
    }

    const messageRepo = new MessageRepository(senderEmail, receiverEmail);
    await messageRepo.init();
    req.senderEmail=senderEmail;
    req.receiverEmail=receiverEmail;
    req.messageRepo = messageRepo;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = initializeMessageRepository;
