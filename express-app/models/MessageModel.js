const mongoose = require('mongoose');

const msgSchema = new mongoose.Schema({
  message: String,
  author: String
}, {
  versionKey: false
});

const Message = mongoose.model('Message', msgSchema);

module.exports = Message;
