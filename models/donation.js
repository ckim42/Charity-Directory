const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Donation = mongoose.model('Donation', {
  title: String,
  content: String,
  clientId: { type: Schema.Types.ObjectId, ref: 'Client' }
});

module.exports = Donation;
