const dotenv = require('dotenv'); 
dotenv.config();

const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');

// Middleware setup
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser()); 

// Database connection
connectToDb();

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Hello World');
});

// User routes
const userRoutes = require('./routes/user.routes');
app.use('/users', userRoutes);

//Captain routes
const captainRoutes = require('./routes/captain.routes')
app.use('/captain',captainRoutes)

module.exports = app;
