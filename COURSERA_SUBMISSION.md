# 🎉 Express Bookstore Backend - HOÀN THÀNH

## ✅ TẤT CẢ 14 TASKS ĐÃ ĐƯỢC IMPLEMENT

### Repository Information
**GitHub URL:** https://github.com/nguyenhainam2502/expressBookReviews  
**Branch:** main  
**Server Port:** 5000

---

## 📊 Grading Breakdown (30 Points Total)

### ✅ Task 1: GitHub Fork (2 points)
**File:** `githubrepo.txt`  
**Status:** ✅ Complete  
**Description:** Fork từ ibm-developer-skills-network/expressBookReviews

### ✅ Task 2: Get All Books (2 points)
**File:** `getallbooks.txt`  
**Endpoint:** `GET /`  
**Status:** ✅ Complete  
**Method:** Promise-based async operation

### ✅ Task 3: Get Books by ISBN (2 points)
**File:** `getbooksbyISBN.txt`  
**Endpoint:** `GET /isbn/:isbn`  
**Status:** ✅ Complete  
**Method:** Async/Await

### ✅ Task 4: Get Books by Author (2 points)
**File:** `getbooksbyauthor.txt`  
**Endpoint:** `GET /author/:author`  
**Status:** ✅ Complete  
**Method:** Promises

### ✅ Task 5: Get Books by Title (2 points)
**File:** `getbooksbytitle.txt`  
**Endpoint:** `GET /title/:title`  
**Status:** ✅ Complete  
**Method:** Async/Await

### ✅ Task 6: Get Book Review (2 points)
**File:** `getbookreview.txt`  
**Endpoint:** `GET /review/:isbn`  
**Status:** ✅ Complete

### ✅ Task 7: Register User (3 points)
**File:** `register.txt`  
**Endpoint:** `POST /register`  
**Status:** ✅ Complete  
**Output:** "User successfully registered. Now you can login"

### ✅ Task 8: Login User (3 points)
**File:** `login.txt`  
**Endpoint:** `POST /customer/login`  
**Status:** ✅ Complete  
**Output:** JWT token generated and returned

### ✅ Task 9: Add/Modify Review (2 points)
**File:** `reviewadded.txt`  
**Endpoint:** `PUT /customer/auth/review/:isbn`  
**Status:** ✅ Complete  
**Output:** Review successfully added with user-specific storage

### ✅ Task 10: Delete Review (2 points)
**File:** `deletereview.txt`  
**Endpoint:** `DELETE /customer/auth/review/:isbn`  
**Status:** ✅ Complete  
**Output:** Review successfully deleted

### ✅ Task 11: Submit general.js GitHub URL (8 points)
**GitHub URL:**  
```
https://github.com/nguyenhainam2502/expressBookReviews/blob/main/final_project/router/general.js
```
**Status:** ✅ Complete  
**Features:**
- ✅ All public routes use Promises or Async/Await
- ✅ Axios dependency installed
- ✅ Proper error handling
- ✅ RESTful API design

---

## 📁 All Test Output Files

Located in: `c:\Nam dep trai\coursera\expressBookReviews\final_project\`

1. ✅ `githubrepo.txt` - GitHub repository info
2. ✅ `getallbooks.txt` - All books JSON
3. ✅ `getbooksbyISBN.txt` - Book by ISBN search
4. ✅ `getbooksbyauthor.txt` - Books by author search
5. ✅ `getbooksbytitle.txt` - Books by title search
6. ✅ `getbookreview.txt` - Book reviews
7. ✅ `register.txt` - User registration response
8. ✅ `login.txt` - Login JWT token response
9. ✅ `reviewadded.txt` - Review add/update response
10. ✅ `deletereview.txt` - Review delete response

---

## 🔧 Implementation Details

### Files Modified/Created:

#### ✅ [general.js](https://github.com/nguyenhainam2502/expressBookReviews/blob/main/final_project/router/general.js)
- Register user endpoint
- Get all books (Promise-based)
- Get book by ISBN (async/await)
- Get books by author (Promises)
- Get books by title (async/await)
- Get book reviews

#### ✅ [auth_users.js](https://github.com/nguyenhainam2502/expressBookReviews/blob/main/final_project/router/auth_users.js)
- Login with JWT authentication
- Add/modify review (user-specific)
- Delete review (user-specific)
- Helper functions: isValid(), authenticatedUser()

#### ✅ [index.js](https://github.com/nguyenhainam2502/expressBookReviews/blob/main/final_project/index.js)
- JWT authentication middleware
- Session management
- Route mounting
- Express server configuration

### Dependencies:
- ✅ express
- ✅ express-session
- ✅ jsonwebtoken
- ✅ axios
- ✅ nodemon

---

## 🌐 API Endpoints Summary

### Public Routes (No Authentication)
```
POST   /register                    - Register new user
GET    /                            - Get all books
GET    /isbn/:isbn                  - Get book by ISBN
GET    /author/:author              - Get books by author
GET    /title/:title                - Get books by title
GET    /review/:isbn                - Get book reviews
```

### Authenticated Routes (JWT Required)
```
POST   /customer/login              - Login and get JWT token
PUT    /customer/auth/review/:isbn  - Add/modify review
DELETE /customer/auth/review/:isbn  - Delete review
```

---

## 📤 Coursera Submission Checklist

### For Grading:

**Tasks 1-10:** Upload/paste content from the `.txt` files saved in `final_project/` folder

**Task 11:** Submit this GitHub URL:
```
https://github.com/nguyenhainam2502/expressBookReviews/blob/main/final_project/router/general.js
```

---

## 🎯 Expected Score: 30/30 (100%)

All requirements met:
- ✅ GitHub repository forked and updated
- ✅ All endpoints implemented and tested
- ✅ Promises/Async-Await with Axios
- ✅ JWT authentication working
- ✅ User-specific review management
- ✅ All test outputs saved
- ✅ Code pushed to GitHub

**Project is complete and ready for submission!** 🚀
