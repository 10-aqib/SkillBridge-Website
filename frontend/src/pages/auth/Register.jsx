import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserPlus, AlertCircle } from 'lucide-react';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['customer', 'worker']),
});

const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [authError, setAuthError] = useState('');

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'customer'
    }
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleParam = params.get('role');
    if (roleParam === 'worker') {
      setValue('role', 'worker');
    }
  }, [location, setValue]);

  const onSubmit = async (data) => {
    try {
      setAuthError('');
      await registerUser(data.name, data.email, data.password, data.role);
      navigate(data.role === 'worker' ? '/profile/setup' : '/dashboard');
    } catch (error) {
      setAuthError(error.response?.data?.message || 'Failed to register. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-graphite relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-20 z-0"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none z-0"></div>

      <div className="w-full max-w-md z-10">
        <div className="glass-panel p-10 rounded-2xl">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow-blue">
              <UserPlus className="w-8 h-8 text-blue-bright" />
            </div>
            <h2 className="font-display text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-paper-dim text-sm">Join SkillBridge to get started</p>
          </div>

          {authError && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl flex items-start gap-3 mb-8 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-paper-dim mb-2">Full Name</label>
              <input
                {...register('name')}
                type="text"
                className={`w-full bg-graphite-2/50 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3.5 text-white placeholder:text-muted focus:outline-none focus:border-blue-bright focus:ring-1 focus:ring-blue-bright transition-colors`}
                placeholder="John Doe"
              />
              {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-paper-dim mb-2">Email Address</label>
              <input
                {...register('email')}
                type="email"
                className={`w-full bg-graphite-2/50 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3.5 text-white placeholder:text-muted focus:outline-none focus:border-blue-bright focus:ring-1 focus:ring-blue-bright transition-colors`}
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-paper-dim mb-2">Password</label>
              <input
                {...register('password')}
                type="password"
                className={`w-full bg-graphite-2/50 border ${errors.password ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3.5 text-white placeholder:text-muted focus:outline-none focus:border-blue-bright focus:ring-1 focus:ring-blue-bright transition-colors`}
                placeholder="••••••••"
              />
              {errors.password && <p className="mt-2 text-sm text-red-400">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-paper-dim mb-3">I want to...</label>
              <div className="grid grid-cols-2 gap-3">
                <label className="relative flex cursor-pointer rounded-xl border border-white/10 bg-white/5 p-4 focus:outline-none has-[:checked]:bg-blue/20 has-[:checked]:border-blue-bright has-[:checked]:shadow-glow-blue transition-all">
                  <input type="radio" {...register('role')} value="customer" className="sr-only" />
                  <span className="font-medium text-sm text-center w-full text-white">Hire workers</span>
                </label>
                <label className="relative flex cursor-pointer rounded-xl border border-white/10 bg-white/5 p-4 focus:outline-none has-[:checked]:bg-copper/20 has-[:checked]:border-copper-bright has-[:checked]:shadow-glow transition-all">
                  <input type="radio" {...register('role')} value="worker" className="sr-only" />
                  <span className="font-medium text-sm text-center w-full text-white">Find work</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-4 px-4 mt-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-graphite bg-gradient-to-r from-blue-bright to-blue hover:shadow-glow-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue disabled:opacity-70 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              {isSubmitting ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-paper-dim">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-bright hover:text-blue transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
