const express = require('express');
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
  const { name, email, age, message } = req.body;
  const errors = [];

  // Validate name (required, at least 2 characters)
  if (!name || name.trim().length < 2) {
    errors.push('Name is required and must be at least 2 characters');
  }

  // Validate email (required, must be valid email format)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push('Valid email address is required');
  }

  // Validate age (optional, but must be a number between 18-120 if provided)
  if (age !== undefined) {
    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum) || ageNum < 18 || ageNum > 120) {
      errors.push('Age must be a number between 18 and 120');
    }
  }

  // Validate message (optional, but must be at least 10 characters if provided)
  if (message !== undefined && message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }

  // Return response based on validation
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors: errors
    });
  } else {
    return res.status(200).json({
      success: true,
      message: 'Form data validated successfully',
      data: { name, email, age, message }
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    serverTime: new Date(),
    uptime: process.uptime()
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log('Press Ctrl+C to quit');
});
