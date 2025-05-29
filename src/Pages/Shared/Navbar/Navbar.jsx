import React, { use, useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineAccountCircle, MdShoppingCart } from "react-icons/md";
import { motion } from "framer-motion";
import { AuthContext } from "../../../provider/AuthProvider";
import useCart from "../../../Hook/useCart";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]); // Cart state
  const { user, logOut } = useContext(AuthContext);
  const dropdownRef = useRef(null);
  const [cart]=useCart();

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
      <li><Link to="/" className="font-medium">HOME</Link></li>
      <li><Link to="/contact" className="font-medium">CONTACT US</Link></li>
      <li><Link to="/dashboard" className="font-medium">DASHBOARD</Link></li>
      <li><Link to="/menu" className="font-medium">OUR MENU</Link></li>
      <li><Link to="/order/salad" className="font-medium">ORDER FOOD</Link></li>
      {/* Shopping Cart */}
        <Link to="/dashboard/cart" className="relative">
          <div className="btn btn-ghost btn-circle">
            <MdShoppingCart className="h-6 w-6" />
          </div>
           <div className="badge bg-red-500 relative right-5 bottom-3">+{cart.length}</div>
        </Link>
    </>
  );

  return (
    <div style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}} className="navbar fixed z-10 max-w-screen-xl text-white py-2">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
            className="menu menu-sm dropdown-content bg-black rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        <Link to="/" className="flex flex-col items-start">
          <span className="text-xl font-bold">THE PIZZA</span>
          <span className="text-sm tracking-widest">GARDEN</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {navItems}
        </ul>
      </div>
      <div className="flex items-center gap-4 flex-none">
        

        {user && user?.email ? (
          <div className="relative" ref={dropdownRef}>
            <div 
              className="cursor-pointer"
              onClick={toggleProfileDropdown}
            >
              <img
                src={user?.photoURL}
                alt="User Profile"
                className="w-10 h-10 rounded-full object-cover hover:ring-2 hover:ring-amber-400"
              />
              <p className="text-amber-800">{user.displayName}</p>
            </div>
            
            {/* Profile dropdown menu */}
            {isProfileDropdownOpen && (
              <motion.div 
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <NavLink 
                  to="/MyProfile" 
                  className="block px-4 py-2 text-amber-800 hover:bg-amber-100"
                  onClick={() => setIsProfileDropdownOpen(false)}
                >
                  My Profile
                </NavLink>
                <div className="border-t border-gray-100"></div>
                <button
                  onClick={() => {
                    handleSingOut();
                    setIsProfileDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-amber-800 hover:bg-amber-100"
                >
                  Logout
                </button>
              </motion.div>
            )}
          </div>
        ) : (
          <iframe
            className="w-12 h-12 md:w-16 md:h-16"
            src="https://lottie.host/embed/21c0f04d-247e-460b-921b-f165217a9ef3/Mov0qGZhSD.json"
            referrerPolicy="no-referrer"
          ></iframe>
        )}
        
        {user ? (
          <button onClick={handleSingOut} className="hidden btn bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800 border-0 shadow-md">
            Logout
          </button>
        ) : (
          <Link
            to="/Login"
            className="btn bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800 border-0 shadow-md"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;