import React from 'react';
import { ChefHat } from 'lucide-react';

const AddItems = () => {
    return (
        <div className="min-h-screen bg-white p-6">
            {/* Header */}
            <div className="text-center mb-8">
                <p className="text-orange-400 text-sm mb-2">---What's new?---</p>
                <h1 className="text-3xl font-bold text-gray-800">ADD AN ITEM</h1>
            </div>

            {/* Form Container */}
            <div className="max-w-2xl mx-auto">
                <div className="bg-[#F3F3F3] rounded-lg shadow-sm p-8">
                    <div className="space-y-6">
                        {/* Recipe Name */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Recipe name*
                            </label>
                            <input
                                type="text"
                                placeholder="Recipe name"
                                className="bg-white w-full px-4 py-3 border border-[#F3F3F3] rounded-md focus:outline-none focus:ring-2 focus:ring-amber-50 focus:border-transparent"
                            />
                        </div>

                        {/* Category and Price Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Category */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Category*
                                </label>
                                <select className=" w-full px-4 py-3 border border-[#F3F3F3] rounded-md focus:outline-none focus:ring-2 focus:ring-amber-50 focus:border-transparent appearance-none bg-white">
                                    <option value="">Category</option>
                                </select>
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Price*
                                </label>
                                <input
                                    type="number"
                                    placeholder="Price"
                                    step="1"
                                    min="0"
                                    className="bg-white w-full px-4 py-3 border border-[#F3F3F3] rounded-md focus:outline-none focus:ring-2 focus:ring-amber-50 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Recipe Details */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Recipe Details*
                            </label>
                            <textarea
                                placeholder="Recipe Details"
                                rows="6"
                                className="bg-white w-full px-4 py-3 border border-[#F3F3F3] rounded-md focus:outline-none focus:ring-2 focus:ring-amber-50 focus:border-transparent resize-vertical"
                            />
                        </div>

                        {/* File Upload */}
                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                className="w-full px-4 py-3 border border-[#F3F3F3] rounded-md focus:outline-none focus:ring-2 focus:ring-amber-50 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button className="bg-orange-400 hover:bg-orange-500 text-white font-medium px-6 py-3 rounded-md transition-colors flex items-center gap-2">
                                <ChefHat size={18} />
                                Add Item
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddItems;