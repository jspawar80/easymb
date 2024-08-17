const express = require('express');
const { getComponents, createComponent, getComponentById, updateComponent, deleteComponent, bulkUploadComponents } = require('../controllers/componentController');
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router();

router.route('/')
  .get(getComponents)
  .post(upload.single('image'), createComponent);

router.post('/bulk-upload', upload.single('file'), bulkUploadComponents);

router.route('/:id')
  .get(getComponentById)
  .put(upload.single('image'), updateComponent)
  .delete(deleteComponent);

module.exports = router;
