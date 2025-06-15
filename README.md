# Simple Book API (appdev2)

This repository contains the final, deployed version of a simple Book API created for the appdev2 course.

## Deployed URL

The API is live and can be accessed at the following base URL:
[https://appdev2-simple-book-api.onrender.com](https://appdev2-simple-book-api.onrender.com)

**NOTE: API may load slow on initial call.**

## Accessing the API

To use the API, you can use a tool like Postman or Insomnia.

### Available Routes

*   **Authentication**
    *   `POST /api/auth/signup`: Register a new user.
    *   `POST /api/auth/signin`: Log in to get a JWT token.
*   **Books (Protected)**
    *   `GET /api/books`: Get all books.
    *   `POST /api/books`: Create a new book.
    *   `GET /api/books/:id`: Get a single book by its ID.
    *   `PATCH /api/books/:id`: Update a book.
    *   `DELETE /api/books/:id`: Delete a book.

All book routes require a `Bearer Token` in the `Authorization` header. You'll receive this Token in the response body,  after logging in successfully.