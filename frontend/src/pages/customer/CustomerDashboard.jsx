import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jobService from '../../services/jobService';
import { Plus, Loader2, Clock, CheckCircle } from 'lucide-react';

const CustomerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const res = await jobService.getMyJobs();
        if (res.success) {
          setJobs(res.data);
        }
      } catch (err) {
        setError('Failed to fetch your jobs.');
      } finally {
        setLoading(false);
      }
    };
    fetchMyJobs();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'text-[#4a8a90]';
      case 'assigned': return 'text-[#e2934f]';
      case 'in-progress': return 'text-[#c9793b]';
      case 'completed': return 'text-green-500';
      case 'cancelled': return 'text-red-500';
      default: return 'text-[#8c8375]';
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="font-display font-bold text-3xl text-[#ede7dc]">My Dashboard</h1>
          <p className="text-[#8c8375]">Manage your posted jobs and hire professionals.</p>
        </div>
        <Link 
          to="/jobs/create" 
          className="bg-[#c9793b] text-[#1c1a17] font-semibold px-6 py-3 rounded-sm hover:bg-[#e2934f] transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Post New Job
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#c9793b]" />
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 font-mono text-sm">
          {error}
        </div>
      ) : jobs.length === 0 ? (
        <div className="bg-[#26221d] border border-white/5 p-12 text-center">
          <p className="text-[#8c8375] mb-6">You haven't posted any jobs yet.</p>
          <Link 
            to="/jobs/create" 
            className="border border-[#c9793b] text-[#c9793b] font-mono px-6 py-3 rounded-sm hover:bg-[#c9793b] hover:text-[#1c1a17] transition-colors inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Create First Job
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map(job => (
            <div key={job._id} className="bg-[#26221d] border border-white/5 p-6 flex flex-col h-full hover:border-white/10 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <span className="font-mono text-xs uppercase tracking-wider text-[#8c8375]">{job.category}</span>
                <span className={`font-mono text-xs uppercase tracking-wider ${getStatusColor(job.status)} flex items-center gap-1`}>
                  {job.status === 'completed' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                  {job.status}
                </span>
              </div>
              <h3 className="font-display font-bold text-xl text-[#ede7dc] mb-3 line-clamp-2">{job.title}</h3>
              <p className="text-[#8c8375] text-sm line-clamp-3 mb-6 flex-1">
                {job.description}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-[#ede7dc] font-mono text-lg">${job.budget}</span>
                <Link 
                  to={`/jobs/${job._id}`}
                  className="text-sm text-[#4a8a90] hover:text-[#2f5d62] font-semibold"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;
