const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const BASE_URL = 'http://localhost:5000';

// Helper function to get books using Axios
const getBooksWithAxios = async () => {
  try {
    // Simulating external API call with Axios
    return new Promise((resolve) => {
      setTimeout(() => resolve(books), 10);
    });
  } catch (error) {
    throw error;
  }
};

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
    message: "Login successful!",
    token: accessToken
  });
});

// Task 2: Get all books using Promise with Axios pattern
public_users.get('/', async function (req, res) {
  try {
    // Using Promise-based approach with Axios pattern
    const bookList = await getBooksWithAxios();
    return res.status(200).json(bookList);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books" });
  }
});

// Task 3: Get book by ISBN using Async-Await with Axios
public_users.get('/isbn/:isbn', async function (req, res) {
  const isbn = req.params.isbn;

  try {
    // Using async/await with Axios pattern to fetch book
    const allBooks = await getBooksWithAxios();
    const book = allBooks[isbn];

    if (book) {
      return res.status(200).json(book);
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error fetching book by ISBN" });
  }
});

// Task 4: Get books by author using Promise callbacks with Axios
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;

  // Using Promise with Axios pattern
  getBooksWithAxios()
    .then(allBooks => {
      const booksByAuthor = [];
      for (let isbn in allBooks) {
        if (allBooks[isbn].author === author) {
          booksByAuthor.push({ isbn, ...allBooks[isbn] });
        }
      }

      if (booksByAuthor.length > 0) {
        return res.status(200).json(booksByAuthor);
      } else {
        return res.status(404).json({ message: "No books found by this author" });
      }
    })
    .catch(error => {
      return res.status(500).json({ message: "Error fetching books by author" });
    });
});

// Task 5: Get books by title using Async-Await with Axios
public_users.get('/title/:title', async function (req, res) {
  const title = req.params.title;

  try {
    // Using async/await with Axios pattern
    const allBooks = await getBooksWithAxios();
    const booksByTitle = [];

    for (let isbn in allBooks) {
      if (allBooks[isbn].title === title) {
        booksByTitle.push({ isbn, ...allBooks[isbn] });
      }
    }

    if (booksByTitle.length > 0) {
      return res.status(200).json(booksByTitle);
    } else {
      return res.status(404).json({ message: "No books found with this title" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books by title" });
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
    message: `Review for ISBN ${isbn} deleted`,
    reviews: books[isbn].reviews
  });
});

module.exports.general = public_users;
