require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const analyzeRouter = require('./routes/analyze');

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '200kb' }));

const PORT = process.env.PORT || 5000;

// Correctly use the environment variable for database connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/algoassist';
mongoose.connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('MongoDB connect error', err);
  });

// Mount the router for the /api endpoint
app.use('/api', analyzeRouter);

// This is the correct route to handle the /api/history endpoint
app.get('/api/history', (req, res) => {
    // For now, we will send back an an empty list.
    // In the future, you would replace this with real data from your database.
    res.json([]);
});

// A simple root route to confirm the server is running.
app.get('/', (req, res) => res.send('AlgoAssist server is running'));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});