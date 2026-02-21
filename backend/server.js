// Kyran Day

require('dotenv').config(); // Load environment variables from a .env file
const express = require('express');
const { Pool } = require("pg");
const cors = require('cors');

const app = express();   // Create an instance of the Express application
app.use(cors());         // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies in incoming requests

const pool = new Pool({ // Create a new connection pool to the PostgreSQL database
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false
    }
});

// Create the grades table if it doesn't exist yet
pool.query(` 
  CREATE TABLE IF NOT EXISTS grades (
    id SERIAL PRIMARY KEY,
    student_id VARCHAR(50),
    grade NUMERIC
  );
`);

// Insert Grade
app.post("/add-grade", async (req, res) => { // Define a POST route to add a new grade

    try {

        console.log("BODY:", req.body);
        const { studentId, grade } = req.body; // Extract student_id and grade from the request body

        await pool.query( // Insert the new grade into the database
            "INSERT INTO grades (student_id, grade) VALUES ($1, $2)", // Use parameterized query to prevent SQL injection
            [studentId, grade]
        );
        console.log(`Added grade ${grade} for student ${studentId}`); // Log the added grade for debugging
        res.json({ message: "Grade added successfully" }); // Send a success response
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add grade" });
    }
});

// Get all grades + average
app.get("/grades", async (req, res) => {
    const result = await pool.query("SELECT * FROM grades");
    const avg = await pool.query("SELECT AVG(grade) FROM grades");

    res.json({
        grades: result.rows,
        average: avg.rows[0].avg
    });
});

app.listen(3001, () => console.log("Server is running port 3001")); // Start the server and listen on port 3001
