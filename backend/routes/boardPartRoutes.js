const express = require('express');
const { getBoardParts, createBoardPart, getBoardPartById, updateBoardPart, deleteBoardPart } = require('../controllers/boardPartController');
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router();

router.route('/')
  .get(getBoardParts)
  .post(upload.single('image'), createBoardPart);

router.route('/:id')
  .get(getBoardPartById)
  .put(upload.single('image'), updateBoardPart)
  .delete(deleteBoardPart);

module.exports = router;
