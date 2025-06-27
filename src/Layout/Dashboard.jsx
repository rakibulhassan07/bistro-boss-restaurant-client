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
import "./Dashboard.css";

const Dashboard = () => {
  const [cart] = useCart();
  const [isAdmin]= useAdmin(); // Replace with actual admin check logic
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        {/* Logo Section */}
        <div className="dashboard-logo">
          <h1 className="logo-title">THE PIZZA</h1>
          <p className="logo-subtitle">GARDEN</p>
        </div>

        {/* Navigation Menu */}
        <nav className="dashboard-nav">
          <ul className="nav-menu">
            {/* User Section */}
             {
               isAdmin ? 
               <>
               <li>
              <NavLink
                to="/dashboard/adminHome"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "nav-link-active" : ""}`
                }
              >
                <Home size={18} className="nav-icon" />
                <span className="nav-text">Admin HOME</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/addItems"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "nav-link-active" : ""}`
                }
              >
                <GiForkKnifeSpoon size={18} className="nav-icon" />
                <span className="nav-text">Add Items</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/manageItems"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "nav-link-active" : ""}`
                }
              >
                <MdOutlineManageSearch size={18} className="nav-icon" />
                <span className="nav-text">Manage Items</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/manageBookings"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "nav-link-active" : ""}`
                }
              >
                <FaBook size={18} className="nav-icon" />
                <span className="nav-text">Manage Bookings</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/allUsers"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "nav-link-active" : ""}`
                }
              >
                <FaUsers size={18} className="nav-icon" />
                <span className="nav-text">All Users</span>
              </NavLink>
            </li>
           
               </>:
               <>
                <li>
              <NavLink
                to="/dashboard/userhome"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "nav-link-active" : ""}`
                }
              >
                <Home size={18} className="nav-icon" />
                <span className="nav-text">USER HOME</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/payment"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "nav-link-active" : ""}`
                }
              >
                <Calendar size={18} className="nav-icon" />
                <span className="nav-text">MAKE PAYMENT</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/payment-history"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "nav-link-active" : ""}`
                }
              >
                <MdOutlinePayments size={18} className="nav-icon" />
                <span className="nav-text">PAYMENT HISTORY</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/cart"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "nav-link-active" : ""}`
                }
              >
                <ShoppingCart size={18} className="nav-icon" />
                <span className="nav-text">MY CART ({cart.length})</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/add-review"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "nav-link-active" : ""}`
                }
              >
                <Star size={18} className="nav-icon" />
                <span className="nav-text">ADD REVIEW</span>
              </NavLink>
            </li>
           
               </>
             }

            {/* Spacer between sections */}
            <li className="nav-separator"></li>

            {/* General Section */}
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "nav-link-active" : ""}`
                }
              >
                <Home size={18} className="nav-icon" />
                <span className="nav-text">HOME</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/menu"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "nav-link-active" : ""}`
                }
              >
                <Menu size={18} className="nav-icon" />
                <span className="nav-text">MENU</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "nav-link-active" : ""}`
                }
              >
                <ShoppingBag size={18} className="nav-icon" />
                <span className="nav-text">SHOP</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "nav-link-active" : ""}`
                }
              >
                <Phone size={18} className="nav-icon" />
                <span className="nav-text">CONTACT</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        <div className="content-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;