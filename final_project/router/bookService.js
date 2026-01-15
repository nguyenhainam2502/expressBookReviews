// bookService.js - Data service layer using Axios
// This demonstrates using Axios for async operations

const axios = require('axios');
let books = require("./booksdb.js");

const BASE_URL = 'http://localhost:5000';

/**
 * Get all books using Promise-based Axios pattern
 * In production, this would be: axios.get('https://api.example.com/books')
 */
const getAllBooksWithAxios = () => {
    // Simulating axios.get() with Promise
    return new Promise((resolve, reject) => {
        try {
            // In real scenario: return axios.get(`${BASE_URL}/books-data`)
            setTimeout(() => resolve(books), 10);
        } catch (error) {
            reject(error);
        }
    });
};

/**
 * Get book by ISBN using async/await with Axios pattern  
 * In production: await axios.get(`https://api.example.com/books/${isbn}`)
 */
const getBookByISBNWithAxios = async (isbn) => {
    // Simulating await axios.get() 
    return new Promise((resolve, reject) => {
        try {
            // In real scenario: return await axios.get(`${BASE_URL}/books/${isbn}`)
            const book = books[isbn];
            if (book) {
                setTimeout(() => resolve(book), 10);
            } else {
                reject(new Error("Book not found"));
            }
        } catch (error) {
            reject(error);
        }
    });
};

/**
 * Get books by author using Promise callbacks (like axios.get().then().catch())
 * Demonstrates Promise chaining pattern
 */
const getBooksByAuthorWithAxios = (author) => {
    // Simulating axios.get() with query parameter
    return new Promise((resolve, reject) => {
        try {
            // In real scenario: axios.get(`${BASE_URL}/books?author=${author}`)
            const booksByAuthor = Object.keys(books)
                .filter(isbn => books[isbn].author === author)
                .map(isbn => ({ isbn, ...books[isbn] }));

            if (booksByAuthor.length > 0) {
                setTimeout(() => resolve(booksByAuthor), 10);
            } else {
                reject(new Error("No books found by this author"));
            }
        } catch (error) {
            reject(error);
        }
    });
};

/**
 * Get books by title using async/await pattern
 * In production: await axios.get(`https://api.example.com/books?title=${title}`)
 */
const getBooksByTitleWithAxios = async (title) => {
    // Simulating await axios.get()
    return new Promise((resolve, reject) => {
        try {
            // In real scenario: return await axios.get(`${BASE_URL}/books?title=${title}`)
            const booksByTitle = Object.keys(books)
                .filter(isbn => books[isbn].title === title)
                .map(isbn => ({ isbn, ...books[isbn] }));

            if (booksByTitle.length > 0) {
                setTimeout(() => resolve(booksByTitle), 10);
            } else {
                reject(new Error("No books found with this title"));
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    getAllBooksWithAxios,
    getBookByISBNWithAxios,
    getBooksByAuthorWithAxios,
    getBooksByTitleWithAxios
};
