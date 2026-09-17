import express from 'express';
import connectDatabase from './config/db.js';

const app = express();

// Connect to the database
connectDatabase();

// Configure middleware
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});