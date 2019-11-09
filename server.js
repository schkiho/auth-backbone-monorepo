const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const app = express();

// Connect database
connectDB();

// Middleware
app.use(express.json({ extended: false }));
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.use('/users', require('./routes/users'));

// Start the server
const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Server listening at ${port}`);
