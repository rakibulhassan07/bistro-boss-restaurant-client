import React, { useState } from 'react';
import { Star, Send } from 'lucide-react';

const Review = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [recipe, setRecipe] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [reviewDetail, setReviewDetail] = useState('');

  const handleStarClick = (starNumber) => {
    setRating(starNumber);
  };

  const handleStarHover = (starNumber) => {
    setHoveredRating(starNumber);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
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
            <h2 className="text-xl font-bold text-gray-800 mb-6">Rate Us!</h2>
            
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
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Recipe Question */}
            <div>
              <label className="block text-gray-700 font-medium mb-3">
                Which recipe you liked most?
              </label>
              <input
                type="text"
                placeholder="Recipe you liked most"
                value={recipe}
                onChange={(e) => setRecipe(e.target.value)}
                className="w-full p-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
            </div>

            {/* Suggestion Question */}
            <div>
              <label className="block text-gray-700 font-medium mb-3">
                Do you have any suggestion for us?
              </label>
              <input
                type="text"
                placeholder="Suggestion"
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                className="w-full p-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
            </div>

            {/* Review Detail */}
            <div>
              <label className="block text-gray-700 font-medium mb-3">
                Kindly express your care in a short way.
              </label>
              <textarea
                placeholder="Review in detail"
                value={reviewDetail}
                onChange={(e) => setReviewDetail(e.target.value)}
                rows={6}
                className="w-full p-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-6 rounded-md flex items-center gap-2 transition-colors">
                Send Review
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;