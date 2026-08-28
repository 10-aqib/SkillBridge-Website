import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jobService from '../../services/jobService';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';

const CATEGORIES = [
  'Electrician', 'Plumber', 'Carpenter', 'Painter', 
  'Mason', 'HVAC', 'Appliance Repair', 'Mechanic', 'Cleaner', 'Other'
];

const jobSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Please provide more details (at least 20 characters)'),
  category: z.string().min(1, 'Category is required'),
  budget: z.coerce.number().min(5, 'Budget must be at least $5'),
  urgency: z.enum(['low', 'medium', 'high', 'emergency']),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
});

const CreateJob = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      urgency: 'medium',
    }
  });

  const onSubmit = async (data) => {
    setServerError('');
    try {
      const jobData = {
        title: data.title,
        description: data.description,
        category: data.category,
        budget: data.budget,
        urgency: data.urgency,
        location: {
          address: data.address,
          city: data.city,
          type: 'Point',
          coordinates: [-73.935242, 40.730610], // Default mock coord
        }
      };

      const res = await jobService.createJob(jobData);
      if (res.success) {
        navigate('/dashboard');
      }
    } catch (error) {
      setServerError(error.response?.data?.message || 'Failed to create job');
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 md:px-8 max-w-3xl mx-auto">
      <div className="bg-[#26221d] border border-white/10 p-8">
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl text-[#ede7dc] mb-2">Post a New Job</h1>
          <p className="text-[#8c8375]">Describe what you need done to get quotes from local professionals.</p>
        </div>

        {serverError && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 mb-6 text-sm font-mono rounded-sm">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block font-mono text-xs text-[#8c8375] mb-1.5 uppercase tracking-wider">Job Title</label>
            <input
              type="text"
              {...register('title')}
              className="w-full bg-[#1c1a17] border border-white/10 p-3 text-[#ede7dc] focus:outline-none focus:border-[#c9793b] transition-colors rounded-sm"
              placeholder="e.g. Fix leaking kitchen sink"
            />
            {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block font-mono text-xs text-[#8c8375] mb-1.5 uppercase tracking-wider">Category</label>
            <select
              {...register('category')}
              className="w-full bg-[#1c1a17] border border-white/10 p-3 text-[#ede7dc] focus:outline-none focus:border-[#c9793b] transition-colors rounded-sm appearance-none"
            >
              <option value="">Select a category</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category.message}</p>}
          </div>

          <div>
            <label className="block font-mono text-xs text-[#8c8375] mb-1.5 uppercase tracking-wider">Detailed Description</label>
            <textarea
              {...register('description')}
              rows="5"
              className="w-full bg-[#1c1a17] border border-white/10 p-3 text-[#ede7dc] focus:outline-none focus:border-[#c9793b] transition-colors rounded-sm resize-none"
              placeholder="Provide as much detail as possible. What needs to be fixed? Are there any specific parts required?"
            ></textarea>
            {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-mono text-xs text-[#8c8375] mb-1.5 uppercase tracking-wider">Estimated Budget ($)</label>
              <input
                type="number"
                {...register('budget')}
                className="w-full bg-[#1c1a17] border border-white/10 p-3 text-[#ede7dc] focus:outline-none focus:border-[#c9793b] transition-colors rounded-sm"
                placeholder="e.g. 150"
              />
              {errors.budget && <p className="text-red-400 text-xs mt-1">{errors.budget.message}</p>}
            </div>

            <div>
              <label className="block font-mono text-xs text-[#8c8375] mb-1.5 uppercase tracking-wider">Urgency</label>
              <select
                {...register('urgency')}
                className="w-full bg-[#1c1a17] border border-white/10 p-3 text-[#ede7dc] focus:outline-none focus:border-[#c9793b] transition-colors rounded-sm appearance-none"
              >
                <option value="low">Low (Flexible)</option>
                <option value="medium">Medium (Within a week)</option>
                <option value="high">High (Next 48 hours)</option>
                <option value="emergency">Emergency (ASAP)</option>
              </select>
              {errors.urgency && <p className="text-red-400 text-xs mt-1">{errors.urgency.message}</p>}
            </div>

            <div>
              <label className="block font-mono text-xs text-[#8c8375] mb-1.5 uppercase tracking-wider">Address</label>
              <input
                type="text"
                {...register('address')}
                className="w-full bg-[#1c1a17] border border-white/10 p-3 text-[#ede7dc] focus:outline-none focus:border-[#c9793b] transition-colors rounded-sm"
                placeholder="123 Main St"
              />
              {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address.message}</p>}
            </div>

            <div>
              <label className="block font-mono text-xs text-[#8c8375] mb-1.5 uppercase tracking-wider">City</label>
              <input
                type="text"
                {...register('city')}
                className="w-full bg-[#1c1a17] border border-white/10 p-3 text-[#ede7dc] focus:outline-none focus:border-[#c9793b] transition-colors rounded-sm"
                placeholder="City name"
              />
              {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city.message}</p>}
            </div>
          </div>

          <div className="pt-6 border-t border-white/10">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#c9793b] text-[#1c1a17] font-semibold py-4 rounded-sm hover:bg-[#e2934f] transition-colors flex justify-center items-center gap-2"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Post Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
