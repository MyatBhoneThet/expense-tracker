// import React, { useState } from 'react';
// import {
//     LineChart, Line,
//     XAxis, YAxis,
//     CartesianGrid, Tooltip,
//     Legend, ResponsiveContainer
// } from 'recharts';

// export default function Incomes() {
//     const [incomes, setIncomes] = useState([]);
//     const [description, setDescription] = useState('');
//     const [amount, setAmount] = useState('');

//     const handleAddIncome = () => {
//         if (!description || !amount) return;
//         setIncomes([{ id: Date.now(), description, amount: parseFloat(amount) }, ...incomes]);
//         setDescription('');
//         setAmount('');
//     };

//     const data = incomes.slice().reverse().map((item, index) => ({
//         name: `#${index + 1}`,
//         income: item.amount
//     }));

//     return (
//         <div className="p-4 bg-green-50 rounded-xl shadow w-full">
//             <h2 className="text-2xl font-bold mb-4 text-green-700">Income</h2>

//             {/* Add Section */}
//             <div className="space-y-2">
//                 <input
//                     type="text"
//                     placeholder="Description"
//                     className="p-2 border rounded w-full"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                 />
//             <input
//                 type="number"
//                 placeholder="Amount"
//                 className="p-2 border rounded w-full"
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//             />
//             <button
//                 className="bg-green-500 text-white p-2 rounded w-full"
//                 onClick={handleAddIncome}
//             >Add Income</button>
//         </div>

//         {/* Last 3 Items */}
//         <div className="mt-4">
//             <h3 className="font-semibold mb-2">Last 3 Incomes</h3>
//             <ul>
//                 {incomes.slice(0, 3).map((item) => (
//                 <li key={item.id} className="flex justify-between border-b py-1">
//                     <span>{item.description}</span>
//                     <span>${item.amount}</span>
//                 </li>
//                 ))}
//             </ul>
//         </div>

//       {/* Graph */}
//         <div className="h-64 mt-4">
//             <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={data}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line type="monotone" dataKey="income" stroke="#10B981" />
//             </LineChart>
//             </ResponsiveContainer>
//         </div>
//     </div>
//     );
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    LineChart, Line,
    XAxis, YAxis,
    CartesianGrid, Tooltip,
    Legend, ResponsiveContainer
} from 'recharts';

export default function Income() {
    const [incomes, setIncomes] = useState([]);
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        fetchIncomes();
    }, []);

    const fetchIncomes = () => {
        axios.get('http://localhost:5000/api/income')
            .then(res => setIncomes(res.data))
            .catch(err => console.error(err));
    }

    const handleAddIncome = () => {
        if (!title || !amount || !date) return;

        axios.post('http://localhost:5000/api/income', {
            title,
            amount,
            date
        })
        .then(() => {
            setTitle('');
            setAmount('');
            setDate('');
            fetchIncomes();
        })
        .catch(err => console.error(err));
    }

    // Prepare data for LineChart
    const chartData = incomes.slice().reverse().map((item, index) => ({
        name: `${item.title || 'Income'} ${index + 1}`,
        income: item.amount
    }));

    return (
        <div className="p-6 bg-green-50 rounded-xl shadow w-full">
            <h2 className="text-2xl font-bold mb-4 text-green-700">Add Income</h2>

            {/* Add Section */}
            <div className="space-y-3">
                <input
                    type="text"
                    placeholder="Title"
                    className="p-2 border rounded w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Amount"
                    className="p-2 border rounded w-full"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <input
                    type="date"
                    className="p-2 border rounded w-full"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <button
                    className="bg-green-500 text-white p-2 rounded w-full"
                    onClick={handleAddIncome}
                >Add Income</button>
            </div>

            {/* Last 3 Items */}
            <div className="mt-6">
                <h3 className="font-semibold mb-2">Last 3 Incomes</h3>
                <ul>
                    {incomes.slice(0, 3).map((item, index) => (
                        <li key={index} className="flex justify-between border-b py-1">
                            <span>{item.title}</span>
                            <span>${item.amount} on {new Date(item.date).toLocaleDateString()}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Graph */}
            <div className="h-72 mt-6">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="income" stroke="#10B981" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
