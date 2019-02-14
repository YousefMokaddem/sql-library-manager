const express = require('express');
const Book = require('./models').Book;
const bodyParser = require('body-parser');

const app = express();
app.use('/static', express.static('public'));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req,res) => {
    res.redirect('/books');
});

app.get('/books', (req,res) => {
    Book.findAll()
        .then((books) => {
            let booksArray = [];
            books.map(book => {
                booksArray.push(book.dataValues);
            });
            res.render('index', {books:booksArray, title:'Books'});
        });
});

app.get('/books/new', (req,res) => {
    res.render('new-book', {title: 'Add new book'});
});

app.post('/books/new', (req,res) => {
    Book.create(req.body)
        .then(() => {res.redirect(`/books`)})
        .catch((error) => {
            if(error.name === "SequelizeValidationError") {
                res.render('form-error', {title:'New Book'});
            }
        });
});

app.get('/books/:id', (req,res) => {
    Book.findById(req.params.id)
        .then((book) => {
            if(book){
                res.render('update-book', {...book.dataValues, title: book.dataValues.title});
            }else{
                res.render('error', {title: 'Page Not Found'});
            }
        });
});

app.post('/books/:id', (req,res) => {
    Book.findById(req.params.id)
        .then((book) => {
            return book.update(req.body);
        })
        .then(res.redirect('/books'));
});

app.get('/books/:id/delete', (req,res) => {
    Book.findById(req.params.id)
        .then((book) => {
            if(book){
                book.destroy();
                res.redirect('/books')
            }else{
                res.redirect('/404');
            }
        });
});

app.use((req, res, next)=>{
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next)=>{
    res.locals.error = err;
    res.status(err.status);
    res.render('page-not-found', {err : err, title: 'Page not found'});
});

app.listen(3000, () => {
    console.log('listening on port 3000!')
});