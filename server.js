import express from 'express';
import connectDatabase from './config/db.js';

const app = express();

// Connect to the database
connectDatabase();

// Configure middleware
app.use(express.json());

// API endpoints
app.get('/', (req, res) =>
  res.send('http get request sent to root api endpoint')
);

/**
 * @route POST api/users
 * @desc Register user
 */
app.post('/api/users', (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

// Connection listener
const PORT = 3000;
app.listen(PORT, () => console.log(`Express server running on port ${PORT}`));