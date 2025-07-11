import React, { useState } from 'react';
import {
    LineChart, Line,
    XAxis, YAxis,
    CartesianGrid, Tooltip,
    Legend, ResponsiveContainer
} from 'recharts';

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddExpense = () => {
    if (!description || !amount) return;

    setExpenses([{ id: Date.now(), description, amount: parseFloat(amount) }, ...expenses]);
    setDescription('');
    setAmount('');
  };

  const data = expenses.slice().reverse().map((item, index) => ({
    name: `#${index + 1}`,
    expense: item.amount
  }));

  return (
    <div className="p-4 bg-red-50 rounded-xl shadow w-full">
      <h2 className="text-2xl font-bold mb-4 text-red-700">Expense</h2>

      {/* Add Section */}
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Description"
          className="p-2 border rounded w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          className="p-2 border rounded w-full"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          className="bg-red-500 text-white p-2 rounded w-full"
          onClick={handleAddExpense}
        >
          Add Expense
        </button>
      </div>

      {/* Last 3 Items */}
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Last 3 Expenses</h3>
        <ul>
          {expenses.slice(0, 3).map((item) => (
            <li key={item.id} className="flex justify-between border-b py-1">
              <span>{item.description}</span>
              <span>${item.amount}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Graph */}
      <div className="h-64 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="expense" stroke="#EF4444" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
