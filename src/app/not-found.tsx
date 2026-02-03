'use client';

import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/hajj1.jpg"
          alt="Hajj"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
        {/* Logo and Website Name */}
        <div className="flex items-center justify-center mb-8">
          <Image
            src="/sabilalhajj-removebg.png"
            alt="Sabil Al-Hajj Logo"
            width={80}
            height={80}
            className="object-contain mr-3"
          />
          <h2 className="text-3xl sm:text-4xl font-bold text-emerald-700">Sabil Al-Hajj</h2>
        </div>

        {/* 404 Content */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 sm:p-12">
          <h1 className="text-6xl sm:text-8xl font-bold text-emerald-600 mb-4">404</h1>
          <p className="text-xl sm:text-2xl text-gray-700 mb-2 font-semibold">Page not found</p>
          <p className="text-gray-600 mb-8">The page you are looking for does not exist or has been moved.</p>
          
          <Link 
            href="/" 
            className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-full hover:bg-emerald-700 transition-colors shadow-md hover:shadow-lg"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
