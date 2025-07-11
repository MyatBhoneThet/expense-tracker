import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-60 h-screen bg-gray-200 p-4 fixed">
      <div className="flex flex-col items-center mb-6">
        <div className="w-16 h-16 bg-blue-600 rounded-full"></div>
        <h2 className="mt-2 font-bold text-xl">Steve</h2>
      </div>
      <nav className="flex flex-col space-y-4">
        <Link to="/dashboard">📊 Dashboard</Link>
        <Link to="/incomes">💰 Incomes</Link>
        <Link to="/expenses">💸 Expenses</Link>
        <Link to="/history">🧾 View History</Link>
        <button 
          className="mt-10 text-left" 
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >🚪 Sign out</button>
      </nav>
    </div>
  );
}
