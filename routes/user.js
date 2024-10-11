const express = require('express');
const router = express.Router();
const { User } = require('../models'); // Assuming you're using Sequelize or another ORM
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');

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

// Fetch all users except the logged-in user
router.get('/', authenticateToken, async (req, res) => {
    try {
        const users = await User.findAll({
            where: {
                id: {
                    [Sequelize.Op.ne]: req.user.id // Exclude the logged-in user's ID
                }
            },
            attributes: ['id', 'name'] // Select only the necessary fields
        });

        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

module.exports = router;
