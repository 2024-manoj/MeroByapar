import React from 'react';

function StatCard({ title, value, color, icon }) {
  return (
    <div className={`p-6 rounded-xl ${color} shadow-lg transition hover:shadow-xl`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">{title}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
        </div>
        <div className="text-3xl text-gray-700 dark:text-gray-200">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StatCard;