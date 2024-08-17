const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String }, // URL of the image
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
});

const Model = mongoose.model('Model', modelSchema);

module.exports = Model;
