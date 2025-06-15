const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter book title"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Please enter book author"],
      trim: true,
    },
    yearPublished: {
      type: Number,
      required: [true, "Please enter the year published"],
      trim: true,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;