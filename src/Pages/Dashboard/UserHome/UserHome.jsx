import React from 'react';
import { Wallet, Store, Phone, ShoppingCart, Star, Calendar, CreditCard } from 'lucide-react';

const UserHome = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Welcome Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Hi, Welcome Back!
                </h1>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Menu Card */}
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-4xl font-bold mb-1">205</div>
                            <div className="text-purple-100 text-lg">Menu</div>
                        </div>
                        <div className="text-white opacity-80">
                            <Wallet size={32} />
                        </div>
                    </div>
                </div>

                {/* Shop Card */}
                <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-4xl font-bold mb-1">103</div>
                            <div className="text-orange-100 text-lg">Shop</div>
                        </div>
                        <div className="text-white opacity-80">
                            <Store size={32} />
                        </div>
                    </div>
                </div>

                {/* Contact Card */}
                <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-4xl font-bold mb-1">03</div>
                            <div className="text-pink-100 text-lg">Contact</div>
                        </div>
                        <div className="text-white opacity-80">
                            <Phone size={32} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Profile Section */}
                <div className="bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl p-8">
                    <div className="text-center">
                        {/* Profile Picture */}
                        <div className="w-32 h-32 mx-auto mb-6 bg-white rounded-full border-4 border-orange-300 flex items-center justify-center">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                                <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                            </div>
                        </div>
                        
                        {/* Name */}
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            Awlad Hossain
                        </h2>
                    </div>
                </div>

                {/* Activities Section */}
                <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-xl p-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">
                        Your Activities
                    </h3>
                    
                    <div className="space-y-4">
                        {/* Orders */}
                        <div className="flex items-center space-x-3">
                            <ShoppingCart className="text-blue-500" size={20} />
                            <span className="text-blue-500 font-semibold text-lg">
                                Orders: 6
                            </span>
                        </div>

                        {/* Reviews */}
                        <div className="flex items-center space-x-3">
                            <Star className="text-teal-500" size={20} />
                            <span className="text-teal-500 font-semibold text-lg">
                                Reviews: 2
                            </span>
                        </div>

                        {/* Bookings */}
                        <div className="flex items-center space-x-3">
                            <Calendar className="text-orange-500" size={20} />
                            <span className="text-orange-500 font-semibold text-lg">
                                Bookings: 1
                            </span>
                        </div>

                        {/* Payment */}
                        <div className="flex items-center space-x-3">
                            <CreditCard className="text-red-500" size={20} />
                            <span className="text-red-500 font-semibold text-lg">
                                Payment: 3
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserHome;