import React from 'react';
import { Wallet, Users, ShoppingBag, Truck } from 'lucide-react';

const AdminHome = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Hi, WELCOME BACK!</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">1000</div>
              <div className="text-purple-100">Revenue</div>
            </div>
            <Wallet className="w-8 h-8 text-purple-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">1500</div>
              <div className="text-orange-100">Customers</div>
            </div>
            <Users className="w-8 h-8 text-orange-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">103</div>
              <div className="text-pink-100">Products</div>
            </div>
            <ShoppingBag className="w-8 h-8 text-pink-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">500</div>
              <div className="text-blue-100">Orders</div>
            </div>
            <Truck className="w-8 h-8 text-blue-200" />
          </div>
        </div>
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Dessert</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Pizza</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Salad</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Soup</span>
            </div>
          </div>
          
          <div className="flex items-end justify-center gap-8 h-64">
            {/* Dessert */}
            <div className="flex flex-col items-center">
              <div className="relative w-16 h-48 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-full flex items-end justify-center pb-2">
                <span className="text-white text-sm font-semibold">30</span>
              </div>
              <span className="text-xs text-gray-600 mt-2">Dessert</span>
            </div>
            
            {/* Pizza */}
            <div className="flex flex-col items-center">
              <div className="relative w-16 h-52 bg-gradient-to-t from-orange-500 to-orange-300 rounded-t-full flex items-end justify-center pb-2">
                <span className="text-white text-sm font-semibold">35</span>
              </div>
              <span className="text-xs text-gray-600 mt-2">Pizza</span>
            </div>
            
            {/* Salad */}
            <div className="flex flex-col items-center">
              <div className="relative w-16 h-40 bg-gradient-to-t from-green-500 to-green-300 rounded-t-full flex items-end justify-center pb-2">
                <span className="text-white text-sm font-semibold">20</span>
              </div>
              <span className="text-xs text-gray-600 mt-2">Salad</span>
            </div>
            
            {/* Soup */}
            <div className="flex flex-col items-center">
              <div className="relative w-16 h-36 bg-gradient-to-t from-red-500 to-red-300 rounded-t-full flex items-end justify-center pb-2">
                <span className="text-white text-sm font-semibold">25</span>
              </div>
              <span className="text-xs text-gray-600 mt-2">Soup</span>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <span className="text-blue-600 text-sm">■ Sold</span>
          </div>
        </div>
        
        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Dessert</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Pizza</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Salad</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Soup</span>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Blue section - 31% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#3B82F6"
                  strokeWidth="20"
                  strokeDasharray="77.5 242.5"
                  strokeDashoffset="0"
                />
                {/* Orange section - 21% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#F97316"
                  strokeWidth="20"
                  strokeDasharray="52.5 267.5"
                  strokeDashoffset="-77.5"
                />
                {/* Green section - 27% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#10B981"
                  strokeWidth="20"
                  strokeDasharray="67.5 252.5"
                  strokeDashoffset="-130"
                />
                {/* Yellow section - 21% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#EAB308"
                  strokeWidth="20"
                  strokeDasharray="52.5 267.5"
                  strokeDashoffset="-197.5"
                />
              </svg>
              
              {/* Percentage Labels */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="absolute top-6 left-16 text-white text-xs font-semibold">31%</div>
                  <div className="absolute top-16 right-6 text-white text-xs font-semibold">21%</div>
                  <div className="absolute bottom-6 right-16 text-white text-xs font-semibold">27%</div>
                  <div className="absolute bottom-16 left-6 text-white text-xs font-semibold">21%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;