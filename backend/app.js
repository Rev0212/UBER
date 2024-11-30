const dotenv = require('dotenv'); // Correct spelling
dotenv.config();

const express = require('express');
const app = express();
const cors = require('cors');
const connectToDb = require('./db/db'); // Ensure the path to your DB connection file is correct

app.use(cors());
app.use(express.json()); // Middleware for parsing JSON payloads
app.use(express.urlencoded({ extended: true })); // Middleware for parsing URL-encoded data

const userRoutes = require('./routes/user.routes');
connectToDb();

app.get('/', (req, res) => {
    res.send('Hello World'); // Fixed typo in the string and closing parenthesis
});

app.use('/users', userRoutes);

module.exports = app;
