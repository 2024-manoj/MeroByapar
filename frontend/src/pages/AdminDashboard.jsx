import Sidebar from "../components/Sidebar";
import React from "react";

const AdminDashboard = () => {
  return (

    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-gray-500">Total Products</h2>
          <p className="text-3xl font-bold text-blue-600">120</p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-gray-500">Total Sales</h2>
          <p className="text-3xl font-bold text-green-600">Rs 45,000</p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-gray-500">Total Purchases</h2>
          <p className="text-3xl font-bold text-purple-600">Rs 30,000</p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-gray-500">Suppliers</h2>
          <p className="text-3xl font-bold text-orange-500">8</p>
        </div>

      </div>

      {/* Recent Activity */}
      <div className="mt-10 bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Sales</h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2">Product</th>
              <th className="p-2">Qty</th>
              <th className="p-2">Price</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="p-2">Laptop</td>
              <td className="p-2">1</td>
              <td className="p-2">Rs 80,000</td>
              <td className="p-2">2026-03-10</td>
            </tr>

            <tr className="border-b">
              <td className="p-2">Mouse</td>
              <td className="p-2">3</td>
              <td className="p-2">Rs 1,500</td>
              <td className="p-2">2026-03-09</td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;