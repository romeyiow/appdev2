const express = require('express');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3000;

var books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 3, title: '1984', author: 'George Orwell' },
    { id: 4, title: 'The Catcher in the Rye', author: 'J.D. Salinger' }]


app.use(express.json()); // Middleware

// Welcome message
app.get('/', (req, res) => {
    res.send('Simple Book API using Node.js and Express');
});

// Get all books
app.get('/api/books', (req, res) => {
    res.json(books);
});

// Get a book by ID
app.get('/api/books/:id', (req, res) => {
    const { id } = req.params
    const book = books.find(book => book.id == id);

    //if book with the specified id is not found
    if (!book) return res.status(404).send('Book not found');

    //otherwise, return the book
    res.json(book);
});

// Add a new book
app.post('/api/books', (req, res) => {
    const { title, author } = req.body;

    //if title or author is not provided return 400 status
    if (!title || !author) {
        return res.status(400).json({ error: 'title and author are required' });
    }

    //find the maximum id in the books array and add 1 to it
    const autoId = books.reduce((max, book) => Math.max(max, book.id), 0) + 1;

    const newBook = {
        id: autoId,
        title,
        author
    };

    //push the new book to the books array before returning it
    books.push(newBook);
    res.status(201).json(newBook);
});


// Update a book by ID
app.patch('/api/books/:id', (req, res) => {
    const { id } = req.params
    const book = books.find(book => book.id == id);

    //if book with the declaired id is not found
    if (!book) return res.status(404).send('Book not found');

    const { title, author } = req.body;
    book.title = title ?? book.title;
    book.author = author ?? book.author;
    res.json(book);
});


// Delete a book by ID
app.delete('/api/books/:id', (req, res) => {

    const updatedBook = books.filter(b => b.id != req.params.id);

    //if book with the specified ID is not found
    if (updatedBook.length === books.length) return res.status(404).send(`Book with ID of ${req.params.id} is not found`);

    //otherwise, update book array and send success message
    books = updatedBook;
    res.send('Book deleted successfully');
});


// Start the server with simple callback 
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});