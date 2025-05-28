const Book = require("../models/book.model");

// POST /api/books - Create a new book
const createBook = async (req, res) => {
    try {
        const newBook = await Book.create(req.body);
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET /api/books - Get all books
const getAllBooks = async (req, res) => {
    try {
        const booksFromDB = await Book.find({});
        res.status(200).json(booksFromDB);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET /api/books/:id - Get a book by ID
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) return res.status(404).json({
            success: false,
            message: "Book not found!",
        });

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// PATCH /api/books/:id - Update a book by ID
const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findByIdAndUpdate(id, req.body);
        if (!book) return res.json({ success: false, message: "Book not found!" });
        const updatedBook = await Book.findById(id);
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// DELETE /api/books/:id - Delete a book by ID
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findByIdAndDelete(id);
        if (!book) return res.status(404).json({
            success: false,
            message: "Book not found!"
        });
        res.status(200).json({
            success: true,
            message: "Book is successfully deleted!"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
};
