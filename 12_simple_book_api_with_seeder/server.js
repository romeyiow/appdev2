const express = require("express");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/book.router");
const authRoutes = require("./routes/auth.router"); 


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
  res.send("Simple Book API using Node.js, Express,MongoDB and JWT Authentication");
});

// Mount Book Routes
app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes); 

// Start the server
app.listen(PORT, () => {
  console.log(
    `Server for Assignment #10 is running on http://localhost:${PORT}`
  );
  if (!process.env.MONGODB_URI) {
    console.warn("WARNING: MONGODB_URI not found. Check .env file.");
  }
});
