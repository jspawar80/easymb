const mongoose = require('mongoose');

const boardPartSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String }, // URL of the image
  model: { type: mongoose.Schema.Types.ObjectId, ref: 'Model', required: true },
});

const BoardPart = mongoose.model('BoardPart', boardPartSchema);

module.exports = BoardPart;
