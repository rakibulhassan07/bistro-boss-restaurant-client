import React, { use, useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineAccountCircle, MdShoppingCart, MdHome, MdContactPage, MdDashboard, MdRestaurantMenu, MdFastfood } from "react-icons/md";
import { FaUtensils, FaConciergeBell, FaUserTie } from "react-icons/fa";
import { motion } from "framer-motion";
import { AuthContext } from "../../../provider/AuthProvider";
import useCart from "../../../Hook/useCart";
import useAdmin from "../../../Hook/useAdmin";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]); // Cart state
  const { user, logOut } = useContext(AuthContext);
  const dropdownRef = useRef(null);
  const [cart]=useCart();
  const [isAdmin, isAdminLoading]=useAdmin();
  
  console.log('User:', user?.email);
  console.log('Is Admin:', isAdmin);
  console.log('Admin Loading:', isAdminLoading);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleSingOut = () => {
    logOut();
  };

  // Get cart item count
  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('pizzaCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('pizzaCart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Active link style
  const activeStyle = "bg-amber-100 text-amber-800 font-semibold";
  const navItems = (
    <>
      <li>
        <Link to="/" className="font-medium hover:text-amber-300 transition-colors duration-200 flex items-center gap-2">
          <MdHome className="w-5 h-5" />
          HOME
        </Link>
      </li>
      <li>
        <Link to="/contact" className="font-medium hover:text-amber-300 transition-colors duration-200 flex items-center gap-2">
          <MdContactPage className="w-5 h-5" />
          CONTACT US
        </Link>
      </li>
      {
        user && !isAdminLoading && isAdmin && 
        <li>
          <Link to="/dashboard/adminHome" className="font-medium hover:text-amber-300 transition-colors duration-200 flex items-center gap-2">
            <MdDashboard className="w-5 h-5" />
            DASHBOARD
          </Link>
        </li>
      }
      {
        user && !isAdminLoading && !isAdmin && 
        <li>
          <Link to="/dashboard/userHome" className="font-medium hover:text-amber-300 transition-colors duration-200 flex items-center gap-2">
            <MdDashboard className="w-5 h-5" />
            DASHBOARD
          </Link>
        </li>
      }
      <li>
        <Link to="/menu" className="font-medium hover:text-amber-300 transition-colors duration-200 flex items-center gap-2">
          <MdRestaurantMenu className="w-5 h-5" />
          OUR MENU
        </Link>
      </li>
      <li>
        <Link to="/order/salad" className="font-medium hover:text-amber-300 transition-colors duration-200 flex items-center gap-2">
          <MdFastfood className="w-5 h-5" />
          ORDER FOOD
        </Link>
      </li>
      {/* Shopping Cart - only show for customers, not admins */}
      {user && !isAdminLoading && !isAdmin && (
        <li>
          <Link to="/dashboard/cart" className="relative hover:text-amber-300 transition-colors duration-200">
            <div className="btn btn-ghost btn-circle hover:bg-amber-600/20">
              <MdShoppingCart className="h-6 w-6" />
            </div>
            <div className="badge bg-amber-500 text-white relative right-5 bottom-3 animate-pulse">
              {cart.length}
            </div>
          </Link>
        </li>
      )}
    </>
  );

  return (
    <div style={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}} className="navbar fixed z-10 max-w-screen-xl text-white py-3 backdrop-blur-md border-b border-amber-500/30 shadow-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden hover:bg-amber-600/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-black/90 backdrop-blur-md rounded-lg z-10 mt-3 w-56 p-3 shadow-xl border border-amber-500/20"
          >
            {navItems}
          </ul>
        </div>
        
        {/* Professional Restaurant Logo */}
        <Link to="/" className="flex items-center gap-3 hover:scale-105 transition-transform duration-300">
          <div className="relative">
            {/* Elegant Logo Background - responsive size based on user role */}
            <div className={`${user && !isAdmin ? 'w-10 h-10' : 'w-14 h-14'} bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-xl border-2 border-amber-300/40 transition-all duration-300`}>
              <FaConciergeBell className={`${user && !isAdmin ? 'w-5 h-5' : 'w-7 h-7'} text-white`} />
            </div>
            {/* Premium accent */}
            <div className={`absolute -top-1 -right-1 ${user && !isAdmin ? 'w-3 h-3' : 'w-4 h-4'} bg-gradient-to-r from-yellow-300 to-amber-400 rounded-full shadow-md`}>
              <FaUtensils className={`${user && !isAdmin ? 'w-1.5 h-1.5' : 'w-2 h-2'} text-amber-800 absolute top-1 left-1`} />
            </div>
          </div>
          
          {/* Restaurant Name - responsive text size */}
          <div className="flex flex-col items-start">
            <span className={`${user && !isAdmin ? 'text-lg' : 'text-2xl'} font-bold bg-gradient-to-r from-amber-200 via-yellow-200 to-amber-100 bg-clip-text text-transparent tracking-wide transition-all duration-300`}>
              BISTRO BOSS
            </span>
            <span className={`${user && !isAdmin ? 'text-[10px]' : 'text-xs'} tracking-[0.25em] text-amber-300 font-light uppercase`}>
              Premium Restaurant
            </span>
          </div>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-6">
          {navItems}
        </ul>
      </div>
      
      <div className="navbar-end flex items-center gap-4">
        {user && user?.email ? (
          <div className="relative" ref={dropdownRef}>
            <div 
              className="cursor-pointer flex items-center gap-3 hover:bg-amber-600/20 p-2 rounded-xl transition-all duration-300 border border-transparent hover:border-amber-400/30"
              onClick={toggleProfileDropdown}
            >
              {/* Professional Profile Picture */}
              <div className="relative">
                <img
                  src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || user?.email || 'User')}&background=F59E0B&color=fff&size=48&font-size=0.6&bold=true`}
                  alt="User Profile"
                  className="w-12 h-12 rounded-full object-cover shadow-lg border-2 border-amber-400/50 hover:border-amber-400 transition-all duration-300"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || user?.email || 'User')}&background=F59E0B&color=fff&size=48&font-size=0.6&bold=true`;
                  }}
                />
                {/* Status indicator */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
              </div>
              
              {/* User Info */}
              <div className="hidden md:block text-left">
                <p className="text-amber-100 text-sm font-semibold flex items-center gap-1">
                  {isAdmin && <FaUserTie className="w-3 h-3" />}
                  {(user?.displayName || user?.email?.split('@')[0] || "USER").toUpperCase()}
                </p>
                <p className="text-amber-400 text-xs font-medium">
                  {isAdmin ? 'Administrator' : 'Customer'}
                </p>
              </div>
            </div>
            
            {/* Enhanced Profile dropdown menu */}
            {isProfileDropdownOpen && (
              <motion.div 
                className="absolute right-0 mt-2 w-52 bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl py-3 z-10 border border-amber-200/50"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="px-4 py-2 border-b border-gray-200/50">
                  <p className="text-gray-800 font-semibold text-sm">
                    {(user?.displayName || user?.email?.split('@')[0] || "USER").toUpperCase()}
                  </p>
                  <p className="text-gray-500 text-xs">{user?.email}</p>
                </div>
                
                <NavLink 
                  to="/MyProfile" 
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-amber-50 transition-colors duration-200"
                  onClick={() => setIsProfileDropdownOpen(false)}
                >
                  <MdOutlineAccountCircle className="w-5 h-5 text-amber-600" />
                  <span className="font-medium">My Profile</span>
                </NavLink>
                
                <div className="border-t border-gray-200/50 my-1"></div>
                
                <button
                  onClick={() => {
                    handleSingOut();
                    setIsProfileDropdownOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-red-50 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                  <span className="font-medium">Logout</span>
                </button>
              </motion.div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <iframe
              className="w-10 h-10 md:w-12 md:h-12 rounded-full opacity-80 shadow-md"
              src="https://lottie.host/embed/21c0f04d-247e-460b-921b-f165217a9ef3/Mov0qGZhSD.json"
              referrerPolicy="no-referrer"
            ></iframe>
          </div>
        )}
        
        {user ? (
          <button 
            onClick={handleSingOut} 
            className="hidden btn bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800 border-0 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/Login"
            className="btn bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800 border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-6"
          >
            <FaUserTie className="w-4 h-4 mr-2" />
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;