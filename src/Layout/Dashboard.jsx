import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Home,
  Calendar,
  ShoppingCart,
  Star,
  Menu,
  ShoppingBag,
  Phone,
} from "lucide-react";
import { FaBook,FaUsers } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";
import useCart from "../Hook/useCart";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { MdOutlineManageSearch } from "react-icons/md";
import useAdmin from "../Hook/useAdmin";
const Dashboard = () => {
  const [cart] = useCart();
  const [isAdmin]= useAdmin(); // Replace with actual admin check logic
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 min-h-screen bg-gradient-to-b from-yellow-600 to-yellow-700 text-white">
        {/* Logo Section */}
        <div className="p-6 border-b border-yellow-500">
          <h1 className="text-lg font-bold">THE PIZZA</h1>
          <p className="text-sm opacity-90">GARDEN</p>
        </div>

        {/* Navigation Menu */}
        <nav className="py-4">
          <ul className="menu">
            {/* User Section */}
             {
               isAdmin ? 
               <>
               <li>
              <NavLink
                to="/dashboard/adminHome"
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 text-sm hover:bg-yellow-600 transition-colors ${
                    isActive ? "bg-yellow-600 border-r-2 border-white" : ""
                  }`
                }
              >
                <Home size={18} className="mr-3 flex-shrink-0" />
                <span className="truncate">Admin HOME</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/addItems"
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 text-sm hover:bg-yellow-600 transition-colors ${
                    isActive ? "bg-yellow-600 border-r-2 border-white" : ""
                  }`
                }
              >
                <GiForkKnifeSpoon size={18} className="mr-3 flex-shrink-0" />
                <span className="truncate">Add Items</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/manageItems"
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 text-sm hover:bg-yellow-600 transition-colors ${
                    isActive ? "bg-yellow-600 border-r-2 border-white" : ""
                  }`
                }
              >
                <MdOutlineManageSearch size={18} className="mr-3 flex-shrink-0" />
                <span className="truncate">Manage Items</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/manageBookings"
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 text-sm hover:bg-yellow-600 transition-colors ${
                    isActive ? "bg-yellow-600 border-r-2 border-white" : ""
                  }`
                }
              >
                <FaBook size={18} className="mr-3 flex-shrink-0" />
                <span className="truncate">Manage Bookings</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/allUsers"
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 text-sm hover:bg-yellow-600 transition-colors ${
                    isActive ? "bg-yellow-600 border-r-2 border-white" : ""
                  }`
                }
              >
                <FaUsers  size={18} className="mr-3 flex-shrink-0" />
                <span className="truncate">All Users</span>
              </NavLink>
            </li>
           
               </>:
               <>
                <li>
              <NavLink
                to="/dashboard/userhome"
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
                to="/dashboard/payment"
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 text-sm hover:bg-yellow-600 transition-colors ${
                    isActive ? "bg-yellow-600 border-r-2 border-white" : ""
                  }`
                }
              >
                <Calendar size={18} className="mr-3 flex-shrink-0" />
                <span className="truncate">MAKE PAYMENT</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/payment-history"
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
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 text-sm hover:bg-yellow-600 transition-colors ${
                    isActive ? "bg-yellow-600 border-r-2 border-white" : ""
                  }`
                }
              >
                <ShoppingCart size={18} className="mr-3 flex-shrink-0" />
                <span className="truncate">MY CART ({cart.length})</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/add-review"
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
           
               </>
             }

            {/* Spacer between sections */}
            <li className="my-4"></li>

            {/* General Section */}
            <li>
              <NavLink
                to="/"
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
      <div className="flex-1">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;