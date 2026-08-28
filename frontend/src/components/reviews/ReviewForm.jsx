import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Star, Loader2, CheckCircle } from 'lucide-react';
import reviewService from '../../services/reviewService';

const reviewSchema = z.object({
  rating: z.number().min(1, 'Please select a rating').max(5),
  comment: z.string().min(10, 'Please write at least a short review (10 characters)'),
});

const ReviewForm = ({ jobId, workerId, onSuccess }) => {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: ''
    }
  });

  const ratingValue = watch('rating');

  const onSubmit = async (data) => {
    setSubmitError('');
    try {
      const reviewData = { ...data, jobId };
      const res = await reviewService.addReview(workerId, reviewData);
      if (res.success) {
        setSubmitSuccess(true);
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      setSubmitError(err.response?.data?.message || 'Failed to submit review');
    }
  };

  if (submitSuccess) {
    return (
      <div className="bg-green-500/10 border border-green-500/30 p-6 text-center">
        <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
        <h3 className="text-xl font-display font-bold text-green-400 mb-2">Review Submitted!</h3>
        <p className="text-green-400/80">Thank you for sharing your feedback.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#26221d] border border-white/5 p-6">
      <h3 className="font-display font-bold text-xl text-[#ede7dc] mb-4">Rate & Review</h3>
      <p className="text-[#8c8375] text-sm mb-6">How was your experience working with this professional?</p>

      {submitError && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 text-sm font-mono mb-6">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block font-mono text-xs text-[#8c8375] mb-2 uppercase">Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setValue('rating', star, { shouldValidate: true })}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= (hoveredStar || ratingValue)
                      ? 'fill-[#c9793b] text-[#c9793b]'
                      : 'text-[#8c8375]'
                  }`}
                />
              </button>
            ))}
          </div>
          {errors.rating && <p className="text-red-400 text-xs mt-2">{errors.rating.message}</p>}
        </div>

        <div>
          <label className="block font-mono text-xs text-[#8c8375] mb-1.5 uppercase">Review Comment</label>
          <textarea
            {...register('comment')}
            rows="4"
            className="w-full bg-[#1c1a17] border border-white/10 p-3 text-[#ede7dc] focus:outline-none focus:border-[#c9793b] resize-none"
            placeholder="Describe the quality of work, professionalism, and overall experience..."
          ></textarea>
          {errors.comment && <p className="text-red-400 text-xs mt-1">{errors.comment.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#c9793b] text-[#1c1a17] font-semibold py-3 rounded-sm hover:bg-[#e2934f] transition-colors flex justify-center items-center gap-2"
        >
          {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
