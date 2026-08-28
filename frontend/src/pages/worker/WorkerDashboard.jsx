import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jobService from '../../services/jobService';
import proposalService from '../../services/proposalService';
import { Loader2, Briefcase, FileText, CheckCircle, Clock } from 'lucide-react';

const WorkerDashboard = () => {
  const [activeJobs, setActiveJobs] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [jobsRes, proposalsRes] = await Promise.all([
          jobService.getWorkerJobs(),
          proposalService.getMyProposals()
        ]);
        
        if (jobsRes.success) setActiveJobs(jobsRes.data);
        if (proposalsRes.success) setProposals(proposalsRes.data);
      } catch (err) {
        setError('Failed to fetch dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-[#4a8a90]';
      case 'accepted': return 'text-green-500';
      case 'rejected': return 'text-red-500';
      default: return 'text-[#8c8375]';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#c9793b]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="font-display font-bold text-3xl text-[#ede7dc]">Worker Dashboard</h1>
          <p className="text-[#8c8375]">Manage your active jobs and track your proposals.</p>
        </div>
        <div className="flex gap-4">
          <Link 
            to="/worker/profile/setup" 
            className="border border-[#c9793b] text-[#c9793b] font-semibold px-4 py-2 rounded-sm hover:bg-[#c9793b] hover:text-[#1c1a17] transition-colors text-sm"
          >
            Edit Profile
          </Link>
          <Link 
            to="/jobs" 
            className="bg-[#c9793b] text-[#1c1a17] font-semibold px-4 py-2 rounded-sm hover:bg-[#e2934f] transition-colors flex items-center gap-2 text-sm"
          >
            <Briefcase className="w-4 h-4" /> Find Jobs
          </Link>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 font-mono text-sm mb-8">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Jobs Section */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle className="w-5 h-5 text-[#4a8a90]" />
            <h2 className="font-display font-bold text-2xl text-[#ede7dc]">My Active Jobs</h2>
          </div>
          
          {activeJobs.length === 0 ? (
            <div className="bg-[#26221d] border border-white/5 p-8 text-center h-48 flex flex-col items-center justify-center">
              <p className="text-[#8c8375] mb-4 text-sm">You have no active jobs assigned.</p>
              <Link to="/jobs" className="text-[#c9793b] hover:text-[#e2934f] underline text-sm">Browse open jobs</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {activeJobs.map(job => (
                <div key={job._id} className="bg-[#26221d] border border-white/5 p-5 hover:border-white/10 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#e2934f]">{job.status}</span>
                    <span className="font-mono text-sm text-[#ede7dc]">${job.budget}</span>
                  </div>
                  <h3 className="font-bold text-[#ede7dc] mb-2 truncate"><Link to={`/jobs/${job._id}`}>{job.title}</Link></h3>
                  <div className="text-sm text-[#8c8375] mb-4">
                    Client: <span className="text-[#d8d0c0]">{job.customer?.name}</span>
                  </div>
                  <Link 
                    to={`/jobs/${job._id}`}
                    className="text-xs text-[#c9793b] border border-[#c9793b]/30 px-3 py-1.5 hover:bg-[#c9793b]/10 transition-colors"
                  >
                    View Workspace
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Proposals Section */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <FileText className="w-5 h-5 text-[#4a8a90]" />
            <h2 className="font-display font-bold text-2xl text-[#ede7dc]">My Proposals</h2>
          </div>
          
          {proposals.length === 0 ? (
            <div className="bg-[#26221d] border border-white/5 p-8 text-center h-48 flex flex-col items-center justify-center">
              <p className="text-[#8c8375] mb-4 text-sm">You haven't submitted any proposals yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {proposals.map(proposal => (
                <div key={proposal._id} className="bg-[#26221d] border border-white/5 p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-[#ede7dc] truncate flex-1 pr-4">
                      <Link to={`/jobs/${proposal.job?._id}`}>{proposal.job?.title || 'Deleted Job'}</Link>
                    </h3>
                    <span className={`font-mono text-xs uppercase tracking-wider ${getStatusColor(proposal.status)} flex items-center gap-1 shrink-0`}>
                      {proposal.status === 'pending' ? <Clock className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                      {proposal.status}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-3 mt-3 border-t border-white/5">
                    <div className="text-sm text-[#8c8375]">
                      Proposed: <span className="text-[#ede7dc] font-mono">${proposal.proposedPrice}</span>
                    </div>
                    <div className="text-sm text-[#8c8375]">
                      Est. Time: <span className="text-[#ede7dc] font-mono">{proposal.estimatedDays} days</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;
