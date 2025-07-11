const Income = require('../models/Income');

// GET /api/income
exports.getAllIncome = async (req, res) => {
    try {
        const incomes = await Income.find().sort({ createdAt: -1 });
        res.json(incomes);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
};

// POST /api/income
exports.addIncome = async (req, res) => {
    const { title, amount, date } = req.body;
    try {
        const newIncome = new Income({ title, amount, date });
        await newIncome.save();
        res.status(201).json(newIncome);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
};

