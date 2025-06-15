const express = require("express");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/book.router");
const authRoutes = require("./routes/auth.router");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    if (!MONGODB_URI) {
      console.error("MONGODB_URI is not defined in .env file");
      process.exit(1);
    }
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    "Simple Book API - Deployed for Assignment #13"
  );
});

app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();