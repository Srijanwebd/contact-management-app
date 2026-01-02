# Contact Management App (MERN)

A simple Contact Management Web App built using the MERN stack (MongoDB, Express, React, Node.js).  
Supports adding contacts, viewing the list, and deleting contacts.

## Features
- Add a new contact (Name, Email, Phone)
- Basic frontend validation
- View all saved contacts
- Delete a contact
- Backend REST API
- MongoDB Atlas database

## Tech Stack
- **Frontend:** React (Create React App)
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas
- **ODM:** Mongoose

## Project Structure
contact-management-app/
backend/
config/
db.js
models/
Contact.js
routes/
contactRoutes.js
.env
server.js
package.json
frontend/
src/
App.js
package.json


## Prerequisites
- Node.js (v18+ recommended)
- npm
- MongoDB Atlas account (or local MongoDB)

## Setup Instructions (Run Locally)

### 1) Clone the repository
```bash
git clone <YOUR_GITHUB_REPO_URL>
cd contact-management-app

2) Backend Setup
cd backend
npm install
Create a .env file inside backend/:
PORT=5000
MONGO_URI=YOUR_MONGODB_ATLAS_CONNECTION_STRING
Start backend server:
npm run dev
Backend runs at:
http://localhost:5000

3) Frontend Setup

Open a new terminal:
cd frontend
npm install
npm start

Frontend runs at:

http://localhost:3000

API Endpoints

Base URL: http://localhost:5000

Get all contacts

GET /api/contacts

Add a contact

POST /api/contacts
Body (JSON):
{
  "name": "John",
  "email": "john@test.com",
  "phone": "9999999999"
}

Delete a contact

DELETE /api/contacts/:id

Notes

Frontend uses a proxy to call the backend API.

.env is not committed to GitHub for security reasons.

Focused on functionality and clean structure as per task guidelines.
