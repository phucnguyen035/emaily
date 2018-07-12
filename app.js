const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const { cookieKey } = require('./config/keys');

// Load Models
require('./models/User');

// Load Routes
const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoutes');

// Initialize variables
const app = express();
const PORT = process.env.PORT || 5000;
const db = process.env.DATABASE_URL || 'mongodb://localhost/emaily';

// Database connection
mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Initialize middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieSession({ maxAge: 7 * 24 * 60 * 60 * 1000, keys: [cookieKey] }));
app.use(passport.initialize());
app.use(passport.session());
require('./services/passport');

// Use routes
app.use('/auth/', authRoutes);
app.use('/api/stripe', billingRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Open server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
