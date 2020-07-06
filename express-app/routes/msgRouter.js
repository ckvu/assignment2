const express = require('express');
const msgController = require('../controllers/msgController');

const router = express.Router();
router.post('/messages', msgController.createMsg);
router.get('/messages', msgController.getMsgs);
router.delete('/messages/:id', msgController.deleteMsg);

module.exports = router;
