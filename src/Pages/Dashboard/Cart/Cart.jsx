import React from 'react';
import { Trash2 } from 'lucide-react';
import useCart from '../../../Hook/useCart';

const Cart = () => {
    // Sample cart data - replace with your actual cart data
    const [cart]=useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0).toFixed(2);

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="text-center mb-4 md:mb-6">
                <span className="text-yellow-600 font-medium text-sm md:text-base">---My Cart---</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6 md:mb-8">
                WANNA ADD MORE?
            </h1>

            <div className="bg-white rounded-lg shadow-sm max-w-6xl mx-auto">
                {/* Summary Section */}
                <div className="bg-white px-4 md:px-6 py-4 md:py-6 border-b">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
                        <div className="text-lg md:text-xl font-bold text-gray-800 text-center sm:text-left">
                            TOTAL ORDERS:{cart.length}
                        </div>
                        <div className="text-lg md:text-xl font-bold text-gray-800 text-center sm:text-left">
                            TOTAL PRICE: ${totalPrice}
                        </div>
                        <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 md:px-8 py-2 rounded font-bold transition-colors w-full sm:w-auto">
                            PAY
                        </button>
                    </div>
                </div>

                {/* Desktop Table Header - Hidden on mobile */}
                <div className="hidden md:block bg-yellow-600 text-white px-6 py-4">
                    <div className="grid grid-cols-12 gap-4 items-center font-bold">
                        <div className="col-span-2 text-center">ITEM IMAGE</div>
                        <div className="col-span-4 text-center">ITEM NAME</div>
                        <div className="col-span-3 text-center">PRICE</div>
                        <div className="col-span-3 text-center">ACTION</div>
                    </div>
                </div>

                {/* Cart Items */}
                <div className="divide-y divide-gray-200">
                 {cart.length > 0 ? (
                        cart.map((item, index) => (
                            <div key={item._id} className="px-4 md:px-6 py-4">
                                {/* Desktop Layout */}
                                <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                                    {/* Item Number */}
                                    <div className="col-span-1 text-center font-bold text-gray-800">
                                        {index + 1}
                                    </div>
                                    
                                    {/* Item Image */}
                                    <div className="col-span-1">
                                        <div className="w-12 h-12 mask mask-squircle">
                                            <img className='rounded' src={item.image} alt="" />
                                        </div>

                                    </div>
                                    
                                    {/* Item Name */}
                                    <div className="col-span-4 text-center font-medium text-gray-700">
                                        {item.name}
                                    </div>
                                    
                                    {/* Price */}
                                    <div className="col-span-3 text-center font-bold text-gray-800">
                                        ${item.price}
                                    </div>
                                    
                                    {/* Action */}
                                    <div className="col-span-3 text-center">
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded transition-colors inline-flex items-center justify-center"
                                            title="Remove item"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>  
                            </div>
                        ))
                    ) : (
                        <div className="px-4 md:px-6 py-8 md:py-12 text-center text-gray-500">
                            <p className="text-base md:text-lg">Your cart is empty</p>
                            <p className="text-sm">Add some delicious items to get started!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;