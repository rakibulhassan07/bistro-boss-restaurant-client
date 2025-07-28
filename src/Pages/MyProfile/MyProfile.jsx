import React, { useContext, useState, useEffect } from 'react';
import { User, Mail, Calendar } from 'lucide-react';
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import useCart from '../../Hook/useCart';

const MyProfile = () => {
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
    const [showReviews, setShowReviews] = useState(false);
    const [userReviews, setUserReviews] = useState([]);

    const formatDate = (dateString) => {
        if (!dateString) return 'Not available';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

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
                
                // Store reviews for display
                setUserReviews(reviewsResponse.data);
                
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
        <div className="min-h-screen pt-20" style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
            fontFamily: '"Inter", sans-serif'
        }}>
            {/* Restaurant Header with Elegant Design */}
            <div className="relative overflow-hidden">
                <div 
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="%23ffffff" opacity="0.3"/><circle cx="75" cy="25" r="1" fill="%23ffffff" opacity="0.2"/><circle cx="50" cy="50" r="1" fill="%23ffffff" opacity="0.4"/><circle cx="25" cy="75" r="1" fill="%23ffffff" opacity="0.3"/><circle cx="75" cy="75" r="1" fill="%23ffffff" opacity="0.2"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>')`,
                    }}
                />
                
                <div className="relative p-8">
                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-xl">
                                    <User className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-300 to-amber-100">
                                        My Profile
                                    </h1>
                                    <p className="text-amber-300 text-sm font-medium tracking-wide">
                                        BISTRO BOSS RESTAURANT • MEMBER PROFILE
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Profile Card */}
                    <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                        <div className="p-8">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Profile Picture & Quick Info */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="relative mb-6">
                                        <div className="w-40 h-40 rounded-full border-4 border-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center overflow-hidden shadow-2xl" style={{ borderColor: 'transparent', background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #fbbf24, #ea580c) border-box' }}>
                                            <div className="w-36 h-36 rounded-full overflow-hidden">
                                                {user?.photoURL ? (
                                                    <img
                                                        src={user?.photoURL}
                                                        alt="User Profile"
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            e.target.nextElementSibling.style.display = 'flex';
                                                        }}
                                                    />
                                                ) : null}
                                                {/* Fallback avatar */}
                                                <div 
                                                    className={`w-full h-full rounded-full flex items-center justify-center ${user?.photoURL ? 'hidden' : 'flex'}`}
                                                    style={{ 
                                                        background: 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)'
                                                    }}
                                                >
                                                    <User className="w-16 h-16 text-white" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <h2 className="text-3xl font-bold text-white mb-2">
                                        {(user?.displayName || user?.email?.split('@')[0] || 'Valued Customer').toUpperCase()}
                                    </h2>
                                    <p className="text-amber-300 font-medium mb-4">
                                        {user?.email}
                                    </p>
                                    
                                   

                                    {/* Quick Stats */}
                                    <div className="grid grid-cols-2 gap-4 w-full">
                                        <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
                                            <div className="text-2xl font-bold text-amber-400">
                                                {cart.length}
                                            </div>
                                            <div className="text-white/80 text-xs">Orders</div>
                                        </div>
                                        <div 
                                            className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm cursor-pointer hover:bg-white/20 transition-all duration-300"
                                            onClick={() => setShowReviews(!showReviews)}
                                        >
                                            <div className="text-2xl font-bold text-amber-400">
                                                {loading ? '...' : userStats.totalReviews}
                                            </div>
                                            <div className="text-white/80 text-xs">Reviews</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Profile Information */}
                                <div className="lg:col-span-2">
                                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                                            <User size={16} className="text-white" />
                                        </div>
                                        Account Information
                                    </h3>
                                    
                                    <div className="grid gap-6">
                                        {/* Display Name */}
                                        <div className="group">
                                            <label className="text-sm font-semibold text-amber-300 mb-3 flex items-center gap-2">
                                                <User size={16} />
                                                Display Name
                                            </label>
                                            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/15 transition-all duration-300">
                                                <span className="text-white font-medium">{user?.displayName || 'Not set'}</span>
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="group">
                                            <label className="text-sm font-semibold text-amber-300 mb-3 flex items-center gap-2">
                                                <Mail size={16} />
                                                Email Address
                                            </label>
                                            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/15 transition-all duration-300 flex items-center justify-between">
                                                <span className="text-white font-medium">{user?.email}</span>
                                                
                                            </div>
                                        </div>

                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* User Reviews Section */}
                    {showReviews && userReviews.length > 0 && (
                        <div className="mt-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                                        <span className="text-white">⭐</span>
                                    </div>
                                    My Reviews ({userStats.totalReviews})
                                </h3>
                                
                                <div className="grid gap-6">
                                    {userReviews.map((review, index) => (
                                        <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <h4 className="text-lg font-semibold text-white mb-1">
                                                        {review.recipe || 'General Review'}
                                                    </h4>
                                                    <div className="flex items-center gap-1 mb-2">
                                                        {[...Array(5)].map((_, i) => (
                                                            <span
                                                                key={i}
                                                                className={`text-lg ${
                                                                    i < (review.rating || 0) 
                                                                        ? 'text-amber-400' 
                                                                        : 'text-gray-400'
                                                                }`}
                                                            >
                                                                ⭐
                                                            </span>
                                                        ))}
                                                        <span className="text-amber-300 ml-2 font-medium">
                                                            {review.rating || 0}/5
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-amber-300 text-sm font-medium">
                                                        {new Date(review.createdAt || review.date).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="text-white/90 leading-relaxed">
                                                {review.details || review.review || 'No review text provided.'}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* No Reviews Message */}
                    {showReviews && userReviews.length === 0 && (
                        <div className="mt-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                            <div className="p-8 text-center">
                                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-2xl">⭐</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">No Reviews Yet</h3>
                                <p className="text-white/70 mb-4">
                                    You haven't written any reviews yet. Share your dining experience with others!
                                </p>
                                <button
                                    onClick={() => setShowReviews(false)}
                                    className="px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105"
                                    style={{ background: 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)' }}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyProfile;