import React, { useState, useContext } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const Register = () => {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') === 'worker' ? 'worker' : 'customer';
  const [role, setRole] = useState(initialRole);
  
  const { register: authRegister } = useContext(AuthContext);
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data) => {
    setServerError('');
    try {
      const res = await authRegister({ ...data, role });
      if (res.success) {
        navigate(res.data.role === 'worker' ? '/worker/profile/setup' : '/dashboard');
      }
    } catch (error) {
      setServerError(error.response?.data?.message || 'Failed to register');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-12">
      <div className="w-full max-w-md bg-[#26221d] border border-white/10 p-8">
        <div className="text-center mb-8">
          <h1 className="font-display font-bold text-3xl text-[#ede7dc] mb-2">Create Account</h1>
          <p className="text-[#8c8375] text-sm">Join SkillBridge today</p>
        </div>

        <div className="flex gap-2 mb-8 bg-[#1c1a17] p-1 rounded-sm border border-white/5">
          <button 
            type="button"
            onClick={() => setRole('customer')}
            className={`flex-1 py-2 text-sm font-mono tracking-wider transition-colors rounded-sm ${role === 'customer' ? 'bg-[#c9793b] text-[#1c1a17]' : 'text-[#8c8375] hover:text-[#ede7dc]'}`}
          >
            CUSTOMER
          </button>
          <button 
            type="button"
            onClick={() => setRole('worker')}
            className={`flex-1 py-2 text-sm font-mono tracking-wider transition-colors rounded-sm ${role === 'worker' ? 'bg-[#c9793b] text-[#1c1a17]' : 'text-[#8c8375] hover:text-[#ede7dc]'}`}
          >
            TRADESPERSON
          </button>
        </div>

        {serverError && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 mb-6 text-sm font-mono rounded-sm">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block font-mono text-xs text-[#8c8375] mb-1.5 uppercase tracking-wider">Full Name</label>
            <input
              type="text"
              {...register('name')}
              className="w-full bg-[#1c1a17] border border-white/10 p-3 text-[#ede7dc] focus:outline-none focus:border-[#c9793b] transition-colors rounded-sm"
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
          </div>

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
            <label className="block font-mono text-xs text-[#8c8375] mb-1.5 uppercase tracking-wider">Password</label>
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
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-[#8c8375] text-sm mt-8">
          Already have an account? <Link to="/login" className="text-[#c9793b] hover:text-[#e2934f]">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
