import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import workerService from '../../services/workerService';
import ReviewList from '../../components/reviews/ReviewList';
import { MapPin, Star, Wrench, CheckCircle, Clock, ShieldCheck, Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const WorkerProfile = () => {
  const { id } = useParams(); // Worker ID
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        // If no ID is provided, try to fetch the logged-in user's profile
        const profileId = id || 'me'; 
        const data = await workerService.getWorkerProfile(profileId);
        setProfile(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load profile.');
        if (err.response?.status === 404 && !id && user?.role === 'worker') {
           navigate('/profile/setup');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id, user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-graphite flex justify-center pt-32">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-copper"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-graphite flex justify-center pt-32 px-4">
        <div className="glass-panel p-8 rounded-2xl max-w-md w-full text-center">
          <p className="text-xl text-white mb-4">{error || 'Profile not found'}</p>
          <button onClick={() => navigate(-1)} className="text-copper-bright hover:underline font-medium">
            &larr; Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-graphite relative pb-20">
      <div className="absolute inset-0 grid-bg opacity-10 z-0 pointer-events-none"></div>
      
      {/* Banner */}
      <div className="h-64 bg-gradient-to-r from-graphite-2 via-copper/10 to-graphite-2 relative z-0">
        <div className="absolute inset-0 bg-graphite/40 backdrop-blur-[2px]"></div>
      </div>

      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Avatar & Quick Info */}
          <div className="lg:col-span-1">
            <div className="glass-panel p-8 rounded-2xl text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-copper/20 rounded-full blur-[60px] pointer-events-none"></div>
              
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-graphite-2 to-graphite rounded-full border-4 border-copper flex items-center justify-center text-4xl font-display text-white mb-6 shadow-glow relative z-10">
                {profile.user.name.charAt(0).toUpperCase()}
              </div>
              
              <h1 className="font-display text-2xl font-bold text-white mb-1 relative z-10">{profile.user.name}</h1>
              <p className="text-copper-bright font-medium mb-4 relative z-10">{profile.professionalTitle}</p>
              
              <div className="flex items-center justify-center gap-1 text-amber-400 mb-6 relative z-10">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-bold text-lg text-white ml-1">{profile.rating?.toFixed(1) || 'New'}</span>
                <span className="text-muted text-sm ml-1">({profile.numReviews} reviews)</span>
              </div>

              {profile.verificationStatus === 'verified' && (
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-full text-sm font-semibold relative z-10 mb-6">
                  <ShieldCheck className="w-4 h-4" /> ID Verified
                </div>
              )}

              <div className="border-t border-white/10 pt-6 space-y-4 text-left relative z-10">
                <div className="flex items-center text-paper-dim">
                  <MapPin className="w-5 h-5 text-muted mr-3" />
                  <span className="text-sm">{profile.location?.address || 'Location hidden'}</span>
                </div>
                <div className="flex items-center text-paper-dim">
                  <Clock className="w-5 h-5 text-muted mr-3" />
                  <span className="text-sm">{profile.experienceYears} Years Experience</span>
                </div>
                <div className="flex items-center text-paper-dim">
                  <Wrench className="w-5 h-5 text-muted mr-3" />
                  <span className="text-sm">${profile.hourlyRate} / hour</span>
                </div>
              </div>

              {user?._id !== profile.user._id && (
                <button className="w-full mt-8 bg-gradient-to-r from-copper to-copper-bright text-graphite font-bold py-3 px-4 rounded-xl shadow-glow hover:-translate-y-0.5 transition-all relative z-10 flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" /> Contact Worker
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Details & Reviews */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-panel p-8 sm:p-10 rounded-2xl">
              <h2 className="font-display text-2xl font-bold text-white mb-4">About Me</h2>
              <p className="text-paper-dim leading-relaxed whitespace-pre-wrap">{profile.bio}</p>
            </div>

            <div className="glass-panel p-8 sm:p-10 rounded-2xl">
              <h2 className="font-display text-2xl font-bold text-white mb-6">Skills & Expertise</h2>
              <div className="flex flex-wrap gap-2 mb-8">
                {profile.categories.map((cat, index) => (
                  <span key={index} className="bg-blue/10 border border-blue/30 text-blue-bright px-4 py-1.5 rounded-full text-sm font-medium">
                    {cat}
                  </span>
                ))}
              </div>
              
              {profile.skills && profile.skills.length > 0 && (
                <>
                  <h3 className="font-medium text-paper-dim mb-4 text-sm uppercase tracking-wider">Specific Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <span key={index} className="bg-graphite-2 border border-white/10 text-paper px-3 py-1 rounded-md text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="glass-panel p-8 sm:p-10 rounded-2xl">
              <h2 className="font-display text-2xl font-bold text-white mb-6 flex items-center gap-2">
                Client Reviews <span className="bg-white/10 text-paper-dim text-xs py-1 px-3 rounded-full font-mono">{profile.reviews?.length || 0}</span>
              </h2>
              <ReviewList reviews={profile.reviews || []} />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;
