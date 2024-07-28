import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col space-y-6">
      {/* Dashboard Header */}
      <div className="bg-teal-500 p-6 rounded-lg shadow-lg text-white">
        <h2 className="text-3xl font-bold">Welcome to Your Dashboard</h2>
        <p className="mt-2 text-lg">Here’s a summary of your recent activities and insights.</p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white p-4 rounded-lg shadow-md border border-teal-200">
          <h3 className="text-xl font-semibold text-teal-700">Total Sales</h3>
          <p className="mt-2 text-gray-600">1,234</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-4 rounded-lg shadow-md border border-teal-200">
          <h3 className="text-xl font-semibold text-teal-700">New Users</h3>
          <p className="mt-2 text-gray-600">567</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-4 rounded-lg shadow-md border border-teal-200">
          <h3 className="text-xl font-semibold text-teal-700">Pending Orders</h3>
          <p className="mt-2 text-gray-600">45</p>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-teal-200">
        <h3 className="text-xl font-semibold text-teal-700">Recent Activities</h3>
        <ul className="mt-4 space-y-2">
          <li className="flex items-center justify-between">
            <span className="text-gray-700">Order #1234 shipped</span>
            <span className="text-gray-500 text-sm">2 hours ago</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-gray-700">New user registered</span>
            <span className="text-gray-500 text-sm">1 day ago</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-gray-700">Product review updated</span>
            <span className="text-gray-500 text-sm">3 days ago</span>
          </li>
        </ul>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-teal-100 p-4 rounded-lg shadow-md text-teal-700">
          <h4 className="text-lg font-semibold">View Orders</h4>
          <p className="mt-1">Manage and review your orders.</p>
        </div>

        <div className="bg-teal-100 p-4 rounded-lg shadow-md text-teal-700">
          <h4 className="text-lg font-semibold">User Management</h4>
          <p className="mt-1">Add and manage users.</p>
        </div>

        <div className="bg-teal-100 p-4 rounded-lg shadow-md text-teal-700">
          <h4 className="text-lg font-semibold">Product Listings</h4>
          <p className="mt-1">Add and edit product listings.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
