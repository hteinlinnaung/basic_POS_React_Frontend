import React, { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet
import Sidebar from './Sidebar';
import Header from './Header';

const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarTimeout, setSidebarTimeout] = useState<NodeJS.Timeout | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
    if (sidebarTimeout) {
      clearTimeout(sidebarTimeout);
    }
    if (!sidebarOpen) {
      setSidebarTimeout(setTimeout(() => {
        setSidebarOpen(false);
      }, 5000));
    }
  };

  const handleMouseEnter = () => {
    if (sidebarTimeout) {
      clearTimeout(sidebarTimeout);
    }
    setSidebarOpen(true);
  };

  const handleMouseLeave = () => {
    if (sidebarOpen) {
      setSidebarTimeout(setTimeout(() => {
        setSidebarOpen(false);
      }, 1000));
    }
  };

  useEffect(() => {
    return () => {
      if (sidebarTimeout) {
        clearTimeout(sidebarTimeout);
      }
    };
  }, [sidebarTimeout]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-0 flex z-40 ${
          sidebarOpen ? 'block' : 'hidden'
        } lg:block lg:static lg:inset-auto md:w-64`}
      >
        <Sidebar
          isOpen={sidebarOpen}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={handleSidebarToggle} />

        <main className="flex-1 overflow-y-auto">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet /> {/* Render the child routes here */}
            </div>
          </div>
        </main>

        <footer className="w-full">
          <div className="py-4 bg-teal-900 shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <p className="text-center text-white text-sm">
                © 2024 Your Company. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
