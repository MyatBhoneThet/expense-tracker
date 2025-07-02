const Income = require("../models/Income");
const Expense = require("../models/Expense");

const { isValidObjectId, Types } = require("mongoose");

exports.getDashboardData = async (req,res) => {
    try{
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    const totalIncome = await Income.aggregate([
        { $match: {userId: userObjectId } },
        { $group: { _id:null, total: {$sum: "$amount" } } },
    ]);
    console.log("totalIncome", {totalIncome, userId: isValidObjectId(userId)});

    const totalExpense = await Expense.aggregate([
        { $match: {userId: userObjectId } },
        { $group: { _id:null, total: {$sum: "$amount" } } },
    ]);

    // get income transctions in last60days
    const last60DaysIncomeTransactions = await Income.find({
        userId,
        date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    // get total income for last 60days
    const incomeLast60days = last60DaysIncomeTransactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
    );

    // get expense transactios in last 30days
    const last30DaysExpenseTransactions = await Expense.find({
        userId,
        date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 *1000) },
    }).sort({ date: -1});

    // get total expenses for last 30days
    const expensesLast30days = last30DaysExpenseTransactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
    );

    // fetch lst5 transactions(income + expenses)
    const lastTransactions = [
        ...(await Income.find({ userId }).sort({ date: - 1}).limit(5)).map(
            (txn) => ({
                ...txn.toObject(),
                type: "income",
            })
        ),
        ...(await Expense.find({userId}).sort({date: -1}).limit(5)).map(
            (txn) => ({
                ...txn.toObject(),
                type: "expense",
            })
        ),
    ].sort((a,b) => b.date - a.date); //sort lastest first

    res.json({
        totalBalance:
            (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
        totalIncome: totalIncome[0]?.total || 0,
        totalExpenses: totalExpense[0]?.total || 0,
        last30DaysExpenses: {
            total: expensesLast30days,
            transactions: last30DaysExpenseTransactions,
        },
        last60DaysIncome: {
            total: incomeLast60days,
            transactions: last60DaysIncomeTransactions,
        },
        recentTransactions: lastTransactions,
    });
    } catch (error){
        res.status(500).json({ message: "Server Error", error});
    }
}