import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    setServerError('');
    try {
      const res = await login(data);
      if (res.success) {
        navigate(res.data.role === 'admin' ? '/admin' : '/dashboard');
      }
    } catch (error) {
      setServerError(error.response?.data?.message || 'Failed to login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md bg-[#26221d] border border-white/10 p-8">
        <div className="text-center mb-8">
          <h1 className="font-display font-bold text-3xl text-[#ede7dc] mb-2">Welcome Back</h1>
          <p className="text-[#8c8375] text-sm">Login to your SkillBridge account</p>
        </div>

        {serverError && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 mb-6 text-sm font-mono rounded-sm">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block font-mono text-xs text-[#8c8375] mb-1.5 uppercase tracking-wider">Email</label>
            <input
              type="email"
              {...register('email')}
              className="w-full bg-[#1c1a17] border border-white/10 p-3 text-[#ede7dc] focus:outline-none focus:border-[#c9793b] transition-colors rounded-sm"
              placeholder="name@example.com"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block font-mono text-xs text-[#8c8375] uppercase tracking-wider">Password</label>
              <Link to="/forgot-password" className="text-xs text-[#4a8a90] hover:text-[#2f5d62]">Forgot?</Link>
            </div>
            <input
              type="password"
              {...register('password')}
              className="w-full bg-[#1c1a17] border border-white/10 p-3 text-[#ede7dc] focus:outline-none focus:border-[#c9793b] transition-colors rounded-sm"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#c9793b] text-[#1c1a17] font-semibold py-3.5 mt-2 rounded-sm hover:bg-[#e2934f] transition-colors flex justify-center items-center gap-2"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Login'}
          </button>
        </form>

        <p className="text-center text-[#8c8375] text-sm mt-8">
          Don't have an account? <Link to="/register" className="text-[#c9793b] hover:text-[#e2934f]">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
