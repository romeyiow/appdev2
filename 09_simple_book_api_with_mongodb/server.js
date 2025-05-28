const express = require("express");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/book.router");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};
connectDB();

// Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Simple Book API using Node.js, Express and MongoDB");
});

// Mount Book Routes
app.use("/api/books", bookRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(
    `Server for Assignment #9 is running on http://localhost:${PORT}`
  );
  if (!process.env.MONGODB_URI) {
    console.warn("WARNING: MONGODB_URI not found. Check .env file.");
  }
});
