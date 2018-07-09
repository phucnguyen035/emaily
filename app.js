const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Routes
const authRoutes = require('./routes/authRoutes');

// Passport middleware
require('./services/passport');

// Initialize variables
const app = express();
const PORT = process.env.PORT || 5000;
const db = process.env.DATABASE_URL || 'mongodb://localhost/emaily';

// Database connection
mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: 'hello world!' });
});

// Use routes
app.use('/auth/', authRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
