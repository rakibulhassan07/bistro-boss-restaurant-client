import React, { useState } from 'react';
import { Check } from 'lucide-react';

const ManageBookings = () => {
    // This would typically come from props or API call
    const [bookings, setBookings] = useState([]);
    const [totalItems, setTotalItems] = useState(0);

    const handleApproveBooking = (bookingId) => {
        // Approve booking logic would go here
        setBookings(bookings.map(booking => 
            booking.id === bookingId 
                ? { ...booking, status: 'approved' }
                : booking
        ));
    };

    const getStatusColor = (status) => {
        switch(status?.toLowerCase()) {
            case 'pending':
                return 'text-orange-500';
            case 'approved':
                return 'text-green-500';
            case 'rejected':
                return 'text-red-500';
            default:
                return 'text-gray-500';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header with subtitle */}
            <div className="text-center mb-8">
                <p className="text-orange-400 text-sm mb-2">---At a Glance!---</p>
                <h1 className="text-3xl font-bold text-gray-800">MANAGE ALL BOOKINGS</h1>
            </div>

            {/* Total Items Counter */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 max-w-6xl mx-auto">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    TOTAL ITEMS: {totalItems}
                </h2>

                {/* Table Header */}
                <div className="bg-orange-300 rounded-t-lg">
                    <div className="grid grid-cols-6 gap-4 p-4 text-white font-semibold text-center">
                        <div>USER EMAIL</div>
                        <div>PHONE NUMBER</div>
                        <div>BOOKING DATE</div>
                        <div>BOOKING TIME</div>
                        <div>ACTIVITY</div>
                        <div>ACTION</div>
                    </div>
                </div>

                {/* Table Body */}
                <div className="bg-white border-l border-r border-b rounded-b-lg">
                    {bookings.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            No bookings found. Data will be populated from your backend.
                        </div>
                    ) : (
                        bookings.map((booking) => (
                            <div key={booking.id} className="grid grid-cols-6 gap-4 p-4 border-b border-gray-100 items-center">
                                <div className="text-center text-gray-600">{booking.userEmail}</div>
                                <div className="text-center text-gray-600">{booking.phoneNumber}</div>
                                <div className="text-center text-gray-600">{booking.bookingDate}</div>
                                <div className="text-center text-gray-600">{booking.bookingTime}</div>
                                <div className="text-center">
                                    <span className={`font-medium ${getStatusColor(booking.activity)}`}>
                                        {booking.activity}
                                    </span>
                                </div>
                                <div className="flex justify-center">
                                    {booking.status === 'pending' ? (
                                        <button
                                            onClick={() => handleApproveBooking(booking.id)}
                                            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors"
                                            title="Approve Booking"
                                        >
                                            <Check size={16} />
                                        </button>
                                    ) : (
                                        <div className="bg-green-500 text-white p-2 rounded-full">
                                            <Check size={16} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageBookings;