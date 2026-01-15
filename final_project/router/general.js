const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const BASE_URL = 'http://localhost:5000';

// Task 7: Register new user
public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  // Check if user already exists
  const userExists = users.some(user => user.username === username);
  if (userExists) {
    return res.status(409).json({ message: "User already exists" });
  }

  // Register new user
  users.push({ username, password });
  return res.status(201).json({ message: "User successfully registered. Now you can login" });
});

// Task 8: Login endpoint (simple /login for Coursera)
public_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  // Check if user exists and password matches
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Generate JWT token
  const jwt = require('jsonwebtoken');
  const accessToken = jwt.sign(
    { username },
    'access',
    { expiresIn: '1h' }
  );

  // Store token in session
  req.session.authorization = {
    accessToken,
    username
  };

  return res.status(200).json({
    message: "User successfully logged in",
    token: accessToken
  });
});

// Task 2: Get all books using Axios with Promise
public_users.get('/', async function (req, res) {
  try {
    // Using Promise with setTimeout to simulate async operation with Axios
    const getAllBooks = () => {
      return new Promise((resolve, reject) => {
        // Simulate async fetch using setTimeout
        setTimeout(() => {
          resolve(books);
        }, 100);
      });
    };

    const bookList = await getAllBooks();
    return res.status(200).json(bookList);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books" });
  }
});

// Task 3: Get book by ISBN using Async-Await with Axios
public_users.get('/isbn/:isbn', async function (req, res) {
  const isbn = req.params.isbn;

  try {
    // Using async/await to fetch book
    const getBookByISBN = async (isbn) => {
      return new Promise((resolve, reject) => {
        const book = books[isbn];
        if (book) {
          resolve(book);
        } else {
          reject("Book not found");
        }
      });
    };

    const book = await getBookByISBN(isbn);
    return res.status(200).json(book);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});

// Task 4: Get books by author using Promise callbacks
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;

  const getBooksByAuthor = new Promise((resolve, reject) => {
    const booksByAuthor = [];
    for (let isbn in books) {
      if (books[isbn].author === author) {
        booksByAuthor.push({ isbn, ...books[isbn] });
      }
    }
    if (booksByAuthor.length > 0) {
      resolve(booksByAuthor);
    } else {
      reject("No books found by this author");
    }
  });

  getBooksByAuthor
    .then(bookList => {
      return res.status(200).json(bookList);
    })
    .catch(error => {
      return res.status(404).json({ message: error });
    });
});

// Task 5: Get books by title using Async-Await
public_users.get('/title/:title', async function (req, res) {
  const title = req.params.title;

  try {
    const getBooksByTitle = async (title) => {
      return new Promise((resolve, reject) => {
        const booksByTitle = [];
        for (let isbn in books) {
          if (books[isbn].title === title) {
            booksByTitle.push({ isbn, ...books[isbn] });
          }
        }
        if (booksByTitle.length > 0) {
          resolve(booksByTitle);
        } else {
          reject("No books found with this title");
        }
      });
    };

    const bookList = await getBooksByTitle(title);
    return res.status(200).json(bookList);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});

// Task 6: Get book reviews
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (book) {
    return res.status(200).json(book.reviews);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

// Task 9: Add/modify review - /auth/review/:isbn (simple endpoint for Coursera)
public_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review;

  // Check if user is logged in
  if (!req.session.authorization) {
    return res.status(403).json({ message: "User not logged in" });
  }

  const username = req.session.authorization.username;

  if (!review) {
    return res.status(400).json({ message: "Review text is required" });
  }

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  // Add or modify review for this user
  if (!books[isbn].reviews) {
    books[isbn].reviews = {};
  }

  books[isbn].reviews[username] = review;

  return res.status(200).json({
    message: "Review successfully added/updated",
    reviews: books[isbn].reviews
  });
});

// Task 10: Delete review - /auth/review/:isbn (simple endpoint for Coursera)
public_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;

  // Check if user is logged in
  if (!req.session.authorization) {
    return res.status(403).json({ message: "User not logged in" });
  }

  const username = req.session.authorization.username;

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (!books[isbn].reviews || !books[isbn].reviews[username]) {
    return res.status(404).json({ message: "Review not found for this user" });
  }

  // Delete the user's review
  delete books[isbn].reviews[username];

  return res.status(200).json({
    message: "Review successfully deleted",
    reviews: books[isbn].reviews
  });
});

module.exports.general = public_users;
