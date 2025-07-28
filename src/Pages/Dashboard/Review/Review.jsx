import React, { useState, useContext } from 'react';
import { Star, Send } from 'lucide-react';
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
        confirmButtonColor: '#ea580c'
      });
      return;
    }

    if (!reviewDetail.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please fill in your review detail.',
        confirmButtonColor: '#ea580c'
      });
      return;
    }

    if (!user?.email) {
      Swal.fire({
        icon: 'error',
        title: 'Authentication Error',
        text: 'You must be logged in to submit a review.',
        confirmButtonColor: '#ea580c'
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
        confirmButtonColor: '#ea580c'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-orange-400 text-sm italic mb-4">---Sharing is Caring!!!---</p>
          <h1 className="text-3xl font-bold text-gray-800 tracking-wide">GIVE A REVIEW...</h1>
        </div>

        {/* Main Content Card */}
        <div className="bg-gray-100 rounded-lg p-8">
          {/* Rate Us Section */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Rate Us! <span className="text-red-500">*</span>
            </h2>
            <p className="text-sm text-gray-600 mb-6">Please select a rating from 1 to 5 stars</p>
            
            {/* Star Rating */}
            <div className="flex justify-center gap-2 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={40}
                  className={`cursor-pointer transition-colors ${
                    star <= (hoveredRating || rating)
                      ? 'fill-orange-400 text-orange-400'
                      : 'text-gray-300'
                  }`}
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => handleStarHover(star)}
                  onMouseLeave={handleStarLeave}
                />
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-orange-600 font-medium">
                You rated: {rating} star{rating > 1 ? 's' : ''}
              </p>
            )}
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Review Detail */}
            <div>
              <label className="block text-gray-700 font-medium mb-3">
                Kindly express your care in a short way. <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Review in detail"
                value={reviewDetail}
                onChange={(e) => setReviewDetail(e.target.value)}
                rows={6}
                className="w-full p-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button 
                onClick={handleSubmitReview}
                disabled={isSubmitting}
                className={`${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-orange-600 hover:bg-orange-700'
                } text-white font-medium py-3 px-6 rounded-md flex items-center gap-2 transition-colors disabled:transform-none`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Send Review
                    <Send size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;