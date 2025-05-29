import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Home,
  Calendar,
  ShoppingCart,
  Star,
  Menu,
  ShoppingBag,
  Phone,
  X,
  AlignLeft,
} from "lucide-react";
import { MdOutlinePayments } from "react-icons/md";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex relative">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 lg:hidden bg-yellow-600 text-white p-2 rounded-md shadow-lg"
      >
        {isSidebarOpen ? <X size={24} /> : <AlignLeft size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-50 
          w-64 min-h-screen bg-gradient-to-b from-yellow-600 to-yellow-700 text-white
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-yellow-500">
          <h1 className="text-lg font-bold">BISTRO BOSS</h1>
          <p className="text-sm opacity-90">RESTAURANT</p>
        </div>

        {/* Navigation Menu */}
        <nav className="py-4">
          <ul className="menu">
            {/* User Section */}
            <li>
              <NavLink
                to="/dashboard/userhome"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 text-sm hover:bg-yellow-600 transition-colors ${
                    isActive ? "bg-yellow-600 border-r-2 border-white" : ""
                  }`
                }
              >
                <Home size={18} className="mr-3 flex-shrink-0" />
                <span className="truncate">USER HOME</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/reservation"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 text-sm hover:bg-yellow-600 transition-colors ${
                    isActive ? "bg-yellow-600 border-r-2 border-white" : ""
                  }`
                }
              >
                <Calendar size={18} className="mr-3 flex-shrink-0" />
                <span className="truncate">RESERVATION</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/payment-history"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 text-sm hover:bg-yellow-600 transition-colors ${
                    isActive ? "bg-yellow-600 border-r-2 border-white" : ""
                  }`
                }
              >
                <MdOutlinePayments size={18} className="mr-3 flex-shrink-0" />
                <span className="truncate">PAYMENT HISTORY</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/cart"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 text-sm hover:bg-yellow-600 transition-colors ${
                    isActive ? "bg-yellow-600 border-r-2 border-white" : ""
                  }`
                }
              >
                <ShoppingCart size={18} className="mr-3 flex-shrink-0" />
                <span className="truncate">MY CART</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/add-review"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 text-sm hover:bg-yellow-600 transition-colors ${
                    isActive ? "bg-yellow-600 border-r-2 border-white" : ""
                  }`
                }
              >
                <Star size={18} className="mr-3 flex-shrink-0" />
                <span className="truncate">ADD REVIEW</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/my-booking"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 text-sm hover:bg-yellow-600 transition-colors ${
                    isActive ? "bg-yellow-600 border-r-2 border-white" : ""
                  }`
                }
              >
                <Calendar size={18} className="mr-3 flex-shrink-0" />
                <span className="truncate">MY BOOKING</span>
              </NavLink>
            </li>

            {/* Spacer between sections */}
            <li className="my-4"></li>

            {/* General Section */}
            <li>
              <NavLink
                to="/"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 text-sm hover:bg-yellow-600 transition-colors ${
                    isActive ? "bg-yellow-600 border-r-2 border-white" : ""
                  }`
                }
              >
                <Home size={18} className="mr-3 flex-shrink-0" />
                <span className="truncate">HOME</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/menu"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 text-sm hover:bg-yellow-600 transition-colors ${
                    isActive ? "bg-yellow-600 border-r-2 border-white" : ""
                  }`
                }
              >
                <Menu size={18} className="mr-3 flex-shrink-0" />
                <span className="truncate">MENU</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 text-sm hover:bg-yellow-600 transition-colors ${
                    isActive ? "bg-yellow-600 border-r-2 border-white" : ""
                  }`
                }
              >
                <ShoppingBag size={18} className="mr-3 flex-shrink-0" />
                <span className="truncate">SHOP</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 text-sm hover:bg-yellow-600 transition-colors ${
                    isActive ? "bg-yellow-600 border-r-2 border-white" : ""
                  }`
                }
              >
                <Phone size={18} className="mr-3 flex-shrink-0" />
                <span className="truncate">CONTACT</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Content wrapper with proper spacing for mobile menu button */}
        <div className="pt-16 lg:pt-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;