const express = require('express');
const { validateFormData } = require('./utils/validators');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Simple route that responds with a welcome message
app.get('/', (req, res) => {
  res.json({ 
    message: 'Hello World! Welcome to your super easy Node.js project!',
    timestamp: new Date()
  });
});

// Form validation API endpoint
app.post('/api/validate', (req, res) => {
  const validation = validateFormData(req.body);
  
  if (!validation.isValid) {
    return res.status(400).json({
      success: false,
      errors: validation.errors
    });
  } 
  
  return res.status(200).json({
    success: true,
    message: 'Form data validated successfully',
    data: req.body
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    serverTime: new Date(),
    uptime: process.uptime()
  });
});

// Export for testing
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('Press Ctrl+C to quit');
  });
}

module.exports = app;