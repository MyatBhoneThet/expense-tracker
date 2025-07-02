const Expense = require('../models/Expense');
const xlsx = require('xlsx');

// Add expense
exports.addExpense = async (req, res) => {
    const userId = req.user.id;
    try{
        const { icon, category, amount, date } = req.body;

        // Validate input check missing fields
        if (!category || !amount || !date) {
            return res.status(400).json({ message: 'All Fields are required' });
        }

        // Create new income entry
        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date) // Ensure date is stored as a Date object
        });

        await newExpense.save();
        res.status(200).json(newIncome);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

// Get all expenses
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;
    try {
        // Fetch all income entries for the user
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        res.json(expense);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

// Delete income by ID
exports.deleteExpense = async (req, res) => {
    try {
        // Find and delete the income entry
        await Expense.findByIdAndDelete(req.params.id);

        res.json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


// Download income data as Excel file
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        // Prepare data for Excel
        const data = expense.map((item) => ({
            category: item.category,
            Amount: item.amount,
            Date: item.date, // Format date as YYYY-MM-DD
        }));

        // Create Excel file
        const ws = xlsx.utils.json_to_sheet(data);
        const wb = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb, ws, 'expense');
        xlsx.writeFile(wb, 'expenses_details.xlsx');
        
        res.download('expense_details.xlsx');
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}