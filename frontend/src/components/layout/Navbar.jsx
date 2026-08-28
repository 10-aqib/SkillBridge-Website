import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-gradient-to-b from-[#1c1a17]/95 to-transparent backdrop-blur-sm border-b border-white/5">
      <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl tracking-tight">
        <span className="relative w-[26px] h-[26px] border-[1.5px] border-[#c9793b] rounded-[3px] flex items-center justify-center">
          <span className="absolute w-[1.5px] h-[14px] bg-[#c9793b]"></span>
          <span className="absolute w-[14px] h-[1.5px] bg-[#c9793b]"></span>
        </span>
        SkillBridge
      </Link>
      <div className="hidden md:flex gap-9 text-sm text-[#d8d0c0]">
        <Link to="/#how" className="hover:text-[#e2934f] transition-colors">How it works</Link>
        <Link to="/#trades" className="hover:text-[#e2934f] transition-colors">Trades</Link>
        <Link to="/#for-workers" className="hover:text-[#e2934f] transition-colors">For workers</Link>
      </div>
      
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            <Link 
              to={user.role === 'worker' ? '/worker/dashboard' : user.role === 'admin' ? '/admin' : '/dashboard'} 
              className="text-[#d8d0c0] hover:text-[#ede7dc] flex items-center gap-2 text-sm"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">{user.name}</span>
            </Link>
            <button 
              onClick={handleLogout}
              className="text-[#8c8375] hover:text-[#e2934f] p-2"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login" className="hidden sm:block text-sm text-[#d8d0c0] hover:text-[#ede7dc]">
              Login
            </Link>
            <Link to="/register" className="font-mono text-xs tracking-wider border border-[#c9793b] text-[#e2934f] px-4 py-2 rounded-sm hover:bg-[#c9793b] hover:text-[#1c1a17] transition-all">
              GET STARTED →
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
