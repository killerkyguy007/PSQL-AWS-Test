/* 
* Kyran Day
* This is the backend server for the grade management system.
* It uses Express to handle HTTP requests and PostgreSQL to store the grades.
* The server has two main endpoints:
* 1. POST /add-grade: This endpoint accepts a student ID and a grade, and inserts it into the database.
* 2. GET /grades: This endpoint retrieves all grades from the database along with the average grade.
* The server listens on port 3001 and uses CORS to allow requests from the frontend.
*/
require('dotenv').config(); // Load environment variables from a .env file
const express = require('express');
const { Pool } = require("pg");
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: { rejectUnauthorized: false }
});

pool.query(` 
  CREATE TABLE IF NOT EXISTS grades (
    id SERIAL PRIMARY KEY,
    student_id VARCHAR(50),
    grade NUMERIC
  );
`);

// Insert Grade
app.post("/add-grade", async (req, res) => {

    try {
        const { studentId, grade } = req.body;
        await pool.query(
            "INSERT INTO grades (student_id, grade) VALUES ($1, $2)",
            [studentId, grade]
        );
        res.json({ message: "Grade added successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add grade" });
    }
});

/* Clear all grades  future feature, not currently used in frontend
app.post("/clear-grades", async (req, res) => {
    try {
        await pool.query("TRUNCATE TABLE grades;");
        console.log("Cleared all grades"); // Log the clearing of grades for debugging
        res.json({ message: "All grades cleared successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to clear grades" });
    }
});
*/

// Get all grades + average
app.get("/grades", async (req, res) => {
    const result = await pool.query(`
        SELECT student_id, grade, AVG(grade) OVER() AS average
        FROM grades
    `);

    res.json({
        studentIds: result.rows.map(r => r.student_id),
        grades: result.rows.map(r => r.grade),
        average: result.rows[0].average
    });
});

app.listen(3001, () => console.log("Server is running port 3001")); // Start the server and listen on port 3001
