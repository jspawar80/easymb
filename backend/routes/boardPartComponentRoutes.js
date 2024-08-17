const express = require('express');
const { getBoardPartComponents, createBoardPartComponent, getBoardPartComponentById, updateBoardPartComponent, deleteBoardPartComponent } = require('../controllers/boardPartComponentController');
const router = express.Router();

router.route('/')
  .get(getBoardPartComponents)
  .post(createBoardPartComponent);

router.route('/:id')
  .get(getBoardPartComponentById)
  .put(updateBoardPartComponent)
  .delete(deleteBoardPartComponent);

module.exports = router;
