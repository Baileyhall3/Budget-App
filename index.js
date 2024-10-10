const express = require('express');
const path = require('path');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Import the auth routes
const accountRoutes = require('./routes/account'); // Import account routes

const app = express();

// Middleware setup
app.use(cors()); // Enable CORS if needed
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files
app.use(express.json()); // to handle JSON payloads

app.use('/api/account', accountRoutes); // Use the account routes
app.use('/api/auth', authRoutes); // Use the authentication routes

// Define routes for the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

