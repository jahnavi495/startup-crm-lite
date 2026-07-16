import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DarkModeToggle from '../components/common/DarkModeToggle';
import ShimmerButton from '../components/common/ShimmerButton';
import { 
  Mail, 
  Lock, 
  LogIn, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  CheckCircle2,
  Users,
  TrendingUp,
  MessageCircle,
  Award,
  Star
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import Logo from '../components/common/Logo';
import useDocumentMetadata from '../hooks/useDocumentMetadata';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useDocumentMetadata(
    'Sign In | StartupCRM',
    'Sign in to your StartupCRM workspace to manage your sales funnel, contact database, and team activity.'
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      toast.success('Welcome back to your workspace!', {
        style: {
          background: '#22C55E',
          color: '#FFFFFF',
          fontWeight: 'bold',
        },
        duration: 3000,
      });
      navigate('/dashboard');
    } catch (err) {
      let errorMsg = 'Login failed.';
      if (err.response?.data?.errors && Array.isArray(err.response.data.errors)) {
        errorMsg = err.response.data.errors.map((e) => e.message).join(', ');
      } else if (err.response?.data?.message) {
        errorMsg = err.response.data.message;
      } else if (err.message) {
        errorMsg = err.message;
      }

      setError(errorMsg);
      toast.error(errorMsg, {
        style: {
          background: '#EF4444',
          color: '#FFFFFF',
          fontWeight: 'bold',
        },
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-gradient-to-tr from-border/50 via-bg to-border dark:from-bg dark:via-surface dark:to-card relative overflow-x-hidden transition-colors duration-200 justify-center items-center">
      
      {/* USER ACTION AREA - Centered on page */}
      <div className="w-full max-w-md p-4 sm:p-6 lg:p-8 relative">
        
        {/* Dark / Light Toggle */}
        <div className="fixed top-6 right-6 z-50">
          <DarkModeToggle />
        </div>

        {/* Ambient glows */}
        <div className="absolute top-1/6 right-1/6 w-96 h-96 rounded-full bg-blue-300/20 dark:bg-blue-600/10 blur-[120px] pointer-events-none animate-float-slow -z-10" />
        <div className="absolute bottom-1/6 left-1/6 w-96 h-96 rounded-full bg-purple-300/15 dark:bg-purple-600/8 blur-[120px] pointer-events-none animate-float-reverse -z-10" />

        {/* Login frosted glass card */}
        <div className="w-full glass-card p-6 sm:p-8 rounded-3xl shadow-2xl relative z-10 my-auto animate-fade-in">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-6 select-none">
            <div className="w-12 h-12 mb-3 flex items-center justify-center">
              <Logo className="w-11 h-11 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Welcome back
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Sign in to manage your CRM and track daily sales touchpoints.
            </p>
          </div>

          {/* Inline alert */}
          {error && (
            <div className="flex items-start gap-2.5 p-3.5 bg-red-50/50 dark:bg-red-950/20 border border-red-200/40 dark:border-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-xs mb-6 animate-fade-in text-left">
              <AlertCircle size={15} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div className="space-y-1">
              <label htmlFor="email" className="block text-[9px] font-extrabold uppercase tracking-wider text-slate-450 dark:text-slate-300">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 dark:text-slate-500 z-10 pointer-events-none">
                  <Mail size={15} />
                </span>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10.5 pr-4 py-2.5 text-xs rounded-xl glass-input text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="block text-[9px] font-extrabold uppercase tracking-wider text-slate-450 dark:text-slate-300">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 dark:text-slate-500 z-10 pointer-events-none">
                  <Lock size={15} />
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10.5 pr-10 py-2.5 text-xs rounded-xl glass-input text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-650 dark:text-slate-500 dark:hover:text-slate-300 focus:outline-hidden cursor-pointer z-10"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>



            <ShimmerButton
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 border border-blue-400/20 shadow-md"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn size={15} />
                  <span>Sign In</span>
                </>
              )}
            </ShimmerButton>
          </form>



          {/* Link to register page */}
          <div className="mt-6 text-center text-xs">
            <span className="text-slate-500">New workspace team? </span>
            <Link to="/register" className="font-bold text-primary hover:underline">
              Create Account
            </Link>
          </div>



        </div>
      </div>

    </div>
  );
};

export default Login;
