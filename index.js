const express = require('express');
const path = require('path');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const accountRoutes = require('./routes/account');
const userRoutes = require('./routes/user');

const app = express();

// Middleware setup
app.use(cors()); // Enable CORS if needed
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files
app.use(express.json()); // to handle JSON payloads

// DB table routes
app.use('/api/account', accountRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Define routes for the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

