import express from 'express';
import connectDatabase from './config/db.js';
import { check, validationResult } from 'express-validator';

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
app.post('/api/users', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    // Later we will save the user to the database here
    return res.send(req.body);
  }
});

// Connection listener
const PORT = 3000;
app.listen(PORT, () => console.log(`Express server running on port ${PORT}`));