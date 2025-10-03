'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ClearPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear all localStorage
    localStorage.clear();
    sessionStorage.clear();
    
    // Redirect to login after a brief moment
    setTimeout(() => {
      router.push('/');
    }, 1000);
  }, [router]);

  return (
    <div className="min-h-screen bg-peach-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-4xl shadow-2xl p-10 text-center">
        <div className="mb-4">
          <svg className="w-16 h-16 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">All Data Cleared!</h1>
        <p className="text-gray-600">Redirecting to login...</p>
      </div>
    </div>
  );
}

