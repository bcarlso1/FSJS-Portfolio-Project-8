var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var booksRouter = require('./routes/books');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/books', booksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.log(err);
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  res.render('page-not-found');
});

// SEARCH BAR
// const searchButton = document.getElementById('searchButton');
// const searchInput = document.getElementById('searchInput');

// var students = document.getElementsByTagName("h3");
// var studentsContainer = document.getElementsByClassName('student-item');

// // set up function to run when search used
// searchClick.addEventListener('onclick', searchMe);
// searchBar.addEventListener('keyup', searchMe);

// function searchMe() {
//     searchBar.value = searchBar.value.toLowerCase();
//     var mySearch = searchBar.value;
//     // create empty array to store matches
//     var foundStudentsArray = [];
//     // console.log(mySearch);
//     // go through student names list looking for matches
//     for (var i = 0; i < students.length; i += 1) {
//         var title = students[i].innerHTML.toLowerCase();
//         // console.log(title);
//         // hide all students
//         studentsContainer[i].style.display = "none";
//          // if match, add to array       
//         if (title.includes(mySearch)) {
//          foundStudentsArray.push(studentsContainer[i]);      
//          }
//    }
//    // set all items in array to show
//    for (var i = 0; i < foundStudentsArray.length; i += 1) {
//      foundStudentsArray[i].style.display = "block";
//    } 

// // display "no results" if none...
//    var noResultsNow = document.getElementById('no-results');
//   // if no results but not first time
//    if (foundStudentsArray.length == 0 && document.body.contains(noResultsNow)) {
//       noResultsNow.innerHTML = "No results";  
//    // if no results but IS first time - add text
//    } else if (foundStudentsArray.length == 0 ) {
//       var noResults = document.createElement('div');
//       noResults.innerHTML = "No results";
//       noResults.setAttribute("id", "no-results");
//       document.getElementsByClassName('student-list')[0].appendChild(noResults);
//    // if array is NOT 0
//    } else {
//    // if array is not 0 but it USED TO BE (clear text)
//       if (document.body.contains(noResultsNow)) {
//       noResultsNow.innerHTML = "";
//       }
//    }
//    // put together pages and buttons based on array
//  appendPageLinks(foundStudentsArray);

module.exports = app;
