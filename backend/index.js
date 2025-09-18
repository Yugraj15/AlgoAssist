require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const analyzeRouter = require('./routes/analyze');
const Snippet = require('./models/Snippet'); // Added this line

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '200kb' }));

const PORT = process.env.PORT || 5000;

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/algoassist';
mongoose.connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('MongoDB connect error', err);
  });

// Mount the analyze router at /api/analyze
app.use('/api/analyze', analyzeRouter);

// This route now fetches real history from the database
app.get('/api/history', async (req, res) => {
  try {
    const history = await Snippet.find().sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    console.error('History fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

// A simple root route to confirm the server is running.
app.get('/', (req, res) => res.send('AlgoAssist server is running '));

app.listen(PORT, () => {
  console.log(` Server listening on port ${PORT}`);
});