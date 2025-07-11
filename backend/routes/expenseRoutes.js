const express = require('express')
const router = express.Router()
const { addExpense, getExpenses } = require('../controllers/expenseController')
const protect = require('../middleware/protect')

router.route('/')
  .post(protect, addExpense)
  .get(protect, getExpenses)

module.exports = router
