const Message = require('../models/MessageModel');

const createMsg = (req, res) => {
  const body = req.body;
  console.log('~~~~~~~~~~');

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a message'
    });
  }

  const newMsg = new Message(body);
  if (!newMsg) {
    return res.status(400).json({
      success: false,
      error: 'Couldn\'t generate the new msg from request'
    });
  }

  newMsg
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        message: body.message,
        author: body.author
      });
    })
    .catch(error => {
      return res.status(400).json({
        success: false,
        error: 'Could not save message: ' + error
      });
    });
};

const getMsgs = async (req, res) => {
  console.log('!!!!!!!!!!!');

  Message.find({}, (error, msgs) => {
    if (error) {
      return res.status(400).json({
        success: false,
        error: 'GET request made; retrieval failed'
      });
    }
    if (!msgs.length) {
      return res.status(400).json({
        success: false,
        error: 'No msgs found'
      });
    }
    return res.status(200).json({
      success: true,
      messages: msgs
    });
  });
};

module.exports = { createMsg, getMsgs };
