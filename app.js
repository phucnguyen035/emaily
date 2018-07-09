const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;
const db = process.env.DATABASE_URL || 'mongodb://localhost/emaily';

mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: 'hello world!' });
});

app.listen(PORT, (req, res) => {
  console.log(`Server started on port ${PORT}`);
});
