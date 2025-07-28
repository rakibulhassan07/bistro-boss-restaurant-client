import React, { useState, useContext } from 'react';
import { Star, Send, MessageCircle } from 'lucide-react';
import { AuthContext } from '../../../provider/AuthProvider';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import Swal from 'sweetalert2';

const Review = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewDetail, setReviewDetail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const handleStarClick = (starNumber) => {
    setRating(starNumber);
  };

  const handleStarHover = (starNumber) => {
    setHoveredRating(starNumber);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  const handleSubmitReview = async () => {
    // Validation
    if (!rating) {
      Swal.fire({
        icon: 'warning',
        title: 'Rating Required',
        text: 'Please provide a rating before submitting your review.',
        confirmButtonColor: '#ea580c',
        background: '#1e293b',
        color: '#ffffff'
      });
      return;
    }

    if (!reviewDetail.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please fill in your review detail.',
        confirmButtonColor: '#ea580c',
        background: '#1e293b',
        color: '#ffffff'
      });
      return;
    }

    if (!user?.email) {
      Swal.fire({
        icon: 'error',
        title: 'Authentication Error',
        text: 'You must be logged in to submit a review.',
        confirmButtonColor: '#ea580c',
        background: '#1e293b',
        color: '#ffffff'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const reviewData = {
        name: user?.displayName || user?.email?.split('@')[0] || 'Anonymous',
        email: user?.email,
        rating: rating,
        details: reviewDetail.trim(),
        date: new Date().toISOString(),
        timestamp: Date.now()
      };

      const response = await axiosSecure.post('/reviews', reviewData);

      if (response.data.insertedId) {
        // Success - Reset form
        setRating(0);
        setReviewDetail('');
        
        Swal.fire({
          icon: 'success',
          title: 'Review Submitted!',
          text: 'Thank you for your valuable feedback. Your review has been successfully submitted.',
          confirmButtonColor: '#ea580c',
          background: '#1e293b',
          color: '#ffffff',
          timer: 3000,
          timerProgressBar: true
        });
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: 'Failed to submit your review. Please try again.',
        confirmButtonColor: '#ea580c',
        background: '#1e293b',
        color: '#ffffff'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      fontFamily: '"Inter", sans-serif'
    }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div style={{
          backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="%23ffffff" opacity="0.3"/><circle cx="75" cy="25" r="1" fill="%23ffffff" opacity="0.2"/><circle cx="50" cy="50" r="1" fill="%23ffffff" opacity="0.4"/><circle cx="25" cy="75" r="1" fill="%23ffffff" opacity="0.3"/><circle cx="75" cy="75" r="1" fill="%23ffffff" opacity="0.2"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>')`,
          backgroundRepeat: 'repeat',
          width: '100%',
          height: '100%'
        }} />
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-xl">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-300 to-amber-100">
                Share Your Experience
              </h1>
            </div>
          </div>
          <p className="text-amber-300 text-sm font-medium tracking-wide">
            BISTRO BOSS RESTAURANT • YOUR FEEDBACK MATTERS
          </p>
        </div>

        {/* Main Review Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden shadow-2xl max-w-3xl mx-auto">
          <div className="p-8">
            {/* Rate Us Section */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                <Star className="w-6 h-6 text-amber-400" />
                Rate Your Experience
                <span className="text-red-400">*</span>
              </h2>
              <p className="text-white/70 mb-8">Please select a rating from 1 to 5 stars</p>
              
              {/* Star Rating */}
              <div className="flex justify-center gap-3 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={48}
                    className={`cursor-pointer transition-all duration-300 transform hover:scale-110 ${
                      star <= (hoveredRating || rating)
                        ? 'fill-amber-400 text-amber-400 drop-shadow-lg'
                        : 'text-white/30 hover:text-white/50'
                    }`}
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => handleStarHover(star)}
                    onMouseLeave={handleStarLeave}
                  />
                ))}
              </div>
              {rating > 0 && (
                <div className="bg-amber-500/20 border border-amber-400/30 rounded-xl p-3 inline-block">
                  <p className="text-amber-300 font-semibold">
                    You rated: {rating} star{rating > 1 ? 's' : ''} ⭐
                  </p>
                </div>
              )}
            </div>

            {/* Review Form */}
            <div className="space-y-6">
              {/* Review Detail */}
              <div>
                <label className="block text-amber-300 font-semibold mb-4 text-lg">
                  Share Your Experience <span className="text-red-400">*</span>
                </label>
                <p className="text-white/70 text-sm mb-4">
                  Tell us about your dining experience, the food quality, service, and atmosphere.
                </p>
                <textarea
                  placeholder="Write your detailed review here... What did you love most about your visit?"
                  value={reviewDetail}
                  onChange={(e) => setReviewDetail(e.target.value)}
                  rows={6}
                  className="w-full p-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button 
                  onClick={handleSubmitReview}
                  disabled={isSubmitting}
                  className={`w-full py-4 px-8 rounded-xl text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg flex items-center justify-center gap-3 ${
                    isSubmitting 
                      ? 'bg-gray-600' 
                      : 'hover:shadow-2xl'
                  }`}
                  style={{ 
                    background: isSubmitting 
                      ? '#6b7280' 
                      : 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)',
                    boxShadow: '0 8px 32px rgba(234, 88, 12, 0.3)'
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting Your Review...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Submit Review
                    </>
                  )}
                </button>
              </div>

              {/* Thank You Message */}
              <div className="text-center pt-4">
                <p className="text-white/60 text-sm">
                  Your feedback helps us improve our service and create better dining experiences for everyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;