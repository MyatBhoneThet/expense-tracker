// Entry point. Starts Express server, loads middlewares, connects to MongoDB.
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const cors = require('cors')
const incomeRoutes = require('./routes/incomeRoutes');
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.error("❌ DB Connection Error:", err))

const UserSchema = new mongoose.Schema({
    email: String,
    password: String
})
const User = mongoose.model('User', UserSchema)

app.post('/register', async (req, res) => {
    const { email, password } = req.body

    console.log("==> Register hit with:", email, password)

    if (!email || !password) return res.status(400).json({ message: 'Missing fields' })

    const existing = await User.findOne({ email })
    if (existing) return res.status(400).json({ message: 'User exists' })

    const hashed = await bcrypt.hash(password, 10)
    const user = new User({ email, password: hashed })
    await user.save()

    console.log("==> Saved user:", user)
    res.json({ message: 'Registered' })
})


app.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Invalid credentials' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' })

    res.json({ message: 'Login success' })
})

app.use('/api', incomeRoutes);

app.listen(5000, () => console.log('Server running on port 5000'))
