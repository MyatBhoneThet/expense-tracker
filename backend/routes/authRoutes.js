// All Express routes for /register, /login, /profile

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            message: 'Please include all fields'
        });
    };
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({
            message: 'User already exists'
        });
    };
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
        name: name,
        email: email,
        password: hashed
    });
    res.json({
        message: 'User registered'
    });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(
        password,
        user.password
    ))) {
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );
        return res.json({ token });
    };
    res.status(401).json({
        message: 'Invalid credentials'
    });
});

router.get('/profile', protect, (req, res) => {
    res.json({ message: `Hello user ${req.user.id}` });
});

module.exports = router;
