const Message = require('../models/MessageModel');

const createMsg = async (req, res) => {
  const body = req.body;

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
  Message.find({}, (error, msgs) => {
    if (error) {
      return res.status(400).json({
        success: false,
        error: 'GET request made; retrieval failed'
      });
    }
    if (!msgs.length) {
      return res.status(404).json({
        success: false,
        messages: []
      });
    }
    return res.status(200).json({
      success: true,
      messages: msgs
    });
  });
};

const deleteMsg = async (req, res) => {
  Message.deleteOne({ _id: req.params.id }, (error) => {
    if (error) {
      return res.status(400).json({
        success: false,
        error: 'DELETE request made, but failed'
      });
    } else {
      return res.status(201).json({
        success: true
      });
    }
  });
};

module.exports = { createMsg, getMsgs, deleteMsg };
