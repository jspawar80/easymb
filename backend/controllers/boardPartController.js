const BoardPart = require('../models/BoardPart');

const getBoardParts = async (req, res) => {
  const boardParts = await BoardPart.find().populate('model');
  res.json(boardParts);
};

const createBoardPart = async (req, res) => {
  const { name, description, model } = req.body;
  const image = req.file ? req.file.path : null;

  const boardPart = new BoardPart({
    name,
    description,
    image,
    model,
  });

  await boardPart.save();
  res.status(201).json(boardPart);
};

const getBoardPartById = async (req, res) => {
  const boardPart = await BoardPart.findById(req.params.id).populate('model');
  res.json(boardPart);
};

const updateBoardPart = async (req, res) => {
  const { name, description, model } = req.body;
  const image = req.file ? req.file.path : null;

  const boardPart = await BoardPart.findById(req.params.id);

  if (boardPart) {
    boardPart.name = name || boardPart.name;
    boardPart.description = description || boardPart.description;
    boardPart.image = image || boardPart.image;
    boardPart.model = model || boardPart.model;

    await boardPart.save();
    res.json(boardPart);
  } else {
    res.status(404).json({ message: 'Board Part not found' });
  }
};

const deleteBoardPart = async (req, res) => {
  const boardPart = await BoardPart.findByIdAndDelete(req.params.id);
  res.json({ message: 'Board Part deleted' });
};

module.exports = {
  getBoardParts,
  createBoardPart,
  getBoardPartById,
  updateBoardPart,
  deleteBoardPart,
};
