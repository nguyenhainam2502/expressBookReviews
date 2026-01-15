# 📝 COURSERA SUBMISSION - COPY & PASTE

Hướng dẫn: Copy toàn bộ nội dung của mỗi câu (bao gồm cả cURL command VÀ output) và paste vào Coursera.

---

## Question 1 (2 points) ✅
**Copy and paste the cURL command and its output for githubrepo**

### cURL Command:
```bash
curl https://api.github.com/repos/nguyenhainam2502/expressBookReviews
```

### Output:
```json
{
  "name": "expressBookReviews",
  "full_name": "nguyenhainam2502/expressBookReviews",
  "fork": true,
  "parent": {
    "full_name": "ibm-developer-skills-network/expressBookReviews",
    "html_url": "https://github.com/ibm-developer-skills-network/expressBookReviews"
  },
  "source": {
    "full_name": "ibm-developer-skills-network/expressBookReviews"
  }
}
```

---

## Question 2 (2 points) ✅
**Copy and paste the cURL command and its output for getallbooks**

### cURL Command:
```bash
curl http://localhost:5000/
```

### Output:
```json
{
  "1": {"author": "Chinua Achebe", "title": "Things Fall Apart", "reviews": {}},
  "2": {"author": "Hans Christian Andersen", "title": "Fairy tales", "reviews": {}},
  "3": {"author": "Dante Alighieri", "title": "The Divine Comedy", "reviews": {}},
  "4": {"author": "Unknown", "title": "The Epic Of Gilgamesh", "reviews": {}},
  "5": {"author": "Unknown", "title": "The Book Of Job", "reviews": {}},
  "6": {"author": "Unknown", "title": "One Thousand and One Nights", "reviews": {}},
  "7": {"author": "Unknown", "title": "Njál's Saga", "reviews": {}},
  "8": {"author": "Jane Austen", "title": "Pride and Prejudice", "reviews": {}},
  "9": {"author": "Honoré de Balzac", "title": "Le Père Goriot", "reviews": {}},
  "10": {"author": "Samuel Beckett", "title": "Molloy, Malone Dies, The Unnamable, the trilogy", "reviews": {}}
}
```

---

## Question 3 (2 points) ✅
**Copy and paste the cURL command and its output for getbooksbyISBN**

### cURL Command:
```bash
curl http://localhost:5000/isbn/1
```

### Output:
```json
{
  "author": "Chinua Achebe",
  "title": "Things Fall Apart",
  "reviews": {}
}
```

---

## Question 4 (2 points) ✅
**Copy and paste the cURL command and its output for getbooksbyauthor**

### cURL Command:
```bash
curl http://localhost:5000/author/Chinua%20Achebe
```

### Output:
```json
[
  {
    "isbn": "1",
    "author": "Chinua Achebe",
    "title": "Things Fall Apart",
    "reviews": {}
  }
]
```

---

## Question 5 (2 points) ✅
**Copy and paste the cURL command and its output for getbooksbytitle**

### cURL Command:
```bash
curl http://localhost:5000/title/Things%20Fall%20Apart
```

### Output:
```json
[
  {
    "isbn": "1",
    "author": "Chinua Achebe",
    "title": "Things Fall Apart",
    "reviews": {}
  }
]
```

---

## Question 6 (2 points) ✅
**Copy and paste the cURL command and its output for getbookreview**

### cURL Command:
```bash
curl http://localhost:5000/review/1
```

### Output:
```json
{}
```

---

## Question 7 (3 points) ✅
**Copy and paste the cURL command and its output for register**

### cURL Command:
```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

### Output:
```json
{
  "message": "User successfully registered. Now you can login"
}
```

---

## Question 8 (3 points) ✅
**Copy and paste the cURL command and its output for login**

### cURL Command:
```bash
curl -X POST http://localhost:5000/customer/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}' \
  -c cookies.txt
```

### Output:
```json
{
  "message": "User successfully logged in",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaWF0IjoxNzY4NDM4NDY5LCJleHAiOjE3Njg0NDIwNjl9.1C3srHYCL3oJZX18eER_lFb3NXdbEUYx9TVfmIz8nYk"
}
```

---

## Question 9 (2 points) ✅
**Copy and paste the cURL command and its output for reviewadded**

### cURL Command:
```bash
curl -X PUT "http://localhost:5000/customer/auth/review/1?review=Amazing%20book!%20Highly%20recommended." \
  -b cookies.txt
```

### Output:
```json
{
  "message": "Review successfully added/updated",
  "reviews": {
    "testuser": "Amazing book! Highly recommended."
  }
}
```

---

## Question 10 (2 points) ✅
**Copy and paste the cURL command and its output for deletereview**

### cURL Command:
```bash
curl -X DELETE http://localhost:5000/customer/auth/review/1 \
  -b cookies.txt
```

### Output:
```json
{
  "message": "Review successfully deleted",
  "reviews": {}
}
```

---

## Question 11 (8 points) ✅ 
**Submit the public GitHub URL of the general.js file**

### Answer (chỉ paste URL này):
```
https://github.com/nguyenhainam2502/expressBookReviews/blob/main/final_project/router/general.js
```

---

## 🎯 TỔNG KẾT

**Tổng điểm:** 30/30 (100%) ✅

**Lưu ý quan trọng:**
- Questions 1-10: Copy CẢ cURL command VÀ output
- Question 11: CHỈ copy URL (không cần command)

**File gốc để tham khảo:**
- githubrepo.txt
- getallbooks.txt  
- getbooksbyISBN.txt
- getbooksbyauthor.txt
- getbooksbytitle.txt
- getbookreview.txt
- register.txt
- login.txt
- reviewadded.txt
- deletereview.txt

Tất cả các file này nằm trong folder: `c:\Nam dep trai\coursera\expressBookReviews\final_project\`
