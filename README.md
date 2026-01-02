# 📇 Contact Management App (MERN Stack)

A full-stack **Contact Management Application** built using the **MERN stack** (MongoDB, Express, React, Node.js).  
The app allows users to **add, view, and delete contacts** with real-time updates and validation.

This project is built for **learning, demonstration, and portfolio purposes**.

---

## 🚀 Live Demo

**Frontend + Backend (Single Deployment on Render):**  
👉 https://contact-management-app-1-iz80.onrender.com/

**API Endpoint:**  
👉 https://contact-management-app-1-iz80.onrender.com/api/contacts

---

## ✨ Features

- Add new contacts (Name, Email, Phone)
- Input validation (required fields + email format)
- View all saved contacts
- Delete contacts instantly
- Clean and responsive UI
- Status messages (success / error)
- Full-stack deployment (frontend + backend together)
- MongoDB Atlas cloud database

---

## 🛠️ Tech Stack

### Frontend
- React (Create React App)
- JavaScript (ES6+)
- Fetch API
- Inline styling (clean & simple UI)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv

### Database
- MongoDB Atlas (Cloud)

### Deployment
- Render (Web Service)
- GitHub (Version Control)

---

## 📁 Project Structure

contact-management-app/
│
├── backend/
│ ├── config/
│ │ └── db.js
│ ├── models/
│ │ └── Contact.js
│ ├── routes/
│ │ └── contactRoutes.js
│ ├── server.js
│ ├── package.json
│
├── frontend/
│ ├── public/
│ ├── src/
│ │ └── App.js
│ ├── package.json
│
├── .gitignore
├── README.md


---

## ⚙️ Environment Variables

Create a `.env` file in the **backend** directory with:

PORT=5000
MONGO_URI=your_mongodb_connection_string


On Render, the same variables are added via **Environment Variables** settings.

---

## 🧪 API Endpoints

| Method | Endpoint              | Description           |
|------|----------------------|-----------------------|
| GET  | `/api/contacts`       | Get all contacts      |
| POST | `/api/contacts`       | Add a new contact     |
| DELETE | `/api/contacts/:id` | Delete a contact      |

---

## 🖥️ Run Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Srijanwebd/contact-management-app.git
cd contact-management-app

2️⃣ Backend setup
cd backend
npm install
npm run dev

3️⃣ Frontend setup
cd frontend
npm install
npm start

Frontend runs on http://localhost:3000
Backend runs on http://localhost:5000

📌 Deployment Notes

Frontend build is served by Express using express.static

API routes are prefixed with /api

Relative API calls (/api/contacts) ensure production compatibility

MongoDB Atlas IP access is configured correctly for Render

👤 Author

Srijan Sharma
B.Tech – Computer & Communication Engineering
Aspiring Full-Stack Developer

📄 License

This project is created for educational and demonstration purposes only.

⭐ If you like this project, consider giving it a star on GitHub!
