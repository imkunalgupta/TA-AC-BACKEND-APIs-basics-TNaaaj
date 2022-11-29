var express = require('express');
var router = express.Router();
var Book = require('../models/Book');
var Comment = require('../models/Comment');

router.get('/', async (req, res, next) => {
  try {
    var book = await Book.find({});
    res.json({ book });
    next();
  } catch (error) {
    return error;
  }
});

// create book

router.get('/new', async (req, res, next) => {
  try {
    res.status(200).json({ message: 'bookinfo' });
  } catch (error) {
    return error;
  }
});

router.post('/', async (req, res, next) => {
  try {
    var book = await Book.create(req.body);
    res.status(200).json({ book });
    next();
  } catch (error) {
    return error;
  }
});

//fetching  single book

router.get('/:id', async (req, res, next) => {
  var id = req.params.id;
  try {
    var book = await Book.findById(id);
    res.status(200).json({ book });
    next();
  } catch (error) {
    return error;
  }
});

//update book
router.put('/:id', async (req, res, next) => {
  var id = req.params.id;
  try {
    var update = await Book.findByIdAndUpdate(id, req.body);
    res.status(200).json({ update });
    next();
  } catch (error) {
    return error;
  }
});

//delete
router.delete('/:id/delete', async (req, res, next) => {
  var id = req.params.id;
  try {
    var del = await Book.findByIdAndDelete(id);
    res.status(200).json({ del });
    next();
  } catch (error) {
    return error;
  }
});

//Add Comment
router.post('/:id/comment', async (req, res, next) => {
  var id = req.params.id;
  req.body.bookId = id;
  try {
    var comment = await Comment.create(req.body);
    var book = await Book.findByIdAndUpdate(id, {
      $push: { comment: comment._id },
    });
    res.status(200).json({ comment });
  } catch (error) {
    return error;
  }
});

module.exports = router;
