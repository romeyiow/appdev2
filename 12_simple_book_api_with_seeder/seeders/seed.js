const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const Book = require("../models/book.model");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected for Seeding...");
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await Book.deleteMany();
    await User.deleteMany();
    console.log("Data Cleared!");

    const users = [];
    for (let i = 0; i < 5; i++) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("password123", salt);

      users.push({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: hashedPassword,
      });
    }
    const createdUsers = await User.insertMany(users);
    console.log(`${createdUsers.length} users created.`);

    const books = [];
    for (let i = 0; i < 10; i++) {
      const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];

      books.push({
        title: faker.lorem.words(3).split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        author: faker.person.fullName(),
        yearPublished: faker.number.int({ min: 1800, max: 2024 }),
        user: randomUser._id,
      });
    }

    await Book.insertMany(books);
    console.log("10 books created and associated with users.");
    console.log("Data Imported Successfully!");
    process.exit();
  } catch (error) {
    console.error(`Error importing data: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Book.deleteMany();
    await User.deleteMany();
    console.log("Data Destroyed Successfully!");
    process.exit();
  } catch (error) {
    console.error(`Error destroying data: ${error.message}`);
    process.exit(1);
  }
};

const run = async () => {
  await connectDB();

  if (process.argv[2] === "-d") {
    await destroyData();
  } else {
    await importData();
  }
};

run();