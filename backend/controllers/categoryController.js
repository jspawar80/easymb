const Category = require('../models/Category');

const getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

const createCategory = async (req, res) => {
  const { name } = req.body;
  const image = req.file ? req.file.path : null;

  const category = new Category({
    name,
    image,
  });

  await category.save();
  res.status(201).json(category);
};

const getCategoryById = async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.json(category);
};

const updateCategory = async (req, res) => {
  const { name } = req.body;
  const image = req.file ? req.file.path : null;

  const category = await Category.findById(req.params.id);

  if (category) {
    category.name = name || category.name;
    category.image = image || category.image;

    await category.save();
    res.json(category);
  } else {
    res.status(404).json({ message: 'Category not found' });
  }
};

const deleteCategory = async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  res.json({ message: 'Category deleted' });
};

module.exports = {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
