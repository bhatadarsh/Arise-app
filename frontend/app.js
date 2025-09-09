// app.js
const express = require('express');
const path = require('path');

const app = express();

// Set EJS as the template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Node-fetch (CommonJS trick)
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

// API URL
const URL = 'http://localhost:8000/api';

// Home route
app.get('/', async (req, res) => {
  try {
    const response = await fetch(URL, { method: 'GET' });
    const data = await response.json();

    // Pass "data" to index.ejs
    res.render('index', { data });
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Start server
app.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
});
