const express = require('express');
const { getMessage, createMessage } = require('../controller/messageController');
const initializeMessageRepository = require('../middleware/initializeMessageRepository');

const router = express.Router();

// Pass receiverEmail in the URL params
router.use('/messages/:email', initializeMessageRepository);

router.get('/messages/:email', getMessage);
router.post('/messages/:email', createMessage);

module.exports = router;
