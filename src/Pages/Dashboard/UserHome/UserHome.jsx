import React, { useContext, useEffect, useState } from 'react';
import { ShoppingCart, Star, Calendar, CreditCard, User } from 'lucide-react';
import { AuthContext } from '../../../provider/AuthProvider';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import useCart from '../../../Hook/useCart';

const UserHome = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [cart] = useCart();
    
    // State for user statistics
    const [userStats, setUserStats] = useState({
        totalOrders: 0,
        totalPayments: 0,
        totalReviews: 0,
        totalBookings: 0
    });
    const [loading, setLoading] = useState(true);

    // Fetch user-specific data
    useEffect(() => {
        const fetchUserStats = async () => {
            if (!user?.email) return;
            
            try {
                setLoading(true);
                
                // Fetch user's payments (completed orders)
                const paymentsResponse = await axiosSecure.get(`/payments/${user.email}`);
                const totalPayments = paymentsResponse.data.length;
                
                // Calculate total orders from payments
                const totalOrders = paymentsResponse.data.reduce((total, payment) => {
                    return total + (payment.menuIds ? payment.menuIds.length : 0);
                }, 0);
                
                // Fetch user's reviews
                const reviewsResponse = await axiosSecure.get(`/reviews?email=${user.email}`);
                const totalReviews = reviewsResponse.data.length;
                
                // For now, set bookings to 0 (you can implement this when you have bookings API)
                const totalBookings = 0;
                
                setUserStats({
                    totalOrders,
                    totalPayments,
                    totalReviews,
                    totalBookings
                });
                
            } catch (error) {
                console.error('Error fetching user stats:', error);
                // Keep default values on error
            } finally {
                setLoading(false);
            }
        };

        fetchUserStats();
    }, [user?.email, axiosSecure]);
    
    return (
        <div className="min-h-screen p-6" style={{ backgroundColor: '#041224' }}>
            {/* Welcome Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">
                    Hi, Welcome Back!
                </h1>
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Profile Section */}
                <div className="rounded-xl p-8" style={{ backgroundColor: '#251212', border: '1px solid #475569' }}>
                    <div className="text-center">
                        {/* Profile Picture */}
                        <div className="w-32 h-32 mx-auto mb-6 bg-white rounded-full border-4 flex items-center justify-center overflow-hidden" style={{ borderColor: '#e91710' }}>
                            {user?.photoURL ? (
                                <img
                                    src={user.photoURL}
                                    alt="User Profile"
                                    className="w-full h-full object-cover rounded-full"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextElementSibling.style.display = 'flex';
                                    }}
                                />
                            ) : null}
                            {/* Fallback avatar when no photo URL */}
                            <div 
                                className={`w-full h-full rounded-full flex items-center justify-center ${user?.photoURL ? 'hidden' : 'flex'}`}
                                style={{ 
                                    display: user?.photoURL ? 'none' : 'flex',
                                    background: 'linear-gradient(135deg, #e91710 0%, #a10909 100%)'
                                }}
                            >
                                <User className="w-16 h-16 text-white" />
                            </div>
                        </div>
                        
                        {/* Name */}
                        <h2 className="text-2xl font-bold mb-2 text-white">
                            {(user?.displayName || user?.email?.split('@')[0] || 'User').toUpperCase()}
                        </h2>
                        {user?.email && (
                            <p className="text-sm" style={{ color: '#94a3b8' }}>
                                {user.email}
                            </p>
                        )}
                    </div>
                </div>

                {/* Activities Section */}
                <div className="rounded-xl p-8" style={{ backgroundColor: '#251212', border: '1px solid #475569' }}>
                    <h3 className="text-2xl font-bold mb-6 text-white">
                        Your Activities
                    </h3>
                    
                    <div className="space-y-4">
                        {/* Orders */}
                        <div className="flex items-center space-x-3 p-3 rounded-lg transition-colors hover:bg-white hover:bg-opacity-10">
                            <ShoppingCart className="text-white" size={20} style={{ color: '#e91710' }} />
                            <span className="font-semibold text-lg text-white">
                                Orders: {cart.length}
                            </span>
                        </div>

                        {/* Reviews */}
                        <div className="flex items-center space-x-3 p-3 rounded-lg transition-colors hover:bg-white hover:bg-opacity-10">
                            <Star className="text-white" size={20} style={{ color: '#e91710' }} />
                            <span className="font-semibold text-lg text-white">
                                Reviews: {loading ? '...' : userStats.totalReviews}
                            </span>
                        </div>

                        {/* Payments */}
                        <div className="flex items-center space-x-3 p-3 rounded-lg transition-colors hover:bg-white hover:bg-opacity-10">
                            <CreditCard className="text-white" size={20} style={{ color: '#e91710' }} />
                            <span className="font-semibold text-lg text-white">
                                Payments: {loading ? '...' : userStats.totalPayments}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserHome;
