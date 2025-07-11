import React from "react";

export default function Dashboard() {
  return (
    <div className="ml-64 p-6">
      <h1 className="text-2xl font-bold mb-4">All Transaction</h1>
      <div className="bg-gray-300 h-64 mb-4 flex justify-center items-center">
        Graph (chart.js or three.js)
      </div>
      <h2 className="text-xl mb-2">Recent History</h2>
      <div className="space-y-2">
        <div className="bg-gray-200 p-2 flex justify-between">
          <span>Rent</span><span className="text-red-500">-$400</span>
        </div>
        <div className="bg-gray-200 p-2 flex justify-between">
          <span>Bitcoin</span><span className="text-green-500">+$2500</span>
        </div>
      </div>
      <div className="bg-gray-300 mt-6 p-6 text-center">Some calculations...</div>
    </div>
  );
}
