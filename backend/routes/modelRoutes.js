const express = require('express');
const { getModels, createModel, getModelById, updateModel, deleteModel } = require('../controllers/modelController');
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router();

router.route('/')
  .get(getModels)
  .post(upload.single('image'), createModel);

router.route('/:id')
  .get(getModelById)
  .put(upload.single('image'), updateModel)
  .delete(deleteModel);

module.exports = router;
