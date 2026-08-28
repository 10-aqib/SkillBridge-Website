import React from 'react';
import { Star, MessageSquare } from 'lucide-react';

const ReviewList = ({ reviews = [] }) => {
  if (reviews.length === 0) {
    return (
      <div className="bg-[#26221d] border border-white/5 p-8 text-center text-[#8c8375]">
        <MessageSquare className="w-8 h-8 mx-auto mb-3 opacity-50" />
        <p>No reviews yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review._id} className="bg-[#26221d] border border-white/5 p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="font-display font-bold text-[#ede7dc]">{review.name}</h4>
              <span className="text-[#8c8375] text-xs">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= review.rating ? 'fill-[#c9793b] text-[#c9793b]' : 'text-[#8c8375]/30'
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-[#d8d0c0] text-sm leading-relaxed">
            "{review.comment}"
          </p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
