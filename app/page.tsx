'use client';

import { useRouter } from 'next/navigation';
import { Search, UserPlus, Shield, Zap, Grid3x3, MessageSquare, Link as LinkIcon, Sparkles, ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  const router = useRouter();

  const features = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "Advanced Search & Filters",
      description: "Find contacts instantly with powerful search by name, date of birth, school, or profession. Quick-select bubbles make filtering effortless."
    },
    {
      icon: <UserPlus className="w-6 h-6" />,
      title: "Rich Contact Profiles",
      description: "Store comprehensive information including emails, phone numbers, social media links, professions, schools, and personal notes."
    },
    {
      icon: <Grid3x3 className="w-6 h-6" />,
      title: "Dual View Modes",
      description: "Switch between elegant list view and detailed table view. Choose the layout that works best for you at any moment."
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Comments & Notes",
      description: "Add timestamped comments and notes to any contact. Keep track of important details, meetings, and memorable moments."
    },
    {
      icon: <LinkIcon className="w-6 h-6" />,
      title: "Social Media Integration",
      description: "Link all social profiles in one place. Support for 10+ platforms including LinkedIn, GitHub, Instagram, Twitter, and more."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Built with Next.js 15 and optimized for speed. Instant updates, smooth animations, and responsive design that works everywhere."
    }
  ];

  const benefits = [
    "100% Free Forever",
    "Never lose a contact again",
    "Remember important details about everyone",
    "Find anyone in seconds",
    "Beautiful, modern interface",
    "Access from any device"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-100 via-white to-lightblue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-peach-500 to-blue-500 rounded-full mb-8 shadow-2xl animate-pulse">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Your Contacts,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-peach-600 to-blue-600">
                Beautifully Organized
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              The most elegant way to manage your personal and professional contacts. 
              Rich profiles, powerful search, and a stunning interface you'll love to use.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => router.push('/signup')}
                className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-peach-500 to-peach-600 text-white rounded-full font-bold text-lg hover:from-peach-600 hover:to-peach-700 transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => router.push('/login')}
                className="flex items-center gap-3 px-8 py-4 bg-white text-gray-700 rounded-full font-bold text-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-gray-200"
              >
                Sign In
              </button>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-lightblue-600" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Screenshots Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            See It In Action
          </h2>
          <p className="text-xl text-gray-600">
            A beautiful interface that makes managing contacts a joy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 bg-white p-2">
            <Image
              src="/Screenshot 2025-10-05 at 20.37.00.png"
              alt="Login Screen"
              width={800}
              height={600}
              className="rounded-2xl w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl flex items-end p-6">
              <p className="text-white font-semibold text-lg">Secure & Simple Login</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 bg-white p-2">
            <Image
              src="/Screenshot 2025-10-05 at 20.37.16.png"
              alt="Contacts List"
              width={800}
              height={600}
              className="rounded-2xl w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl flex items-end p-6">
              <p className="text-white font-semibold text-lg">Beautiful Contact Cards</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 bg-white p-2">
            <Image
              src="/Screenshot 2025-10-05 at 20.39.03.png"
              alt="Add Contact"
              width={800}
              height={600}
              className="rounded-2xl w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl flex items-end p-6">
              <p className="text-white font-semibold text-lg">Rich Profile Editor</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 bg-white p-2">
            <Image
              src="/Screenshot 2025-10-05 at 20.39.36.png"
              alt="Contact Profile"
              width={800}
              height={600}
              className="rounded-2xl w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl flex items-end p-6">
              <p className="text-white font-semibold text-lg">Detailed Contact View</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to manage your contacts effectively
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-lightblue-300 transform hover:-translate-y-2"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-peach-500 to-lightblue-500 rounded-2xl mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="bg-gradient-to-r from-cream-200 to-lightblue-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Built With Modern Technology
            </h2>
            <p className="text-lg text-gray-600">
              Powered by the latest and greatest web technologies
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8">
            {['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Prisma', 'SQLite'].map((tech, index) => (
              <div
                key={index}
                className="px-6 py-3 bg-white rounded-full font-semibold text-gray-700 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-peach-500 to-blue-500 rounded-5xl p-12 sm:p-16 text-center shadow-2xl">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Get Organized?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Start managing your contacts the smart way. Beautiful design, powerful features, and everything you need in one place.
          </p>
          <button
            onClick={() => router.push('/signup')}
            className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-600 rounded-full font-bold text-xl hover:bg-cream-50 transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl"
          >
            Get Started Free
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <p className="text-lg font-semibold mb-2">My Contacts App</p>
            <p>Your personal contact management solution</p>
            <p className="mt-4 text-sm">Built with ❤️ by NextLayer Studio</p>
          </div>
        </div>
      </footer>
    </div>
  );
}