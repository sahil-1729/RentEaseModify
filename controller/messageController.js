const getMessage = async (req, res) => {
    try {
      const messages = await req.messageRepo.messageObject;
      console.log(messages);
  
      res.render('message', {
        senderName: req.messageRepo.user1Name,
        receiverName: req.messageRepo.user2Name,
        messages: req.messageRepo.messageObject.messages,
        senderEmail: req.senderEmail,
        receiverEmail: req.receiverEmail
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  const createMessage = async (req, res) => {
    try {
      const { message, authorName } = req.body;
      if (!message || !authorName) {
        return res.status(400).json({ message: "Message and authorName both are required" });
      }
  
      const conversation = await req.messageRepo.createMessage(message, authorName);
      res.status(200).json(conversation);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  module.exports = { getMessage, createMessage };
  