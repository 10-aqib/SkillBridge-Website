import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jobService from '../../services/jobService';
import { useAuth } from '../../context/AuthContext';
import { Search, MapPin, Briefcase, Filter, ArrowRight, Clock, PlusCircle } from 'lucide-react';

const JobBoard = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: '', urgency: '' });

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await jobService.getJobs(filters);
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const renderStatusBadge = (status) => {
    switch(status) {
      case 'open':
        return <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-semibold tracking-wide uppercase">Open</span>;
      case 'assigned':
        return <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-semibold tracking-wide uppercase">In Progress</span>;
      case 'completed':
        return <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-semibold tracking-wide uppercase">Completed</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-graphite relative">
      <div className="absolute inset-0 grid-bg opacity-10 z-0 pointer-events-none"></div>
      <div className="max-w-[1180px] mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-white/10 pb-8">
          <div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight mb-3">
              Job <span className="text-copper-bright">Board</span>
            </h1>
            <p className="text-paper-dim text-lg">
              {user?.role === 'worker' ? 'Find your next project locally.' : 'Discover and manage your posted jobs.'}
            </p>
          </div>
          {user?.role === 'customer' && (
            <Link 
              to="/post-job" 
              className="group flex items-center gap-2 bg-gradient-to-r from-copper to-copper-bright text-graphite font-semibold px-6 py-3 rounded-xl hover:-translate-y-1 hover:shadow-glow transition-all duration-300"
            >
              <PlusCircle className="w-5 h-5" /> Post New Job
            </Link>
          )}
        </div>

        {/* Filters Panel */}
        <div className="glass-panel p-6 rounded-2xl mb-10 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex items-center gap-3 text-copper-bright font-mono text-sm tracking-wider w-full md:w-auto">
            <Filter className="w-5 h-5" /> FILTERS
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto flex-1 md:justify-end">
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="bg-graphite-2/80 border border-white/10 text-white text-sm rounded-xl focus:ring-copper focus:border-copper block w-full sm:w-48 p-3 transition-colors outline-none"
            >
              <option value="">All Categories</option>
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

            <select
              name="urgency"
              value={filters.urgency}
              onChange={handleFilterChange}
              className="bg-graphite-2/80 border border-white/10 text-white text-sm rounded-xl focus:ring-copper focus:border-copper block w-full sm:w-48 p-3 transition-colors outline-none"
            >
              <option value="">Any Urgency</option>
              <option value="low">Low (Flexible)</option>
              <option value="medium">Medium (Soon)</option>
              <option value="high">High (ASAP)</option>
            </select>
          </div>
        </div>

        {/* Job Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-copper"></div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="glass-panel text-center py-24 rounded-2xl flex flex-col items-center">
            <Briefcase className="w-16 h-16 text-muted mb-6" />
            <h3 className="text-xl font-display text-white font-medium mb-2">No jobs found</h3>
            <p className="text-paper-dim max-w-md mx-auto">
              We couldn't find any jobs matching your current filters. Try adjusting them or check back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <Link 
                to={`/jobs/${job._id}`} 
                key={job._id}
                className="glass-panel-hover p-7 rounded-2xl flex flex-col h-full relative overflow-hidden group"
              >
                {/* Subtle gradient flash on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-copper/0 to-copper/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-5">
                    {renderStatusBadge(job.status)}
                    <span className="text-2xl font-bold text-copper-bright font-mono">
                      ${job.budget}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-semibold text-white mb-3 line-clamp-1 group-hover:text-copper transition-colors">
                    {job.title}
                  </h3>
                  
                  <p className="text-paper-dim text-sm line-clamp-2 mb-6 flex-grow">
                    {job.description}
                  </p>

                  <div className="space-y-3 pt-5 border-t border-white/10 mt-auto">
                    <div className="flex items-center text-sm text-muted">
                      <Briefcase className="w-4 h-4 mr-3 text-blue-bright" />
                      {job.category}
                    </div>
                    <div className="flex items-center text-sm text-muted">
                      <MapPin className="w-4 h-4 mr-3 text-copper-bright" />
                      {job.location?.address || 'Location specified'}
                    </div>
                    <div className="flex items-center text-sm text-muted">
                      <Clock className="w-4 h-4 mr-3 text-blue-bright" />
                      Urgency: <span className="ml-1 capitalize text-paper-dim">{job.urgency}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-copper group-hover:text-graphite text-white transition-all duration-300">
                      <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobBoard;
