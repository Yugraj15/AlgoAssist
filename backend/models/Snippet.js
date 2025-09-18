const mongoose = require('mongoose');

const SnippetSchema = new mongoose.Schema({
  code: { type: String, required: true },
  mode: { type: String, required: true }, // explain | debug | analyze
  algorithm: { type: String },
  aiResponse: { type: Object }, // store structured AI response
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Snippet', SnippetSchema);
