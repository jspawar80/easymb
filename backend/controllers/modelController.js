const Model = require('../models/Model');

const getModels = async (req, res) => {
  const models = await Model.find().populate('category');
  res.json(models);
};

const createModel = async (req, res) => {
  const { name, description, category } = req.body;
  const image = req.file ? req.file.path : null;

  const model = new Model({
    name,
    description,
    image,
    category,
  });

  await model.save();
  res.status(201).json(model);
};

const getModelById = async (req, res) => {
  const model = await Model.findById(req.params.id).populate('category');
  res.json(model);
};

const updateModel = async (req, res) => {
  const { name, description, category } = req.body;
  const image = req.file ? req.file.path : null;

  const model = await Model.findById(req.params.id);

  if (model) {
    model.name = name || model.name;
    model.description = description || model.description;
    model.image = image || model.image;
    model.category = category || model.category;

    await model.save();
    res.json(model);
  } else {
    res.status(404).json({ message: 'Model not found' });
  }
};

const deleteModel = async (req, res) => {
  const model = await Model.findByIdAndDelete(req.params.id);
  res.json({ message: 'Model deleted' });
};

module.exports = {
  getModels,
  createModel,
  getModelById,
  updateModel,
  deleteModel,
};
