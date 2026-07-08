import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, UserPlus, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

/**
 * Register Page Component
 * Renders a premium signup interface.
 * Implements client-side checks for password length and confirmations,
 * and handles registration API requests.
 */
const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 1. Password length validation
    if (password.length < 6) {
      const msg = 'Password must be at least 6 characters long.';
      setError(msg);
      toast.error(msg, {
        style: { background: '#EF4444', color: '#FFFFFF', fontWeight: 'bold' }
      });
      return;
    }

    // 2. Password matching validation
    if (password !== confirmPassword) {
      const msg = 'Passwords do not match.';
      setError(msg);
      toast.error(msg, {
        style: { background: '#EF4444', color: '#FFFFFF', fontWeight: 'bold' }
      });
      return;
    }

    setSubmitting(true);
    try {
      await register(name, email, password);
      toast.success('Registration completed! Welcome to CRM Lite.', {
        style: { background: '#22C55E', color: '#FFFFFF', fontWeight: 'bold' }
      });
      navigate('/');
    } catch (err) {
      console.error('Registration submit error:', err);
      const serverMsg = err.response?.data?.message || 'Email is already registered or invalid.';
      setError(serverMsg);
      toast.error(serverMsg, {
        style: { background: '#EF4444', color: '#FFFFFF', fontWeight: 'bold' }
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 overflow-hidden py-12">
      {/* Floating glowing background mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10">
        <div className="absolute -top-20 -left-20 w-[450px] h-[450px] rounded-full bg-primary/8 dark:bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-[450px] h-[450px] rounded-full bg-blue-500/8 dark:bg-blue-500/5 blur-3xl" />
      </div>

      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-blue-550/10 dark:bg-blue-500/20 text-primary mb-4 shadow-xs">
            <UserPlus className="h-6 w-6" />
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Startup CRM Lite</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Start tracking opportunities and pipelines.
          </p>
        </div>

        {/* Register Card Panel */}
        <div className="bg-white dark:bg-[#1C1C1C] border border-slate-100 dark:border-slate-800/40 rounded-3xl p-8 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
          {error && (
            <div className="mb-6 flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 text-xs sm:text-sm text-red-650 dark:text-red-400 animate-shake">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Validation error</p>
                <p className="mt-0.5 opacity-90">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                  <User size={17} />
                </span>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="block w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white transition-all duration-150"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                  <Mail size={17} />
                </span>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john.doe@example.com"
                  className="block w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white transition-all duration-150"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                  <Lock size={17} />
                </span>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white transition-all duration-150"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                  <Lock size={17} />
                </span>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white transition-all duration-150"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center justify-center gap-2 w-full mt-6 px-4 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-xs cursor-pointer transition-all duration-150 active:scale-98 focus:outline-hidden disabled:opacity-60 disabled:pointer-events-none"
            >
              {submitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Create Account</span>
                  <UserPlus size={16} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Link */}
        <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-primary hover:underline hover:text-blue-600 dark:hover:text-blue-400"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
