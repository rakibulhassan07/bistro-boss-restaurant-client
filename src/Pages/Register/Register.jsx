import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaGithub } from 'react-icons/fa';
import img from '../../assets/others/authentication1.png';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Registration logic here
    console.log('Register:', formData);
     setFormData({ name: '', email: '', password: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4" style={{ backgroundImage: 'url(/pattern.svg)' }}>
      <div className="mt-14 bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full flex">
        {/* Left side - Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Sign Up</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Type here"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Type here"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              {/* Sign Up Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                Sign Up
              </button>
            </form>
            {/* Already registered */}
            <p className="text-center mt-4">
              <span className="text-sm text-gray-600">Already registered? </span>
              <Link to="/login" className="text-yellow-700 font-semibold hover:underline">
                Go to log in
              </Link>
            </p>
            {/* Social Login */}
            <div className="mt-8">
              <p className="text-center text-gray-600 mb-4">Or sign up with</p>
              <div className="flex justify-center space-x-4">
                
                <button type="button" className="w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <FcGoogle size={20} />
                </button>
               
              </div>
            </div>
          </div>
        </div>
        {/* Right side - Illustration */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8">
          <div className="relative">
            <img src={img} alt="Sign up illustration" className="max-w-xs w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;