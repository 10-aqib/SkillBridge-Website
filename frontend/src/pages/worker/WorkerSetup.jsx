import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import workerService from '../../services/workerService';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';

const setupSchema = z.object({
  professionalTitle: z.string().min(5, 'Professional title must be at least 5 characters'),
  bio: z.string().min(20, 'Bio must be at least 20 characters'),
  categories: z.string().min(3, 'At least one category is required (comma separated)'),
  skills: z.string().min(3, 'At least one skill is required (comma separated)'),
  experienceYears: z.coerce.number().min(0, 'Experience must be 0 or more'),
  hourlyRate: z.coerce.number().min(1, 'Hourly rate must be at least 1'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
});

const WorkerSetup = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(setupSchema)
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await workerService.getMyProfile();
        if (res.success && res.data) {
          const profile = res.data;
          setValue('professionalTitle', profile.professionalTitle);
          setValue('bio', profile.bio);
          setValue('categories', profile.categories.join(', '));
          setValue('skills', profile.skills.join(', '));
          setValue('experienceYears', profile.experienceYears);
          setValue('hourlyRate', profile.hourlyRate);
          setValue('address', profile.location?.address || '');
          setValue('city', profile.location?.city || '');
        }
      } catch (error) {
        // Expected to fail if profile doesn't exist yet
        console.log('No profile exists yet');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [setValue]);

  const onSubmit = async (data) => {
    setServerError('');
    try {
      const res = await workerService.updateProfile(data);
      if (res.success) {
        navigate('/worker/dashboard'); // Redirect to dashboard once profile is saved
      }
    } catch (error) {
      setServerError(error.response?.data?.message || 'Failed to save profile');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#c9793b]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 md:px-8 max-w-3xl mx-auto">
      <div className="bg-[#26221d] border border-white/10 p-8">
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl text-[#ede7dc] mb-2">Worker Profile Setup</h1>
          <p className="text-[#8c8375]">Complete your profile to start receiving job requests.</p>
        </div>

        {serverError && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 mb-6 text-sm font-mono rounded-sm">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block font-mono text-xs text-[#8c8375] mb-1.5 uppercase tracking-wider">Professional Title</label>
              <input
                type="text"
                {...register('professionalTitle')}
                className="w-full bg-[#1c1a17] border border-white/10 p-3 text-[#ede7dc] focus:outline-none focus:border-[#c9793b] transition-colors rounded-sm"
                placeholder="e.g. Master Electrician & Solar Installer"
              />
              {errors.professionalTitle && <p className="text-red-400 text-xs mt-1">{errors.professionalTitle.message}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block font-mono text-xs text-[#8c8375] mb-1.5 uppercase tracking-wider">Bio / About Me</label>
              <textarea
                {...register('bio')}
                rows="4"
                className="w-full bg-[#1c1a17] border border-white/10 p-3 text-[#ede7dc] focus:outline-none focus:border-[#c9793b] transition-colors rounded-sm resize-none"
                placeholder="Tell customers about your experience, approach to work, and what makes you reliable."
              ></textarea>
              {errors.bio && <p className="text-red-400 text-xs mt-1">{errors.bio.message}</p>}
            </div>

            <div>
              <label className="block font-mono text-xs text-[#8c8375] mb-1.5 uppercase tracking-wider">Categories (comma separated)</label>
              <input
                type="text"
                {...register('categories')}
                className="w-full bg-[#1c1a17] border border-white/10 p-3 text-[#ede7dc] focus:outline-none focus:border-[#c9793b] transition-colors rounded-sm"
                placeholder="e.g. Electrician, Handyman"
              />
              {errors.categories && <p className="text-red-400 text-xs mt-1">{errors.categories.message}</p>}
            </div>

            <div>
              <label className="block font-mono text-xs text-[#8c8375] mb-1.5 uppercase tracking-wider">Skills (comma separated)</label>
              <input
                type="text"
                {...register('skills')}
                className="w-full bg-[#1c1a17] border border-white/10 p-3 text-[#ede7dc] focus:outline-none focus:border-[#c9793b] transition-colors rounded-sm"
                placeholder="e.g. Wiring, Panel Upgrade, Troubleshooting"
              />
              {errors.skills && <p className="text-red-400 text-xs mt-1">{errors.skills.message}</p>}
            </div>

            <div>
              <label className="block font-mono text-xs text-[#8c8375] mb-1.5 uppercase tracking-wider">Years of Experience</label>
              <input
                type="number"
                {...register('experienceYears')}
                className="w-full bg-[#1c1a17] border border-white/10 p-3 text-[#ede7dc] focus:outline-none focus:border-[#c9793b] transition-colors rounded-sm"
                placeholder="e.g. 10"
              />
              {errors.experienceYears && <p className="text-red-400 text-xs mt-1">{errors.experienceYears.message}</p>}
            </div>

            <div>
              <label className="block font-mono text-xs text-[#8c8375] mb-1.5 uppercase tracking-wider">Hourly Rate ($)</label>
              <input
                type="number"
                {...register('hourlyRate')}
                className="w-full bg-[#1c1a17] border border-white/10 p-3 text-[#ede7dc] focus:outline-none focus:border-[#c9793b] transition-colors rounded-sm"
                placeholder="e.g. 45"
              />
              {errors.hourlyRate && <p className="text-red-400 text-xs mt-1">{errors.hourlyRate.message}</p>}
            </div>

            <div>
              <label className="block font-mono text-xs text-[#8c8375] mb-1.5 uppercase tracking-wider">Address</label>
              <input
                type="text"
                {...register('address')}
                className="w-full bg-[#1c1a17] border border-white/10 p-3 text-[#ede7dc] focus:outline-none focus:border-[#c9793b] transition-colors rounded-sm"
                placeholder="e.g. 123 Main St"
              />
              {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address.message}</p>}
            </div>

            <div>
              <label className="block font-mono text-xs text-[#8c8375] mb-1.5 uppercase tracking-wider">City</label>
              <input
                type="text"
                {...register('city')}
                className="w-full bg-[#1c1a17] border border-white/10 p-3 text-[#ede7dc] focus:outline-none focus:border-[#c9793b] transition-colors rounded-sm"
                placeholder="e.g. New York"
              />
              {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city.message}</p>}
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#c9793b] text-[#1c1a17] font-semibold py-3.5 mt-2 rounded-sm hover:bg-[#e2934f] transition-colors flex justify-center items-center gap-2"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkerSetup;
