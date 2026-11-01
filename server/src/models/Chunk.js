const mongoose = require('mongoose');

const chunkSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  document: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: true, index: true },
  text: { type: String, required: true },
  page: Number,
  embedding: { type: [Number], required: true },
});

module.exports = mongoose.model('Chunk', chunkSchema);