import React from "react";

export default function Expenses() {
  return (
    <div className="ml-64 p-6">
      <h1 className="text-2xl font-bold mb-4">Expenses</h1>
      <div className="mb-4">
        <input className="p-2 mr-2" placeholder="Title"/>
        <input className="p-2 mr-2" placeholder="Amount"/>
        <button className="bg-red-500 text-white p-2 rounded">+ Add Expense</button>
      </div>
      <div className="bg-gray-200 p-2 mb-2">Expense 1</div>
      <div className="bg-gray-200 p-2 mb-2">Expense 2</div>
    </div>
  );
}
