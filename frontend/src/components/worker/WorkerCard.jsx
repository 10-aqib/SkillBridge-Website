import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Wrench } from 'lucide-react';

const WorkerCard = ({ worker }) => {
  return (
    <div className="bg-[#26221d] border border-white/5 p-6 hover:border-[#c9793b]/50 transition-colors group">
      <div className="flex items-start gap-4">
        {/* Profile Image (Placeholder if null) */}
        <div className="w-16 h-16 bg-[#1c1a17] border border-white/10 shrink-0 overflow-hidden">
          {worker.user?.profileImage && worker.user.profileImage !== 'default.jpg' ? (
            <img src={worker.user.profileImage} alt={worker.user.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#8c8375] font-mono text-xl">
              {worker.user?.name?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-[#ede7dc] font-display font-bold text-lg truncate group-hover:text-[#c9793b] transition-colors">
              <Link to={`/worker/${worker._id}`}>{worker.user?.name}</Link>
            </h3>
            <div className="flex items-center gap-1 text-[#e2934f] shrink-0">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-mono text-sm">{worker.rating > 0 ? worker.rating.toFixed(1) : 'New'}</span>
            </div>
          </div>
          
          <p className="text-[#c9793b] font-mono text-xs tracking-wider uppercase mb-2 truncate">
            {worker.professionalTitle}
          </p>

          <div className="space-y-1.5 mb-4">
            <div className="flex items-center gap-2 text-[#8c8375] text-sm">
              <MapPin className="w-4 h-4 shrink-0" />
              <span className="truncate">{worker.location?.city || 'Local Area'}</span>
            </div>
            <div className="flex items-center gap-2 text-[#8c8375] text-sm">
              <Wrench className="w-4 h-4 shrink-0" />
              <span className="truncate">{worker.experienceYears} Years Experience</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-5">
            {worker.categories.slice(0, 3).map((cat, idx) => (
              <span key={idx} className="bg-[#1c1a17] text-[#4a8a90] text-xs px-2 py-1 border border-white/5">
                {cat}
              </span>
            ))}
            {worker.categories.length > 3 && (
              <span className="bg-[#1c1a17] text-[#8c8375] text-xs px-2 py-1 border border-white/5">
                +{worker.categories.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="font-mono text-[#ede7dc]">
          ${worker.hourlyRate}<span className="text-[#8c8375] text-sm">/hr</span>
        </div>
        <Link 
          to={`/worker/${worker._id}`}
          className="text-sm font-semibold text-[#1c1a17] bg-[#ede7dc] px-4 py-2 hover:bg-[#c9793b] transition-colors"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default WorkerCard;
