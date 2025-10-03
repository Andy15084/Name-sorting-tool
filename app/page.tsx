'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User } from 'lucide-react';

export default function LoginPage() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check credentials
    const correctName = 'Andrej Paulička';
    const correctPassword = '133580ax';
    
    if (name === correctName && password === correctPassword) {
      // Store authentication
      sessionStorage.setItem('isAuthenticated', 'true');
      sessionStorage.setItem('userName', name);
      router.push('/contacts');
    } else {
      // Show error message
      alert('Invalid credentials! Please check your name and password.');
    }
  };

  return (
    <div className="min-h-screen bg-peach-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-5xl shadow-2xl p-10 w-full max-w-md border border-peach-200">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-peach-500 rounded-full mb-6 shadow-lg">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-peach-600 mb-3">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to manage your contacts 👋</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-peach-500" />
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-peach-200 rounded-3xl focus:ring-2 focus:ring-peach-400 focus:border-peach-400 outline-none transition-all duration-200"
                placeholder="Enter your name"
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
                className="w-full pl-12 pr-4 py-4 border-2 border-peach-200 rounded-3xl focus:ring-2 focus:ring-peach-400 focus:border-peach-400 outline-none transition-all duration-200"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-peach-500 text-white py-4 rounded-3xl font-semibold hover:bg-peach-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
