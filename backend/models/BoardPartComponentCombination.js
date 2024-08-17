const mongoose = require('mongoose');

const boardPartComponentCombinationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  boardPart: { type: mongoose.Schema.Types.ObjectId, ref: 'BoardPart', required: true },
  components: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Component' }],
});

const BoardPartComponentCombination = mongoose.model('BoardPartComponentCombination', boardPartComponentCombinationSchema);

module.exports = BoardPartComponentCombination;
