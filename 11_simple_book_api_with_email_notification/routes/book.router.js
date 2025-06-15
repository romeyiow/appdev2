const express = require("express");
const router = express.Router();
const { protect } = require('../middleware/auth.middleware'); 

const {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controllers/book.controller");

//Protected book routes
router.post("/", protect, createBook);
router.get("/", protect, getAllBooks);
router.get("/:id", protect, getBookById);
router.patch("/:id", protect, updateBook);
router.delete("/:id", protect, deleteBook);

module.exports = router;