var express = require('express');
var router = express.Router();
const Book = require('../models').Book;
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
router.get('/',  asyncHandler(async (req, res) => {
  const books = await Book.findAll({ order: [["id", "DESC"]]});
  res.render('books/index', { books, title: 'All Books' });
}));

/* create new book */
router.get('/new', (req, res) => {
  res.render('books/new-book', { book: {}, title: 'New Book'});
});

/* POST create new book*/
router.post('/', asyncHandler(async (req, res) => {
  const book = await Book.create(req.body);
  res.redirect("/books/");
}));

/* GET an individual book */
router.get("/:id", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id)
  res.render("books/show-book", { book, title: book.title});
}));

/* Update a book */
router.post('/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  await book.update(req.body);
  res.redirect("/books");
}));

/* Delete Book */
router.get(":id/delete", asyncHandler(async (req, res) => {
  const article = await article.findByPk(req.params.id);
  res.redirect("/books")
}))

module.exports = router;
