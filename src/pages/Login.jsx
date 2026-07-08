import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

/**
 * Login Page Component
 * Renders a premium, secure login interface using Tailwind CSS.
 * Provides credentials authentication and displays error messages from the API.
 */
const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login(email, password);
      toast.success('Logged in successfully!', {
        style: { background: '#22C55E', color: '#FFFFFF', fontWeight: 'bold' }
      });
      navigate('/');
    } catch (err) {
      console.error('Login submit error:', err);
      const serverMsg = err.response?.data?.message || 'Invalid email or password.';
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
        {/* Logo and Greeting Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-blue-550/10 dark:bg-blue-500/20 text-primary mb-4 shadow-xs">
            <LogIn className="h-6 w-6" />
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Startup CRM Lite</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Sign in to access your sales opportunities pipeline.
          </p>
        </div>

        {/* Login Card Panel */}
        <div className="bg-white dark:bg-[#1C1C1C] border border-slate-100 dark:border-slate-800/40 rounded-3xl p-8 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
          {error && (
            <div className="mb-6 flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 text-xs sm:text-sm text-red-650 dark:text-red-400 animate-shake">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Authentication failure</p>
                <p className="mt-0.5 opacity-90">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
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
                  placeholder="admin@auracrm.com"
                  className="block w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white transition-all duration-150"
                />
              </div>
            </div>

            {/* Password Field */}
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
                  placeholder="password123"
                  className="block w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white transition-all duration-150"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center justify-center gap-2 w-full mt-4 px-4 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-xs cursor-pointer transition-all duration-150 active:scale-98 focus:outline-hidden disabled:opacity-60 disabled:pointer-events-none"
            >
              {submitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In</span>
                  <LogIn size={16} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Navigation Link */}
        <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          Don't have an account yet?{' '}
          <Link
            to="/register"
            className="font-semibold text-primary hover:underline hover:text-blue-600 dark:hover:text-blue-400"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
