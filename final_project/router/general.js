const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

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

// Task 2: Get the book list available in the shop (using Promise/Async-Await)
public_users.get('/', function (req, res) {
  // Using Promise to simulate async operation
  const getAllBooks = new Promise((resolve, reject) => {
    resolve(books);
  });

  getAllBooks
    .then(bookList => {
      return res.status(200).json(bookList);
    })
    .catch(error => {
      return res.status(500).json({ message: "Error fetching books" });
    });
});

// Task 3: Get book details based on ISBN (using async/await)
public_users.get('/isbn/:isbn', async function (req, res) {
  const isbn = req.params.isbn;

  try {
    // Using async/await to simulate async operation
    const getBookByISBN = async (isbn) => {
      return books[isbn];
    };

    const book = await getBookByISBN(isbn);

    if (book) {
      return res.status(200).json(book);
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error fetching book by ISBN" });
  }
});

// Task 4: Get book details based on author (using Promises)
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

// Task 5: Get all books based on title (using async/await)
public_users.get('/title/:title', async function (req, res) {
  const title = req.params.title;

  try {
    const getBooksByTitle = async (title) => {
      const booksByTitle = [];
      for (let isbn in books) {
        if (books[isbn].title === title) {
          booksByTitle.push({ isbn, ...books[isbn] });
        }
      }
      return booksByTitle;
    };

    const bookList = await getBooksByTitle(title);

    if (bookList.length > 0) {
      return res.status(200).json(bookList);
    } else {
      return res.status(404).json({ message: "No books found with this title" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books by title" });
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

module.exports.general = public_users;
