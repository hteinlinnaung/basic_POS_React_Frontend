import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // or use Next.js <Link> if applicable
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle search logic here
    console.log('Search for:', searchQuery);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <header className="bg-teal-500 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-white">
            <Link to="/">Logo</Link>
          </h1>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex-1 mx-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="w-full py-2 pl-10 pr-4 text-gray-800 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </form>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          <button className="relative text-gray-700 hover:text-gray-900">
            <FaBell className="w-6 h-6 text-teal-400 hover:text-teal-600" />
            <span className="absolute top-0 right-0 flex items-center justify-center w-3 h-3 text-xs font-semibold text-red-100 bg-red-600 rounded-full">3</span>
          </button>
          <button className="text-gray-700 hover:text-gray-900">
            <FaUserCircle className="w-8 h-8 text-teal-400 hover:text-teal-600" />
          </button>
        </div>

        {/* Sidebar Toggle Button for Mobile */}
        <button className="lg:hidden ms-5" onClick={toggleSidebar}>
          <span className="sr-only">Toggle sidebar</span>
          <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
