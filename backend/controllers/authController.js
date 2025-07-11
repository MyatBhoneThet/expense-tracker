// Main logic functions for register, login, profile

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.register = async (req, res) => {
    const { name, email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (user) return res.status(400).json({ message: 'User already exists' })

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        user = new User({
            name,
            email,
            password: hashedPassword  // ✅ use hashed password
        })
        await user.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server error' })
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log("==== LOGIN DEBUG ====");
    console.log("Incoming body:", req.body);

    try {
        const user = await User.findOne({ email });
        console.log("User from DB:", user);

        if (!user) {
            console.log("User not found with email:", email);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match result:", isMatch);

        if (!isMatch){
            console.log("Password did NOT match for:", email);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        console.log("✅ Login successful for:", email);
        return res.json({
            message: "Login success",
            user: { id: user._id, name: user.name, email: user.email }
        });

    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: 'Server error' });
    }
};

