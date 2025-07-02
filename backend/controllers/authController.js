const User = require('../models/User');

const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
}

exports.registerUser = async (req, res) => {
    const { fullName, email, password, profileImageURL } = req.body;
    // Validation:Check for missing fields
    if(!fullName || !email || !password) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }
    // check if email already exists
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        // Create new user
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageURL
        });

        res.status(201).json({
            _id: user._id,
            user,
            
            token: generateToken(user._id)
        });

    }
    catch (err) {
        res
            .status(500)
            .json({ message: 'Error registering user', error: err.message });

    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    // Validation:Check for missing fields
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are Required' });
    }
    // Check if user exists
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    }  catch (err) {
        res
            .status(500)
            .json({ message: 'Error registering user', error: err.message });

    }
};

exports.getUserInfo = async (req, res) => {
    try{
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res
            .status(500)
            .json({ message: 'Error registering user', error: err.message });

    }
};
      