import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

export default function Auth() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const { signIn, signUp } = useAuth();
  const [, navigate] = useLocation();

  const handleSubmit = async () => {
    setError(null);
    setSuccess(null);
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    if (mode === 'signup' && !fullName) { setError('Please enter your full name.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    if (mode === 'signin') {
      const { error } = await signIn(email, password);
      if (error) { setError(error); setLoading(false); return; }
      navigate('/account');
    } else {
      const { error } = await signUp(email, password, fullName);
      if (error) { setError(error); setLoading(false); return; }
      setSuccess('Account created! Check your email to confirm, then sign in.');
      setMode('signin');
    }
    setLoading(false);
  };

  const inputClass = "w-full bg-transparent border border-border px-4 py-4 text-foreground text-sm tracking-widest uppercase outline-none focus:border-white transition-colors placeholder:text-muted-foreground placeholder:normal-case placeholder:tracking-normal";

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <h1 className="font-bebas text-7xl tracking-wider mb-2">
          {mode === 'signin' ? 'SIGN IN' : 'CREATE ACCOUNT'}
        </h1>
        <p className="text-muted-foreground text-sm tracking-widest uppercase mb-12" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {mode === 'signin' ? 'Welcome back to VINTRIX' : 'Join the VINTRIX community'}
        </p>

        <div className="flex flex-col gap-4">
          {mode === 'signup' && (
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className={inputClass}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            />
          )}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={inputClass}
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={inputClass + ' pr-12'}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && (
            <p className="text-red-400 text-xs tracking-widest uppercase" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {error}
            </p>
          )}
          {success && (
            <p className="text-green-400 text-xs tracking-widest uppercase" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {success}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-white text-black font-bebas text-3xl tracking-widest py-5 hover:bg-black hover:text-white border border-white transition-colors disabled:opacity-50 mt-4"
          >
            {loading ? 'PLEASE WAIT...' : mode === 'signin' ? 'SIGN IN' : 'CREATE ACCOUNT'}
          </button>

          <div className="text-center mt-4">
            <button
              onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(null); setSuccess(null); }}
              className="text-muted-foreground text-xs tracking-widest uppercase hover:text-white transition-colors"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {mode === 'signin' ? "DON'T HAVE AN ACCOUNT? CREATE ONE" : 'ALREADY HAVE AN ACCOUNT? SIGN IN'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
