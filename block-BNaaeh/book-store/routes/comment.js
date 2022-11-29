var express = require('express');
var router = express.Router();
var Book = require('../models/Book');
var Comment = require('../models/Comment');

// update comment
router.put('/:id/edit', async (req, res, next) => {
  var id = req.params.id;
  try {
    var updateComment = await Comment.findByIdAndUpdate(id, req.body);
    res.status(200).json({ updateComment });
    next();
  } catch (error) {
    return error;
  }
});

//delete
router.delete(':id/delete', async (req, res, next) => {
  var commentId = req.params.id;
  try {
    var del = await Comment.findByIdAndDelete(commentId);
    res.status(200).json({ del });
    next();
  } catch (error) {
    return error;
  }
});

module.exports = router;
