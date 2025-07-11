const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  amount: Number,
  date: Date,
}, { timestamps: true })
module.exports = mongoose.model('Expense', expenseSchema)
