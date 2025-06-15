const Book = require("../models/book.model");
const sendEmail = require("../middleware/send-email.middleware");

const createBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);

    try {
      await sendEmail({ book: newBook });
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
    }

    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

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

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book)
      return res.status(404).json({
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

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, req.body);
    if (!book)
      return res.json({ success: false, message: "Book not found!" });
    const updatedBook = await Book.findById(id);
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book)
      return res.status(404).json({
        success: false,
        message: "Book not found!",
      });
    res.status(200).json({
      success: true,
      message: "Book is successfully deleted!",
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