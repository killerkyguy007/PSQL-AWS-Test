// Kyran Day

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
        console.log("BODY:", req.body);
        const { studentId, grade } = req.body;
        await pool.query(
            "INSERT INTO grades (student_id, grade) VALUES ($1, $2)",
            [studentId, grade]
        );
        console.log(`Added grade ${grade} for student ${studentId}`); // Log the added grade for debugging
        res.json({ message: "Grade added successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add grade" });
    }
});

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
