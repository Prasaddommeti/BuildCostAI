const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/estimate', require('./routes/estimateRoutes'));
app.use('/api/report', require('./routes/reportRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'BuildCostAI Express API', timestamp: new Date().toISOString() });
});

// Root fallback
app.get('/', (req, res) => {
  res.send('BuildCostAI API Server running');
});

// Start Server
app.listen(PORT, () => {
  console.log(`[BuildCostAI Server] Running on http://localhost:${PORT}`);
});
