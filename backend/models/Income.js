const mongoose = require('mongoose')

const incomeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    amount: Number,
    date: Date,
}, { timestamps: true })
module.exports = mongoose.model('Income', incomeSchema)
