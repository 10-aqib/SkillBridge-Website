import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogIn, AlertCircle } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [authError, setAuthError] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const from = location.state?.from?.pathname || '/dashboard';

  const onSubmit = async (data) => {
    try {
      setAuthError('');
      await login(data.email, data.password);
      navigate(from, { replace: true });
    } catch (error) {
      setAuthError(error.response?.data?.message || 'Failed to log in. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-graphite relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-20 z-0"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-copper/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none z-0"></div>

      <div className="w-full max-w-md z-10">
        <div className="glass-panel p-10 rounded-2xl">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow">
              <LogIn className="w-8 h-8 text-copper-bright" />
            </div>
            <h2 className="font-display text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-paper-dim text-sm">Sign in to your SkillBridge account</p>
          </div>

          {authError && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl flex items-start gap-3 mb-8 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-paper-dim mb-2">Email Address</label>
              <input
                {...register('email')}
                type="email"
                className={`w-full bg-graphite-2/50 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3.5 text-white placeholder:text-muted focus:outline-none focus:border-copper focus:ring-1 focus:ring-copper transition-colors`}
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-paper-dim mb-2">Password</label>
              <input
                {...register('password')}
                type="password"
                className={`w-full bg-graphite-2/50 border ${errors.password ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3.5 text-white placeholder:text-muted focus:outline-none focus:border-copper focus:ring-1 focus:ring-copper transition-colors`}
                placeholder="••••••••"
              />
              {errors.password && <p className="mt-2 text-sm text-red-400">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-graphite bg-gradient-to-r from-copper to-copper-bright hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-copper disabled:opacity-70 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-paper-dim">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-copper-bright hover:text-copper transition-colors">
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
