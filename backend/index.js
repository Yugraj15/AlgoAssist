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

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/algoassist';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connect error', err);
});

app.get('/api/history', (req, res) => {
    // For now, we will send back an empty list.
    // This is what the frontend expects, so it won't crash.
    // In the future, you will replace this with real data from your database.
    res.json([]);
});

app.use('/api', analyzeRouter);

app.get('/', (req, res) => res.send('AlgoAssist server is running'));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.get('/api/history', (req, res) => {
    // For now, let's just send back a simple empty array.
    // In the future, this is where you would get data from a database.
    res.json([]); 
});

// ...
const corsOptions = {
  origin: 'https://alqoassist.onrender.com'
};
app.use(cors(corsOptions));
