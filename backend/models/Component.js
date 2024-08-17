const mongoose = require('mongoose');

const componentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  image: { type: String }, // URL of the image
});

const Component = mongoose.model('Component', componentSchema);

module.exports = Component;
