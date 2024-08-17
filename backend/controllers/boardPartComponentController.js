const BoardPartComponentCombination = require('../models/BoardPartComponentCombination');

const getBoardPartComponents = async (req, res) => {
  const combinations = await BoardPartComponentCombination.find().populate('boardPart').populate('components');
  res.json(combinations);
};

const createBoardPartComponent = async (req, res) => {
  const { title, boardPart, components } = req.body;

  const combination = new BoardPartComponentCombination({
    title,
    boardPart,
    components,
  });

  await combination.save();
  res.status(201).json(combination);
};

const getBoardPartComponentById = async (req, res) => {
  const combination = await BoardPartComponentCombination.findById(req.params.id).populate('boardPart').populate('components');
  res.json(combination);
};

const updateBoardPartComponent = async (req, res) => {
  const { title, boardPart, components } = req.body;

  const combination = await BoardPartComponentCombination.findById(req.params.id);

  if (combination) {
    combination.title = title || combination.title;
    combination.boardPart = boardPart || combination.boardPart;
    combination.components = components || combination.components;

    await combination.save();
    res.json(combination);
  } else {
    res.status(404).json({ message: 'Combination not found' });
  }
};

const deleteBoardPartComponent = async (req, res) => {
  const combination = await BoardPartComponentCombination.findByIdAndDelete(req.params.id);
  res.json({ message: 'Combination deleted' });
};

module.exports = {
  getBoardPartComponents,
  createBoardPartComponent,
  getBoardPartComponentById,
  updateBoardPartComponent,
  deleteBoardPartComponent,
};
