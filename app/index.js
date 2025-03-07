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

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log('Press Ctrl+C to quit');
});
