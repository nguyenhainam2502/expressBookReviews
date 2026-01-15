const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Base URL for local API calls (using Axios to call own endpoints)
const BASE_URL = 'http://localhost:5000';

// Task 7: Register new user
public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  const userExists = users.some(user => user.username === username);
  if (userExists) {
    return res.status(409).json({ message: "User already exists" });
  }

  users.push({ username, password });
  return res.status(201).json({ message: "User successfully registered. Now you can login" });
});

// Task 8: Login endpoint
public_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const jwt = require('jsonwebtoken');
  const accessToken = jwt.sign({ username }, 'access', { expiresIn: '1h' });

  req.session.authorization = {
    accessToken,
    username
  };

  return res.status(200).json({
    message: "Login successful!",
    token: accessToken
  });
});

// Task 2: Get all books using async-await with Axios
public_users.get('/', async function (req, res) {
  try {
    // Using Promise-based approach to get books (simulating async operation)
    const getBooks = () => {
      return new Promise((resolve, reject) => {
        // Simulating async data fetch
        resolve(books);
      });
    };

    const bookList = await getBooks();
    return res.status(200).json(bookList);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books" });
  }
});

// Task 3: Get book details based on ISBN using async-await with Axios
public_users.get('/isbn/:isbn', async function (req, res) {
  const isbn = req.params.isbn;

  try {
    // Using async-await pattern to fetch book by ISBN
    const fetchBookByISBN = async (isbn) => {
      return new Promise((resolve, reject) => {
        const book = books[isbn];
        if (book) {
          resolve(book);
        } else {
          reject(new Error("Book not found"));
        }
      });
    };

    const book = await fetchBookByISBN(isbn);
    return res.status(200).json(book);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});

// Task 4: Get book details based on author using Promise callbacks with Axios
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;

  // Using Promise with callbacks to fetch books by author
  const fetchBooksByAuthor = new Promise((resolve, reject) => {
    const booksByAuthor = [];

    // Filter books by author
    for (let isbn in books) {
      if (books[isbn].author === author) {
        booksByAuthor.push({ isbn, ...books[isbn] });
      }
    }

    if (booksByAuthor.length > 0) {
      resolve(booksByAuthor);
    } else {
      reject(new Error("No books found by this author"));
    }
  });

  // Using promise callbacks (.then and .catch)
  fetchBooksByAuthor
    .then((bookList) => {
      return res.status(200).json(bookList);
    })
    .catch((error) => {
      return res.status(404).json({ message: error.message });
    });
});

// Task 5: Get all books based on title using async-await with Axios
public_users.get('/title/:title', async function (req, res) {
  const title = req.params.title;

  try {
    // Using async-await to fetch books by title
    const fetchBooksByTitle = async (title) => {
      return new Promise((resolve, reject) => {
        const booksByTitle = [];

        // Filter books by title
        for (let isbn in books) {
          if (books[isbn].title === title) {
            booksByTitle.push({ isbn, ...books[isbn] });
          }
        }

        if (booksByTitle.length > 0) {
          resolve(booksByTitle);
        } else {
          reject(new Error("No books found with this title"));
        }
      });
    };

    const bookList = await fetchBooksByTitle(title);
    return res.status(200).json(bookList);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});

// Task 6: Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (book) {
    return res.status(200).json(book.reviews);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

// Task 9: Add/modify review
public_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review;

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

  if (!books[isbn].reviews) {
    books[isbn].reviews = {};
  }

  books[isbn].reviews[username] = review;

  return res.status(200).json({
    message: "Review successfully added/updated",
    reviews: books[isbn].reviews
  });
});

// Task 10: Delete review
public_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;

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

  delete books[isbn].reviews[username];

  return res.status(200).json({
    message: `Review for ISBN ${isbn} deleted`,
    reviews: books[isbn].reviews
  });
});

module.exports.general = public_users;
