import React from "react";
import { NavLink } from "react-router-dom";
import { NavItem } from "../constants/nav-items";
//import { MdDashboard } from "react-icons/md";

const routes: Record<NavItem, string> = {
  "Dashboard": "/",
  "Sales": "/sales",
  "Products": "/products",
  "Customers": "/customers",
  "Reports": "/reports",
  "Orders": "/orders",
  "Teams": "/team",
  "Settings": "/settings",
};

/* const icons: Record<NavItem, React.ElementType> = {
  Dashboard: MdDashboard,
  Sales: MdDashboard,
  Products: MdDashboard,
  Customers: MdDashboard,
  Reports: MdDashboard,
  Orders: MdDashboard,
  Teams: MdDashboard,
  Settings: MdDashboard,
};
 */
interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <div className={`flex flex-col h-full bg-teal-800 text-white transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-'} `}>
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
      {/* <div className="flex-shrink-0 p-4 bg-teal-900">
        <NavLink
          to="/settings"
          className="block mt-4 px-4 py-2 text-sm rounded-md bg-teal-700 hover:bg-teal-600"
        >
          <span className="text-gray-300">Settings</span>
        </NavLink>
      </div> */}
    </div>
  );
};

export default Sidebar;
