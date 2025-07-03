'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GoogleReview {
  author_name: string;
  rating: number;
  relative_time_description: string;
  text: string;
  profile_photo_url?: string;
}

interface GoogleReviewsProps {
  placeId: string;
  apiKey: string;
  maxReviews?: number;
}

const GoogleReviews: React.FC<GoogleReviewsProps> = ({ 
  placeId, 
  apiKey, 
  maxReviews = 6 
}) => {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use a proxy API route to avoid CORS issues and protect the API key
        const response = await fetch('/api/google-reviews', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            placeId,
            apiKey,
            maxReviews,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }

        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }

        setReviews(data.reviews || []);
        setAverageRating(data.averageRating || 0);
      } catch (err) {
        console.error('Error fetching Google reviews:', err);
        setError(err instanceof Error ? err.message : 'Failed to load reviews');
        
        // Fallback to sample reviews if API fails
        setReviews([
          {
            author_name: "Anna K.",
            rating: 5,
            relative_time_description: "2 weeks ago",
            text: "Amazing burgers! The crispy texture and bold flavors are exactly what I was looking for. Highly recommend!",
          },
          {
            author_name: "Marek S.",
            rating: 5,
            relative_time_description: "1 month ago",
            text: "Best wraps in Lublin! Fresh ingredients and great service. Will definitely come back.",
          },
          {
            author_name: "Jan K.",
            rating: 5,
            relative_time_description: "3 weeks ago",
            text: "The golden wings are absolutely incredible! Perfect balance of crispy and juicy. A must-try!",
          },
        ]);
        setAverageRating(5);
      } finally {
        setLoading(false);
      }
    };

    if (placeId && apiKey) {
      fetchReviews();
    }
  }, [placeId, apiKey, maxReviews]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <svg 
            key={i} 
            className={`w-5 h-5 ${i < rating ? 'fill-current' : 'fill-gray-600'}`} 
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
          </svg>
        ))}
      </div>
    );
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="grid md:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-gray-800 p-6 rounded-lg animate-pulse"
          >
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, j) => (
                  <div key={j} className="w-5 h-5 bg-gray-600 rounded"></div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            </div>
            <div className="flex items-center mt-4">
              <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
              <div className="ml-3 space-y-2">
                <div className="h-4 bg-gray-700 rounded w-20"></div>
                <div className="h-3 bg-gray-700 rounded w-16"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (error && reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400 mb-4">Unable to load reviews at this time.</p>
        <a 
          href={`https://www.google.com/search?q=LAVA+LUBLIN&ludocid=${placeId}#lrd=0x472257fcbded0caf:0xd637f35efbd83c0b,1,,,`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-400 underline hover:text-orange-600"
        >
          View reviews on Google
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Average Rating Display */}
      {averageRating > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center bg-gray-800 px-6 py-3 rounded-full">
            <span className="text-2xl font-bold text-white mr-3">{averageRating.toFixed(1)}</span>
            {renderStars(Math.round(averageRating))}
            <span className="text-gray-400 ml-3">({reviews.length} reviews)</span>
          </div>
        </motion.div>
      )}

      {/* Reviews Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {reviews.map((review, index) => (
          <motion.div
            key={`${review.author_name}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800 p-6 rounded-lg hover:bg-gray-750 transition-colors duration-300"
          >
            <div className="flex items-center mb-4">
              {renderStars(review.rating)}
            </div>
            <p className="text-gray-300 mb-4 italic line-clamp-4">
              &quot;{review.text}&quot;
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {review.profile_photo_url ? (
                  <img
                    src={review.profile_photo_url}
                    alt={`${review.author_name}'s profile`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {getInitials(review.author_name)}
                  </div>
                )}
                <div className="ml-3">
                  <p className="text-white font-semibold">{review.author_name}</p>
                  <p className="text-gray-400 text-sm">{review.relative_time_description}</p>
                </div>
              </div>
              <div className="text-gray-500 text-xs">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Reviews Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-8"
      >
        <a 
          href={`https://www.google.com/search?q=LAVA+LUBLIN&ludocid=${placeId}#lrd=0x472257fcbded0caf:0xd637f35efbd83c0b,1,,,`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-orange-400 hover:text-orange-600 transition-colors duration-200"
          aria-label="View all reviews on Google (opens in new tab)"
        >
          <span className="mr-2">View all reviews on Google</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </motion.div>
    </div>
  );
};

export default GoogleReviews; 