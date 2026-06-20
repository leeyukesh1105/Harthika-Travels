import React, { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../components/Logo';

export default function AdminLogin() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    const redirectTo = location.state?.from?.pathname || '/admin';
    return <Navigate to={redirectTo} replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Logo light />
        </div>
        <div className="bg-white rounded-postcard p-8 shadow-xl">
          <h1 className="font-display font-semibold text-2xl text-ink text-center">Admin Login</h1>
          <p className="text-ink/50 text-sm text-center mt-1 mb-6">Manage destinations, packages & enquiries</p>

          {error && (
            <div className="bg-sunset/10 border border-sunset/30 text-sunset-dark rounded-lg p-3 mb-5 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-ink mb-1.5">
                Username
              </label>
              <input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
                className="w-full rounded-lg border border-ink/15 px-4 py-2.5 focus-ring focus:border-teal"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-ink mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-ink/15 px-4 py-2.5 focus-ring focus:border-teal"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-sunset text-white font-semibold px-6 py-3 hover:bg-sunset-dark transition-colors focus-ring disabled:opacity-60"
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
