const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect database
connectDB();

// Middleware
app.use(express.json({ extended: false }));
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.use('/users', require('./routes/users'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', index.html));
  });
}

// Start the server
const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Server listening at ${port}`);
