import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineAccountCircle } from "react-icons/md";
const Navbar = () => {
  const navItems = (
    <>
      <li><Link to="/" className="font-medium">HOME</Link></li>
      <li><Link to="/contact" className="font-medium">CONTACT US</Link></li>
      <li><Link to="/dashboard" className="font-medium">DASHBOARD</Link></li>
      <li><Link to="/menu" className="font-medium">OUR MENU</Link></li>
      <li><Link to="/shop" className="font-medium">OUR SHOP</Link></li>
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
      <div className="navbar-end">
        <Link to="/sign-out" className="flex items-center gap-1">
          <span className="font-medium">SIGN OUT</span>
          <div className="avatar">
            <div className="w-8 rounded-full ring ring-white">
              <img src={MdOutlineAccountCircle} alt="User" />
            </div>
          </div>
        </Link>
        <div className="indicator ml-2">
          <span className="indicator-item badge badge-secondary bg-red-600 border-none">2</span> 
          <button className="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;