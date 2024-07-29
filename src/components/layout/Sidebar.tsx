import React from "react";
import { NavLink } from "react-router-dom";
import { NavItem } from "../constants/nav-items";

const routes: Record<NavItem, string> = {
  "Dashboard": "/",
  "Sales": "/sales",
  "Products": "/products",
  "Customers": "/customers",
  "Orders": "/orders",
  "Reports": "/reports",
  "Payments": "/payments",
  "Teams": "/team",
  "Settings": "/settings",
};

interface SidebarProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onMouseEnter, onMouseLeave }) => {
  return (
    <div
      className={`flex flex-col h-full bg-teal-800 text-white transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-'} lg:translate-x-0 lg:static lg:w-64`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex items-center justify-center h-16 bg-teal-900">
        <h1 className="text-2xl font-bold">Logo</h1>
      </div>
      <nav className="flex-grow px-4 mt-9 space-y-2 ">
        {Object.entries(routes).map(([name, path]) => (
          <NavLink
            key={name}
            to={path}
            style={{ marginTop: 15 }}
            className="block px-4 py-2 rounded-md bg-teal-700 hover:bg-teal-600"
          >
            <span className="text-gray-300">{name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
