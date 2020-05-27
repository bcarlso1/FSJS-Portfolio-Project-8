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

// Search Results
router.get('/search', asyncHandler(async (req, res) => {
  const books = await Book.findAll({ order: [["id", "DESC"]]});
  // const search = input.value;
  res.render('books/search', { books, searchNow, title: "Book Title Here"});
}));

/* create new book */
router.get('/new', (req, res) => {
  res.render('books/new-book', { book: {}, title: 'New Book'});
});

/* POST create new book*/
router.post('/', asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect("/books/");
  } catch (error) {
    if(error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      res.render("books/new-book", { book, errors: error.errors, title: "New Book" })
    } else {
      throw error;
    }
  }

})); 

/* GET an individual book */
router.get("/:id", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id)
  if (book) {
    res.render("books/show-book", { book, title: "Update Book"});
  } else {
    // res.sendStatus(404);
    res.render('page-not-found');
  }
  
}));

/* Update a book */
router.post('/:id', asyncHandler(async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
      if(book) {
      await book.update(req.body);
      res.redirect("/books");
      } else {
        res.sendStatus(404);
      }
  } catch(error) {
    if (error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      book.id = req.params.id;
      res.render("books/show-book", { book, errors: error.errors, title: "Update Book" })
    } else {
      // res.sendStatus(404);
      res.render('error');
    }
  }
}));

/* Delete Book? */
router.get("/:id/delete", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    res.render("books/delete", {  book, title: book.title});
  } else {
    // res.sendStatus(404);
    res.render('page-not-found');
  }
  }));

/* Yes Delete Book */
router.post("/:id/delete", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    await book.destroy();
    res.redirect("/books");
  } else {
    // res.sendStatus(404);
    res.render('page-not-found');
  }
}));




module.exports = router;
