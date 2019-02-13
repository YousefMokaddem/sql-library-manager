const express = require('express');
const Book = require('./models').Book;
const bodyParser = require('body-parser');

const app = express();
app.use('/static', express.static('public'));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req,res) => {
    Book.findAll()
        .then((books) => {
            let booksArray = [];
            books.map(book => {
                booksArray.push(book.dataValues);
            });
            res.render('index', {books:booksArray});
        });
});

app.get('/books', (req,res) => {
    Book.findAll()
        .then((books) => {
            /*
            { id: 1,
            title: "Harry Potter and the Philosopher's Stone",
            author: 'J.K. Rowling',
            genre: 'Fantasy',
            year: 1997,
            createdAt: 2018-10-04T18:21:59.011Z,
            updatedAt: 2018-10-04T18:21:59.011Z }
            */
            let booksArray = [];
            books.map(book => {
                booksArray.push(book.dataValues);
            });
            res.render('index', {books:booksArray});
        });
});

app.get('/books/new', (req,res) => {
    res.render('new-book');
});

app.post('/books/new', (req,res) => {
    Book.create(req.body)
        .then(res.redirect(`/books`));
});

app.put('/books/:id', (req,res) => {
    Book.findById(req.params.id)
        .then((book) => {
            return book.update(req.body);
        })
        .then(res.redirect('/books'));
});

app.get('/books/:id', (req,res) => {
    Book.findById(req.params.id)
        .then((book) => {
            res.render('update-book', book.dataValues);
        });
});

app.listen(3000, () => {
    console.log('listening on port 3000!')
});