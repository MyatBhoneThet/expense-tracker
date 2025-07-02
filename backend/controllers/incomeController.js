const User = require('../models/User');
const Income = require('../models/Income');
const xlsx = require('xlsx');

// Add income
exports.addIncome = async (req, res) => {
    const userId = req.user.id;
    try{
        const { icon, source, amount, date } = req.body;

        // Validate input check missing fields
        if (!source || !amount || !date) {
            return res.status(400).json({ message: 'All Fields are required' });
        }

        // Create new income entry
        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date) // Ensure date is stored as a Date object
        });

        await newIncome.save();
        res.status(200).json(newIncome);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

// Get all incomes
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        // Fetch all income entries for the user
        const incomes = await Income.find({ userId }).sort({ date: -1 });
        res.json(incomes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

// Delete income by ID
exports.deleteIncome = async (req, res) => {
    try {
        // Find and delete the income entry
        await Income.findByIdAndDelete(req.params.id);

        res.json({ message: 'Income deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


// Download income data as Excel file
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        // Prepare data for Excel
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date, // Format date as YYYY-MM-DD
        }));

        // Create Excel file
        const ws = xlsx.utils.json_to_sheet(data);
        const wb = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb, ws, 'Income');
        xlsx.writeFile(wb, 'incomes_details.xlsx');
        
        res.download('income_details.xlsx');
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}