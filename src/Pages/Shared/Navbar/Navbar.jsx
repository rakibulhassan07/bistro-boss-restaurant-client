import React, { use, useContext } from "react";
import { Link } from "react-router-dom";
import { MdOutlineAccountCircle } from "react-icons/md";
import { AuthContext } from "../../../provider/AuthProvider";
const Navbar = () => {
  const {user,logOut}= useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
    .then(() => {
      // Sign-out successful.
      console.log("User logged out successfully");
    })
    .catch((error) => {
      // An error happened.
      console.error("Error logging out:", error);
    });

  }
  const navItems = (
    <>
      <li><Link to="/" className="font-medium">HOME</Link></li>
      <li><Link to="/contact" className="font-medium">CONTACT US</Link></li>
      <li><Link to="/dashboard" className="font-medium">DASHBOARD</Link></li>
      <li><Link to="/menu" className="font-medium">OUR MENU</Link></li>
      <li><Link to="/order/salad" className="font-medium">ORDER FOOD</Link></li>
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
        
        {
          user ? <><button onClick={handleLogOut} className="flex items-center gap-1">
          <span className="font-medium">LogOut</span>  
        </button></> : <><Link to="/login" className="flex items-center gap-1">
          <span className="font-medium">LogIn</span>  
        </Link></>
        }
        <iframe
            className="w-12 h-12 md:w-16 md:h-16"
            src="https://lottie.host/embed/21c0f04d-247e-460b-921b-f165217a9ef3/Mov0qGZhSD.json"
          ></iframe>
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