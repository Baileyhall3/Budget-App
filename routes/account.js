const express = require('express');
const router = express.Router();
const { Account } = require('../models'); // Assuming you're using Sequelize or another ORM
const jwt = require('jsonwebtoken');

// Middleware to authenticate the user by checking the token
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret'); // Replace 'your_jwt_secret' with your actual secret
        req.user = decoded; // Attach the user information (id, name) to req
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

// Create a new account route
router.post('/create', authenticateToken, async (req, res) => {
    const { accountName, defaultCurrency, accountType, defaultAccount } = req.body;

    try {
        // Create a new account for the logged-in user
        const newAccount = await Account.create({
            name: accountName,
            currency: defaultCurrency,
            type: accountType,
            userId: req.user.id,  // Attach the logged-in user's ID
            sharedWithId: sharedWithId || null,
            isDefault: defaultAccount || false, // If defaultAccount is checked, set it to true
        });

        res.status(201).json({ message: 'Account created successfully', account: newAccount });
    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).json({ message: 'Error creating account', error });
    }
});

// Fetch all accounts for the logged-in user
router.get('/list', authenticateToken, async (req, res) => {
    try {
        // Fetch all accounts for the user based on the user ID in the token
        const accounts = await Account.findAll({ where: { userId: req.user.id } });

        // If no accounts found
        if (accounts.length === 0) {
            return res.status(404).json({ message: 'No accounts found' });
        }

        // Return the accounts
        res.status(200).json(accounts);
    } catch (error) {
        console.error('Error fetching accounts:', error);
        res.status(500).json({ message: 'Error fetching accounts', error });
    }
});

module.exports = router;