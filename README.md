# Grade Management System

A full-stack test app that manages student grades with a React frontend and Express.js backend, backed by PostgreSQL.

## Tech Stack

- **Frontend**: React 19 + Vite
- **Backend**: Express.js + Node.js
- **Database**: PostgreSQL
- **Cloud**: AWS (for deployment)

## Prerequisites

- Node.js (v16+)
- PostgreSQL database
- AWS account (for deployment)

## Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your database credentials:
   ```
   DB_HOST=your_db_host
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   DB_PORT=5432
   ```

4. Start the server:
   ```bash
   node server.js
   ```
   Server runs on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

## API Endpoints

- **POST** `/add-grade` - Add a new student grade
  - Body: `{ "studentId": "string", "grade": number }`
  
- **GET** `/grades` - Retrieve all grades and average

## Database

The PostgreSQL database automatically creates a `grades` table with the following schema:
- `id` (SERIAL PRIMARY KEY)
- `student_id` (VARCHAR)
- `grade` (NUMERIC)

## Features

- Add student grades
- View all grades with average calculation

## Project Structure

```
Assignment2/
├── backend/
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── EnterGrade.jsx
    │   │   └── GradesPage.jsx
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

