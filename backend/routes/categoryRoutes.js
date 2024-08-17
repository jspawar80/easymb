const express = require('express');
const { getCategories, createCategory, getCategoryById, updateCategory, deleteCategory } = require('../controllers/categoryController');
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router();

router.route('/')
  .get(getCategories)
  .post(upload.single('image'), createCategory);

router.route('/:id')
  .get(getCategoryById)
  .put(upload.single('image'), updateCategory)
  .delete(deleteCategory);

module.exports = router;
