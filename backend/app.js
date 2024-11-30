const dotenv = require('dotenv'); // Correct spelling
dotenv.config();

const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db'); // Ensure the path to your DB connection file is correct

// Middleware setup
app.use(cors());
app.use(express.json()); // Middleware for parsing JSON payloads
app.use(express.urlencoded({ extended: true })); // Middleware for parsing URL-encoded data
app.use(cookieParser()); // Middleware for parsing cookies

// Database connection
connectToDb();

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Hello World');
});

// User routes
const userRoutes = require('./routes/user.routes');
app.use('/users', userRoutes);

module.exports = app;
