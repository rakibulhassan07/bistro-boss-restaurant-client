import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';

const Payment = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvc, setCvc] = useState('');

    const handleCardNumberChange = (e) => {
        // Remove all non-digit characters
        const value = e.target.value.replace(/\D/g, '');
        // Add spaces every 4 digits
        const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        // Limit to 19 characters (16 digits + 3 spaces)
        setCardNumber(formattedValue.slice(0, 19));
    };

    const handleExpiryChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            setExpiryDate(value.slice(0, 2) + '/' + value.slice(2, 4));
        } else {
            setExpiryDate(value);
        }
    };

    const handleCvcChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setCvc(value.slice(0, 3));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle payment submission here
        console.log('Payment submitted:', { cardNumber, expiryDate, cvc });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 shadow-sm">
                    {/* Header */}
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-8 tracking-wide">
                        PAYMENT
                    </h2>

                    {/* Card Number Field */}
                    <div className="mb-6">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <CreditCard className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                                placeholder="Card number"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                                maxLength="19"
                            />
                        </div>
                    </div>

                    {/* Expiry and CVC Row */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        {/* Expiry Date */}
                        <div>
                            <input
                                type="text"
                                value={expiryDate}
                                onChange={handleExpiryChange}
                                placeholder="MM/YY"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                                maxLength="5"
                            />
                        </div>

                        {/* CVC */}
                        <div>
                            <input
                                type="text"
                                value={cvc}
                                onChange={handleCvcChange}
                                placeholder="CVC"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                                maxLength="3"
                            />
                        </div>
                    </div>

                    {/* Pay Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Pay
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Payment;