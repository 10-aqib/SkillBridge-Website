import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import jobService from '../../services/jobService';
import { PlusCircle, AlertCircle, FileText, MapPin, DollarSign } from 'lucide-react';

const createJobSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  category: z.string().min(1, 'Please select a category'),
  budget: z.number().min(1, 'Budget must be greater than 0'),
  address: z.string().min(5, 'Please provide a full address'),
  urgency: z.enum(['low', 'medium', 'high']),
});

const CreateJob = () => {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      urgency: 'medium',
      category: ''
    }
  });

  const onSubmit = async (data) => {
    try {
      setSubmitError('');
      const jobData = {
        title: data.title,
        description: data.description,
        category: data.category,
        budget: data.budget,
        urgency: data.urgency,
        location: {
          type: 'Point',
          coordinates: [0, 0], // In a real app, geocode the address here
          address: data.address
        }
      };
      
      const newJob = await jobService.createJob(jobData);
      navigate(`/jobs/${newJob._id}`);
    } catch (error) {
      setSubmitError(error.response?.data?.message || 'Failed to create job. Please try again.');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-graphite relative">
      <div className="absolute inset-0 grid-bg opacity-10 z-0 pointer-events-none"></div>
      
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="mb-10">
          <h1 className="font-display text-4xl font-bold text-white mb-3 tracking-tight">Post a New Job</h1>
          <p className="text-paper-dim text-lg">Provide clear details to get the best matches from local professionals.</p>
        </div>

        <div className="glass-panel p-8 sm:p-10 rounded-2xl border-t-4 border-t-copper">
          {submitError && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl flex items-start gap-3 mb-8 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{submitError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Project Details Section */}
            <div>
              <h3 className="font-display text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-copper-bright" /> Project Details
              </h3>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-paper-dim mb-2">Job Title</label>
                  <input
                    {...register('title')}
                    className={`w-full bg-graphite-2/50 border ${errors.title ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3.5 text-white placeholder:text-muted focus:ring-copper focus:border-copper transition-colors`}
                    placeholder="e.g. Install new ceiling fan in living room"
                  />
                  {errors.title && <p className="mt-2 text-sm text-red-400">{errors.title.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-paper-dim mb-2">Description</label>
                  <textarea
                    {...register('description')}
                    rows="4"
                    className={`w-full bg-graphite-2/50 border ${errors.description ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3.5 text-white placeholder:text-muted focus:ring-copper focus:border-copper transition-colors`}
                    placeholder="Provide as much detail as possible about the work required..."
                  ></textarea>
                  {errors.description && <p className="mt-2 text-sm text-red-400">{errors.description.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-paper-dim mb-2">Category</label>
                    <select
                      {...register('category')}
                      className={`w-full bg-graphite-2/50 border ${errors.category ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3.5 text-white focus:ring-copper focus:border-copper transition-colors appearance-none`}
                    >
                      <option value="" disabled>Select a category</option>
                      <option value="Electrical">Electrical</option>
                      <option value="Plumbing">Plumbing</option>
                      <option value="Carpentry">Carpentry</option>
                      <option value="Painting">Painting</option>
                      <option value="Appliance repair">Appliance repair</option>
                      <option value="Masonry">Masonry</option>
                      <option value="HVAC">HVAC</option>
                      <option value="Moving & labor">Moving & labor</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.category && <p className="mt-2 text-sm text-red-400">{errors.category.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-paper-dim mb-2">Urgency</label>
                    <select
                      {...register('urgency')}
                      className="w-full bg-graphite-2/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:ring-copper focus:border-copper transition-colors appearance-none"
                    >
                      <option value="low">Low (Flexible)</option>
                      <option value="medium">Medium (Within a week)</option>
                      <option value="high">High (ASAP)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-white/10"></div>

            {/* Location & Budget Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-display text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-bright" /> Location
                </h3>
                <label className="block text-sm font-medium text-paper-dim mb-2">Street Address</label>
                <input
                  {...register('address')}
                  className={`w-full bg-graphite-2/50 border ${errors.address ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3.5 text-white placeholder:text-muted focus:ring-blue-bright focus:border-blue-bright transition-colors`}
                  placeholder="123 Main St, City, ZIP"
                />
                {errors.address && <p className="mt-2 text-sm text-red-400">{errors.address.message}</p>}
              </div>

              <div>
                <h3 className="font-display text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-400" /> Budget
                </h3>
                <label className="block text-sm font-medium text-paper-dim mb-2">Estimated Budget ($)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-muted font-medium">$</span>
                  </div>
                  <input
                    {...register('budget', { valueAsNumber: true })}
                    type="number"
                    min="1"
                    className={`w-full bg-graphite-2/50 border ${errors.budget ? 'border-red-500/50' : 'border-white/10'} rounded-xl pl-9 pr-4 py-3.5 text-white placeholder:text-muted focus:ring-emerald-400 focus:border-emerald-400 transition-colors`}
                    placeholder="150"
                  />
                </div>
                {errors.budget && <p className="mt-2 text-sm text-red-400">{errors.budget.message}</p>}
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-sm text-base font-semibold text-graphite bg-gradient-to-r from-copper to-copper-bright hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-copper disabled:opacity-70 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                {isSubmitting ? 'Posting Job...' : <><PlusCircle className="w-5 h-5" /> Post Job Now</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateJob;
