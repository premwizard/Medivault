const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  photoUrl: { type: String, default: null }
});

module.exports = mongoose.model('Record', recordSchema);
