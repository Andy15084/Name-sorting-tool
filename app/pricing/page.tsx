'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function PricingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const features = [
    'Unlimited contacts storage',
    'Advanced search & filters',
    'Rich contact profiles with photos',
    'Email & phone management',
    'Social media integration',
    'Comments & notes system',
    'Dual view modes (List & Table)',
    'Mobile-friendly design',
    'Secure local database',
    'Regular updates & support'
  ];

  const handleSubscribe = async () => {
    try {
      setLoading(true);

      // Get user info from session
      const userId = sessionStorage.getItem('userId');
      const userEmail = sessionStorage.getItem('userEmail');
      
      if (!userId || !userEmail) {
        alert('Please log in first');
        router.push('/login');
        return;
      }
      
      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          email: userEmail,
        }),
      });

      const { url, error } = await response.json();

      if (error) {
        alert('Error creating checkout session. Please try again.');
        setLoading(false);
        return;
      }

      // Redirect to Stripe Checkout
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-100 via-white to-lightblue-50">
      {/* Header */}
      <header className="py-6 border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <button
            onClick={() => router.push('/')}
            className="text-lg font-bold text-gray-900"
          >
            ← Back to Home
          </button>
        </div>
      </header>

      {/* Pricing Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-peach-500 to-blue-500 rounded-full mb-6 shadow-2xl">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get unlimited access to all features for one low monthly price
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-lg mx-auto">
          <div className="relative">
            {/* Popular Badge */}
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-peach-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                MOST POPULAR
              </div>
            </div>

            {/* Pricing Card */}
            <div className="bg-white rounded-4xl shadow-2xl border-4 border-lightblue-200 p-8 sm:p-12 mt-5">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Pro Plan</h2>
                <div className="flex items-end justify-center gap-2 mb-2">
                  <span className="text-6xl font-bold text-blue-600">€1.99</span>
                  <span className="text-2xl text-gray-600 mb-2">/month</span>
                </div>
                <p className="text-gray-600">Cancel anytime, no questions asked</p>
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-lightblue-100 rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-lightblue-600" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Subscribe Button */}
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="group w-full flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-peach-500 to-blue-500 text-white rounded-full font-bold text-xl hover:from-peach-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  'Processing...'
                ) : (
                  <>
                    Subscribe Now
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <p className="text-center text-sm text-gray-500 mt-6">
                🔒 Secure payment powered by Stripe
              </p>
            </div>
          </div>

          {/* Money Back Guarantee */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-cream-200 rounded-3xl px-8 py-4">
              <p className="text-lg font-semibold text-gray-900 mb-1">
                💯 30-Day Money Back Guarantee
              </p>
              <p className="text-gray-600">
                Not satisfied? Get a full refund, no questions asked.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16 space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Frequently Asked Questions
            </h3>

            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h4 className="font-bold text-gray-900 mb-2">Can I cancel anytime?</h4>
              <p className="text-gray-600">
                Yes! You can cancel your subscription at any time from your account settings. No commitments, no contracts.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h4 className="font-bold text-gray-900 mb-2">What payment methods do you accept?</h4>
              <p className="text-gray-600">
                We accept all major credit cards (Visa, MasterCard, American Express) through our secure payment processor, Stripe.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h4 className="font-bold text-gray-900 mb-2">Is my data secure?</h4>
              <p className="text-gray-600">
                Absolutely! Your data is stored in a secure local database and we never share your information with third parties.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <p className="text-sm">Built with ❤️ by NextLayer Studio</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
