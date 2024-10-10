const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { User } = require('../models');

// Register route
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a token and include the user's name
        const token = jwt.sign({ id: user.id, name: user.name }, 'your_jwt_secret', { expiresIn: '7d' });

        // Send the token and the user name
        res.status(200).json({ token, name: user.name });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});


module.exports = router;
