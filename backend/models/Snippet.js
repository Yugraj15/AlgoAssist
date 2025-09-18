// models/Snippet.js
const mongoose = require('mongoose');

const snippetSchema = new mongoose.Schema({
  code: { type: String, required: true },
  mode: { type: String, required: true },
  algorithm: { type: String, required: false },
  aiResponse: { type: mongoose.Schema.Types.Mixed, required: true },
}, {
  timestamps: true,
});

const Snippet = mongoose.model('Snippet', snippetSchema);

module.exports = Snippet;