'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to login');
        setLoading(false);
        return;
      }

      // Store authentication
      sessionStorage.setItem('isAuthenticated', 'true');
      sessionStorage.setItem('userId', data.user.id);
      sessionStorage.setItem('userName', data.user.name);
      sessionStorage.setItem('userEmail', data.user.email);

      // Check if user has active subscription
      if (data.user.subscriptionStatus === 'active') {
        router.push('/contacts');
      } else {
        router.push('/pricing');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-100 via-white to-lightblue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-5xl shadow-2xl p-10 w-full max-w-md border border-peach-200">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-peach-500 to-blue-500 rounded-full mb-6 shadow-lg">
            <Mail className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to manage your contacts 👋</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-3xl">
            <p className="text-red-600 text-sm font-medium text-center">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-peach-500" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-peach-200 rounded-3xl focus:ring-2 focus:ring-peach-400 focus:border-peach-400 outline-none transition-all duration-200 text-gray-900"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-peach-500" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-peach-200 rounded-3xl focus:ring-2 focus:ring-peach-400 focus:border-peach-400 outline-none transition-all duration-200 text-gray-900"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-peach-500 to-blue-500 text-white py-4 rounded-3xl font-semibold hover:from-peach-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" className="text-blue-600 font-semibold hover:text-blue-700">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
