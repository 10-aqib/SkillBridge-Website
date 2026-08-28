import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import jobService from '../../services/jobService';
import { Filter, Loader2, MapPin, Clock } from 'lucide-react';

const CATEGORIES = [
  'All', 'Electrician', 'Plumber', 'Carpenter', 'Painter', 
  'Mason', 'HVAC', 'Appliance Repair', 'Mechanic', 'Cleaner', 'Other'
];

const JobsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const initialCategory = searchParams.get('category') || 'All';
  const initialSort = searchParams.get('sort') || 'newest';
  
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sort, setSort] = useState(initialSort);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError('');
      try {
        const queryParams = {};
        if (activeCategory !== 'All') queryParams.category = activeCategory;
        if (sort !== 'newest') queryParams.sort = sort;
        
        const res = await jobService.getJobs(queryParams);
        if (res.success) {
          setJobs(res.data);
        }
      } catch (err) {
        setError('Failed to fetch jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, [activeCategory, sort]);

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    const newParams = new URLSearchParams(searchParams);
    if (cat === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', cat);
    }
    setSearchParams(newParams);
  };

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSort(newSort);
    const newParams = new URLSearchParams(searchParams);
    if (newSort === 'newest') {
      newParams.delete('sort');
    } else {
      newParams.set('sort', newSort);
    }
    setSearchParams(newParams);
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'emergency': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-[#c9793b]/20 text-[#c9793b] border-[#c9793b]/30';
      case 'medium': return 'bg-[#4a8a90]/20 text-[#4a8a90] border-[#4a8a90]/30';
      case 'low': return 'bg-white/5 text-[#8c8375] border-white/10';
      default: return 'bg-white/5 text-[#8c8375] border-white/10';
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="font-display font-bold text-4xl text-[#ede7dc] mb-4">Find Jobs</h1>
        <p className="text-[#8c8375] max-w-2xl">Browse open requests from customers in your area and submit your quotes.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-64 shrink-0 space-y-6">
          <div className="bg-[#26221d] border border-white/5 p-4">
            <label className="block font-mono text-xs text-[#8c8375] mb-2 uppercase tracking-wider">Sort By</label>
            <select
              value={sort}
              onChange={handleSortChange}
              className="w-full bg-[#1c1a17] border border-white/10 p-2 text-sm text-[#ede7dc] focus:outline-none focus:border-[#c9793b] transition-colors appearance-none"
            >
              <option value="newest">Newest First</option>
              <option value="budget_desc">Highest Budget</option>
              <option value="budget_asc">Lowest Budget</option>
            </select>
          </div>

          <div className="bg-[#26221d] border border-white/5 p-4">
            <div className="flex items-center gap-2 mb-4 font-mono text-xs text-[#8c8375] uppercase tracking-wider">
              <Filter className="w-3 h-3" /> Categories
            </div>
            <div className="space-y-1">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`block w-full text-left px-3 py-2 text-sm transition-colors ${activeCategory === cat ? 'bg-[#c9793b] text-[#1c1a17] font-semibold' : 'text-[#d8d0c0] hover:bg-[#1c1a17]'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="flex-1 w-full">
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
              <p className="text-[#8c8375] mb-4">No open jobs found matching your criteria.</p>
              <button 
                onClick={() => { setActiveCategory('All'); setSort('newest'); }}
                className="text-[#c9793b] font-mono text-sm underline hover:text-[#e2934f]"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {jobs.map(job => (
                <div key={job._id} className="bg-[#26221d] border border-white/5 p-6 hover:border-[#c9793b]/50 transition-colors flex flex-col group">
                  <div className="flex justify-between items-start mb-3">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#8c8375]">{job.category}</span>
                    <span className={`font-mono text-xs uppercase tracking-wider px-2 py-0.5 border ${getUrgencyColor(job.urgency)}`}>
                      {job.urgency}
                    </span>
                  </div>
                  
                  <h3 className="text-[#ede7dc] font-display font-bold text-lg mb-2 line-clamp-2 group-hover:text-[#c9793b] transition-colors">
                    <Link to={`/jobs/${job._id}`}>{job.title}</Link>
                  </h3>
                  
                  <p className="text-[#8c8375] text-sm line-clamp-3 mb-4 flex-1">
                    {job.description}
                  </p>

                  <div className="space-y-1.5 mb-5">
                    <div className="flex items-center gap-2 text-[#8c8375] text-sm">
                      <MapPin className="w-4 h-4 shrink-0" />
                      <span className="truncate">{job.location?.city || 'Local Area'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#8c8375] text-sm">
                      <Clock className="w-4 h-4 shrink-0" />
                      <span className="truncate">Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="font-mono text-[#ede7dc] font-bold">
                      ${job.budget} <span className="text-[#8c8375] text-xs font-normal">Est. Budget</span>
                    </div>
                    <Link 
                      to={`/jobs/${job._id}`}
                      className="text-sm font-semibold text-[#1c1a17] bg-[#ede7dc] px-4 py-2 hover:bg-[#c9793b] transition-colors"
                    >
                      View Job
                    </Link>
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

export default JobsList;
