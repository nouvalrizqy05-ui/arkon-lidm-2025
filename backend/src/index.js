const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'ARKON Backend Running',
    version: '1.0.0'
  });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/ai', require('./routes/ai'));
// app.use('/api/topics', require('./routes/topics'));
// app.use('/api/quiz', require('./routes/quiz'));
app.use('/api/progress', require('./routes/progress'));

app.listen(PORT, () => {
  console.log(`🚀 ARKON Backend running on port ${PORT}`);
});