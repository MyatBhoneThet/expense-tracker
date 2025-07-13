import React from 'react';
import CustomPieChart from '../../components/Charts/CustomPieChart';

const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];
const FinanceOverview = ({ totalBalance, totalExpense ,totalIncome }) => {
    const balanceData = [
        { name: "Total Balance", amount: totalBalance },
        { name: "Total Expenses", amount: totalExpense },
        { name: "Total Income", amount: totalIncome },
    ];

    return <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Financial Overview</h5>
        </div>

        <CustomPieChart
            data={balanceData}
            colors={COLORS}
            label ="Total Balance"
            totalAmount ={`$${totalBalance}`}
            showTextAnchor={true}
        />
    </div>;
};

export default FinanceOverview;
