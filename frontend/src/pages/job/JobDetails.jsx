import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import jobService from '../../services/jobService';
import proposalService from '../../services/proposalService';
import { useAuth } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ReviewForm from '../../components/reviews/ReviewForm';
import { MapPin, Clock, DollarSign, Briefcase, User, Calendar, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';

const proposalSchema = z.object({
  coverLetter: z.string().min(20, 'Cover letter must be at least 20 characters'),
  quote: z.number().min(1, 'Quote must be greater than 0'),
  estimatedDays: z.number().min(1, 'Estimated days must be at least 1'),
});

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [job, setJob] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [hasSubmittedProposal, setHasSubmittedProposal] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(proposalSchema)
  });

  useEffect(() => {
    fetchData();
  }, [id, user]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const jobData = await jobService.getJobById(id);
      setJob(jobData);
      
      if (user?.role === 'customer' && jobData.customer._id === user._id) {
        const proposalsData = await proposalService.getJobProposals(id);
        setProposals(proposalsData);
      }
      
      if (user?.role === 'worker') {
        try {
          const myProposals = await proposalService.getMyProposals();
          const submitted = myProposals.some(p => p.job._id === id);
          setHasSubmittedProposal(submitted);
        } catch (e) {
          console.error('Failed to fetch worker proposals');
        }
      }
    } catch (err) {
      setError('Failed to load job details.');
    } finally {
      setLoading(false);
    }
  };

  const onSubmitProposal = async (data) => {
    try {
      await proposalService.submitProposal({
        jobId: id,
        ...data
      });
      setHasSubmittedProposal(true);
      fetchData(); // Refresh
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit proposal.');
    }
  };

  const handleAcceptProposal = async (proposalId) => {
    try {
      await proposalService.acceptProposal(proposalId);
      fetchData();
    } catch (err) {
      setError('Failed to accept proposal.');
    }
  };

  const handleCompleteJob = async () => {
    try {
      await jobService.completeJob(id);
      fetchData();
    } catch (err) {
      setError('Failed to mark job as complete.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-graphite flex justify-center pt-32">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-copper"></div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-graphite flex justify-center pt-32 px-4">
        <div className="glass-panel p-8 rounded-2xl max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl text-white mb-4">{error || 'Job not found'}</h2>
          <button onClick={() => navigate('/jobs')} className="text-copper-bright hover:underline font-medium">
            &larr; Back to jobs
          </button>
        </div>
      </div>
    );
  }

  const isCustomer = user?.role === 'customer';
  const isOwner = isCustomer && job.customer._id === user?._id;
  const isWorker = user?.role === 'worker';

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-graphite relative">
      <div className="absolute inset-0 grid-bg opacity-10 z-0 pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto relative z-10 space-y-8">
        
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="flex items-center text-paper-dim hover:text-white transition-colors group w-max">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back
        </button>

        {/* Main Job Card */}
        <div className="glass-panel p-8 sm:p-10 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue/10 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8 relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 text-xs font-bold tracking-wide uppercase rounded-full border ${
                  job.status === 'open' ? 'bg-blue/10 text-blue-bright border-blue/20' : 
                  job.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                  'bg-amber-500/10 text-amber-400 border-amber-500/20'
                }`}>
                  {job.status}
                </span>
                <span className="text-paper-dim text-sm font-mono flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" /> {new Date(job.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{job.title}</h1>
              <p className="text-paper-dim text-lg leading-relaxed max-w-3xl">{job.description}</p>
            </div>
            
            <div className="bg-graphite-2/80 border border-white/10 p-6 rounded-2xl shrink-0 w-full md:w-64">
              <h3 className="text-xs font-mono text-muted uppercase tracking-widest mb-4">Job Specs</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <DollarSign className="w-5 h-5 text-emerald-400 mr-3 shrink-0" />
                  <div>
                    <p className="text-white font-semibold text-lg">${job.budget}</p>
                    <p className="text-xs text-muted">Est. Budget</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-copper-bright mr-3 shrink-0" />
                  <div>
                    <p className="text-white font-medium text-sm leading-tight">{job.location?.address}</p>
                    <p className="text-xs text-muted mt-0.5">Location</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Briefcase className="w-5 h-5 text-blue-bright mr-3 shrink-0" />
                  <div>
                    <p className="text-white font-medium text-sm">{job.category}</p>
                    <p className="text-xs text-muted mt-0.5">Category</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-amber-400 mr-3 shrink-0" />
                  <div>
                    <p className="text-white font-medium text-sm capitalize">{job.urgency}</p>
                    <p className="text-xs text-muted mt-0.5">Urgency</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Job Actions for Owner */}
          {isOwner && job.status === 'assigned' && (
            <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
              <div className="flex flex-col sm:flex-row items-center justify-between bg-emerald-500/10 border border-emerald-500/20 p-5 rounded-xl">
                <div className="flex items-center gap-3 mb-4 sm:mb-0">
                  <CheckCircle className="w-6 h-6 text-emerald-400" />
                  <span className="text-emerald-50 font-medium">Is the work finished?</span>
                </div>
                <button
                  onClick={handleCompleteJob}
                  className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-graphite font-bold px-6 py-2.5 rounded-lg transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                >
                  Mark Job as Complete
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Review Form Component */}
        {isOwner && job.status === 'completed' && job.assignedWorker && (
           <ReviewForm jobId={job._id} workerId={job.assignedWorker._id} />
        )}

        {/* Proposals Section (Owner View) */}
        {isOwner && (
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-semibold text-white flex items-center gap-3">
              <User className="w-6 h-6 text-copper" /> 
              {job.status === 'assigned' ? 'Assigned Worker' : 'Proposals'} 
              <span className="bg-white/10 text-paper-dim text-xs py-1 px-3 rounded-full font-mono">{proposals.length}</span>
            </h2>
            
            {proposals.length === 0 ? (
              <div className="glass-panel p-10 text-center rounded-2xl border-dashed border-2 border-white/10 bg-transparent">
                <p className="text-muted">No proposals have been submitted yet. We'll notify you when someone applies.</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {proposals.map(proposal => (
                  <div key={proposal._id} className={`p-6 rounded-2xl border ${proposal.status === 'accepted' ? 'bg-copper/5 border-copper/30' : 'glass-panel'} transition-colors`}>
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h4 className="text-lg font-semibold text-white">{proposal.worker?.user?.name || 'Worker'}</h4>
                          {proposal.status === 'accepted' && (
                            <span className="bg-copper text-graphite text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">Hired</span>
                          )}
                        </div>
                        <p className="text-paper-dim text-sm leading-relaxed mb-4">{proposal.coverLetter}</p>
                      </div>
                      
                      <div className="bg-graphite-2/50 border border-white/5 p-4 rounded-xl min-w-[200px] flex flex-col justify-between">
                        <div>
                          <p className="text-sm text-muted mb-1">Proposed Quote</p>
                          <p className="text-2xl font-bold text-copper-bright mb-3">${proposal.quote}</p>
                          <p className="text-sm text-muted mb-1">Est. Time</p>
                          <p className="text-paper-dim font-medium mb-4">{proposal.estimatedDays} days</p>
                        </div>
                        
                        {job.status === 'open' && proposal.status === 'pending' && (
                          <button
                            onClick={() => handleAcceptProposal(proposal._id)}
                            className="w-full bg-gradient-to-r from-blue-bright to-blue hover:from-blue hover:to-blue-bright text-graphite font-semibold py-2.5 rounded-lg transition-all shadow-glow-blue"
                          >
                            Accept & Hire
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Submit Proposal Section (Worker View) */}
        {isWorker && job.status === 'open' && !hasSubmittedProposal && (
          <div className="glass-panel p-8 sm:p-10 rounded-2xl border-t-4 border-t-blue-bright">
            <h2 className="font-display text-2xl font-semibold text-white mb-2">Submit a Proposal</h2>
            <p className="text-paper-dim text-sm mb-8">Offer your services for this job. Be clear about your quote and timeline.</p>
            
            <form onSubmit={handleSubmit(onSubmitProposal)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-paper-dim mb-2">Cover Letter</label>
                <textarea
                  {...register('coverLetter')}
                  rows="4"
                  className={`w-full bg-graphite-2/50 border ${errors.coverLetter ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3.5 text-white placeholder:text-muted focus:ring-blue-bright focus:border-blue-bright transition-colors`}
                  placeholder="Why are you the right fit for this job?"
                ></textarea>
                {errors.coverLetter && <p className="mt-2 text-sm text-red-400">{errors.coverLetter.message}</p>}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-paper-dim mb-2">Your Quote ($)</label>
                  <input
                    type="number"
                    {...register('quote', { valueAsNumber: true })}
                    className={`w-full bg-graphite-2/50 border ${errors.quote ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3.5 text-white focus:ring-blue-bright focus:border-blue-bright transition-colors`}
                    placeholder="e.g. 150"
                  />
                  {errors.quote && <p className="mt-2 text-sm text-red-400">{errors.quote.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-paper-dim mb-2">Estimated Days to Complete</label>
                  <input
                    type="number"
                    {...register('estimatedDays', { valueAsNumber: true })}
                    className={`w-full bg-graphite-2/50 border ${errors.estimatedDays ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3.5 text-white focus:ring-blue-bright focus:border-blue-bright transition-colors`}
                    placeholder="e.g. 2"
                  />
                  {errors.estimatedDays && <p className="mt-2 text-sm text-red-400">{errors.estimatedDays.message}</p>}
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-base font-semibold text-graphite bg-gradient-to-r from-blue-bright to-blue hover:shadow-glow-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue disabled:opacity-70 transition-all duration-300 transform hover:-translate-y-0.5 mt-4"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Proposal'}
              </button>
            </form>
          </div>
        )}

        {isWorker && hasSubmittedProposal && (
          <div className="glass-panel p-8 rounded-2xl bg-blue/5 border border-blue/20 text-center">
            <CheckCircle className="w-12 h-12 text-blue-bright mx-auto mb-4" />
            <h3 className="text-xl font-display text-white font-medium mb-2">Proposal Submitted</h3>
            <p className="text-paper-dim">You have already submitted a proposal for this job. The customer will review it shortly.</p>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default JobDetails;
