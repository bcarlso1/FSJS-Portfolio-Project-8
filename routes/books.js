var express = require('express');
var router = express.Router();
const Book = require('../models').book;
const pug = require('pug');

function asyncHandler(cb){
  return async(req, res, next) => {
      try {
          await cb(req, res, next)
      } catch(error){
          res.status(500).send(error);
      }
  }
}

/* GET list of books */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.render('index', { books: {}, title: 'All Books' });
});

/* create new book */
router.get('/new', (req, res) => {
  res.render('new-book', { books: {}, title: 'New Book'});
});

/* Post create new book*/
router.post('/', asyncHandler(async (req, res) => {
  const book = await Book.create(req.body);
  res.redirect("/books/" + article.id);
}))




module.exports = router;
