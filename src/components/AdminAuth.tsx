import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase, ADMIN_WHITELIST } from '../lib/supabase';
import { Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react';

interface AdminAuthProps {
  onLogin: (user: any) => void;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetMessage, setResetMessage] = useState('');
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        onLogin(user);
      }
    };
    checkUser();
  }, [onLogin]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const debugLog = (message: string) => {
        console.log(message);
        setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
      };

      debugLog(`Attempting login with: ${email}`);
      
      // Test Supabase connection first
      const { data: testData, error: testError } = await supabase
        .from('admin_users')
        .select('count')
        .limit(1);
      
      if (testError) {
        debugLog(`❌ Supabase connection error: ${testError.message}`);
        setError('Database connection error. Please check your internet connection.');
        setLoading(false);
        return;
      }

      debugLog('✅ Supabase connection OK');

      // Sign in
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      debugLog(`Login response: ${JSON.stringify({ data: data?.user?.email, error: error?.message })}`);

      if (error) {
        debugLog(`❌ Login error: ${error.message}`);
        throw error;
      }

      if (data.user) {
        debugLog(`✅ User authenticated: ${data.user.email}`);
        
        // Check if user is approved admin
        const { data: adminData, error: adminError } = await supabase
          .from('admin_users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        debugLog(`Admin profile check: ${JSON.stringify({ adminData: adminData?.email, adminError: adminError?.message })}`);

        if (adminError || !adminData) {
          // If admin profile doesn't exist but email is whitelisted, create it
          if (ADMIN_WHITELIST.includes(email.toLowerCase())) {
            debugLog('Creating admin profile for whitelisted email');
            
            const { error: createError } = await supabase
              .from('admin_users')
              .insert([
                {
                  id: data.user.id,
                  email: data.user.email,
                  name: data.user.user_metadata?.name || 'Admin User',
                  role: 'admin'
                }
              ]);

            if (createError) {
              debugLog(`❌ Error creating admin profile: ${createError.message}`);
              // Don't sign out, just continue with login
            } else {
              debugLog('✅ Admin profile created successfully');
            }

            debugLog('🎉 Login successful!');
            onLogin(data.user);
          } else {
            debugLog('❌ Email not in whitelist');
            await supabase.auth.signOut();
            setError('Access denied. Your account is not approved for admin access.');
            setLoading(false);
            return;
          }
        } else {
          debugLog('✅ Admin profile found, logging in');
          debugLog('🎉 Login successful!');
          onLogin(data.user);
        }
      }
    } catch (error: any) {
      debugLog(`❌ Login failed: ${error.message}`);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResetMessage('');

    try {
      // Only send reset email to abhhiinn@gmail.com
      const { error } = await supabase.auth.resetPasswordForEmail('abhhiinn@gmail.com', {
        redirectTo: `${window.location.origin}/admin`,
      });

      if (error) throw error;

      setResetMessage('Password reset email sent to abhhiinn@gmail.com! Check the inbox and follow the instructions.');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo above form */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block transition-transform duration-300 hover:scale-110">
            <img 
              src="/Logo.png" 
              alt="Flash Overseas" 
              className="h-16 w-auto mx-auto"
            />
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {isForgotPassword ? 'Reset Password' : 'Admin Login'}
            </h1>
            <p className="text-slate-600">
              {isForgotPassword ? 'Password reset will be sent to abhhiinn@gmail.com' : 'Access the admin panel'}
            </p>
          </div>

          {isForgotPassword ? (
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div className="text-center p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-center justify-center gap-2 text-blue-700 text-sm mb-2">
                  <Mail className="w-4 h-4" />
                  <span>Password reset will be sent to:</span>
                </div>
                <div className="font-medium text-blue-800">abhhiinn@gmail.com</div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}

              {resetMessage && (
                <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl">
                  {resetMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-xl hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Reset Email'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-6">

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-xl hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Loading...' : 'Sign In'}
              </button>
            </form>
          )}

          <div className="mt-6 text-center space-y-3">
            {!isForgotPassword && (
              <button
                onClick={() => setIsForgotPassword(true)}
                className="text-slate-600 hover:text-slate-700 font-medium block"
              >
                Forgot your password?
              </button>
            )}
            {isForgotPassword && (
              <button
                onClick={() => setIsForgotPassword(false)}
                className="text-primary-600 hover:text-primary-700 font-medium block"
              >
                Back to login
              </button>
            )}
          </div>

          {/* Debug Panel - Remove Later */}
          {debugInfo.length > 0 && (
            <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-lg">
              <h3 className="text-sm font-bold text-gray-700 mb-2">🔍 Debug Info (Remove Later):</h3>
              <div className="max-h-40 overflow-y-auto">
                {debugInfo.map((info, index) => (
                  <div key={index} className="text-xs text-gray-600 mb-1 font-mono">
                    {info}
                  </div>
                ))}
              </div>
              <button
                onClick={() => setDebugInfo([])}
                className="mt-2 text-xs text-red-600 hover:text-red-800"
              >
                Clear Debug Info
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;
