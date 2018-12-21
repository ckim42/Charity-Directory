const mongoose = require('mongoose')

const Client = mongoose.model('Client', {
  name: String,
  description: String
});

module.exports = Client
