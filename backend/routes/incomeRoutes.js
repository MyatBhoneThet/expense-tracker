const express = require('express');
const router = express.Router();
const { getAllIncome, addIncome } = require('../controllers/incomeController');

router.get('/income', getAllIncome);
router.post('/income', addIncome);

module.exports = router;
