// Book Data Access Layer using Axios pattern
// This simulates making HTTP requests to an external API using Axios

const axios = require('axios');
let books = require("./booksdb.js");

// Simulating async API calls with Axios pattern
// In a real scenario, these would be actual axios.get() calls to an external API

// Using Promise callbacks to get all books (simulating axios.get pattern)
const getAllBooksUsingPromise = () => {
    return new Promise((resolve, reject) => {
        // This simulates: axios.get('https://api.bookstore.com/books')
        setTimeout(() => {
            resolve(books);
        }, 10);
    });
};

// Using async/await to get book by ISBN (simulating axios.get pattern)
const getBookByISBN = async (isbn) => {
    return new Promise((resolve, reject) => {
        // This simulates: axios.get(`https://api.bookstore.com/books/${isbn}`)
        setTimeout(() => {
            const book = books[isbn];
            if (book) {
                resolve(book);
            } else {
                reject(new Error("Book not found"));
            }
        }, 10);
    });
};

// Using Promise callbacks to get books by author (simulating axios.get pattern)
const getBooksByAuthorUsingPromise = (author) => {
    return new Promise((resolve, reject) => {
        // This simulates: axios.get(`https://api.bookstore.com/books?author=${author}`)
        setTimeout(() => {
            const booksByAuthor = [];
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
        }, 10);
    });
};

// Using async/await to get books by title (simulating axios.get pattern)
const getBooksByTitle = async (title) => {
    return new Promise((resolve, reject) => {
        // This simulates: axios.get(`https://api.bookstore.com/books?title=${title}`)
        setTimeout(() => {
            const booksByTitle = [];
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
        }, 10);
    });
};

module.exports = {
    getAllBooksUsingPromise,
    getBookByISBN,
    getBooksByAuthorUsingPromise,
    getBooksByTitle
};
