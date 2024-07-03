const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
    trim: true
  },
  to: {
    type: String,
    required: true,
    trim: true
  },
  msg: {
    type: String,
    maxLength: 50,
    trim: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
