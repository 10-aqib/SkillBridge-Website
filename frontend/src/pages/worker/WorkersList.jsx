import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import workerService from '../../services/workerService';
import WorkerCard from '../../components/worker/WorkerCard';
import { Search, Filter, Loader2 } from 'lucide-react';

const CATEGORIES = [
  'All', 'Electrician', 'Plumber', 'Carpenter', 'Painter', 
  'Mason', 'HVAC', 'Appliance Repair', 'Mechanic', 'Cleaner'
];

const WorkersList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const initialCategory = searchParams.get('category') || 'All';
  const initialKeyword = searchParams.get('keyword') || '';
  
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [keyword, setKeyword] = useState(initialKeyword);

  useEffect(() => {
    const fetchWorkers = async () => {
      setLoading(true);
      setError('');
      try {
        const queryParams = {};
        if (activeCategory !== 'All') queryParams.category = activeCategory;
        if (keyword) queryParams.keyword = keyword;
        
        const res = await workerService.getWorkers(queryParams);
        if (res.success) {
          setWorkers(res.data);
        }
      } catch (err) {
        setError('Failed to fetch workers. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchWorkers();
  }, [activeCategory, keyword]);

  const handleSearch = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams();
    if (activeCategory !== 'All') newParams.set('category', activeCategory);
    if (keyword) newParams.set('keyword', keyword);
    setSearchParams(newParams);
  };

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

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="font-display font-bold text-4xl text-[#ede7dc] mb-4">Find Skilled Professionals</h1>
        <p className="text-[#8c8375] max-w-2xl">Browse our network of verified tradespeople. Filter by category or search for specific skills to find the perfect match for your project.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-64 shrink-0 space-y-6">
          <form onSubmit={handleSearch} className="bg-[#26221d] border border-white/5 p-4">
            <label className="block font-mono text-xs text-[#8c8375] mb-2 uppercase tracking-wider">Search</label>
            <div className="relative">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Skills, names..."
                className="w-full bg-[#1c1a17] border border-white/10 p-2.5 pl-9 text-sm text-[#ede7dc] focus:outline-none focus:border-[#c9793b] transition-colors"
              />
              <Search className="w-4 h-4 text-[#8c8375] absolute left-3 top-3" />
            </div>
            <button type="submit" className="w-full mt-3 bg-[#1c1a17] text-[#c9793b] border border-[#c9793b]/30 py-2 text-sm font-semibold hover:bg-[#c9793b] hover:text-[#1c1a17] transition-colors">
              Apply
            </button>
          </form>

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
          ) : workers.length === 0 ? (
            <div className="bg-[#26221d] border border-white/5 p-12 text-center">
              <p className="text-[#8c8375] mb-4">No workers found matching your criteria.</p>
              <button 
                onClick={() => { setActiveCategory('All'); setKeyword(''); }}
                className="text-[#c9793b] font-mono text-sm underline hover:text-[#e2934f]"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {workers.map(worker => (
                <WorkerCard key={worker._id} worker={worker} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkersList;
