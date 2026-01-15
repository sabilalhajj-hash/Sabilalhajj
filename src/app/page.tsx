'use client';

import WhyChooseUs from '../components/Home/WhyChooseUs';
import Hero from '../components/Home/Hero';
import PackageSelection from '../components/Home/PackageSelection';
import Services from '../components/Home/Services';
import Testimonials from '../components/Home/Testimonials';
import SectionIndicator from '../components/SectionIndicator';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Gallery from '@/components/Gallery';

export default function Home() {

  return (
    <div className="min-h-screen bg-gray-50">
      <SectionIndicator />

      {/* Hero Section */}
      <Hero />
      <PackageSelection />

      {/* Services Preview */}
      <Services />

      {/* Why Choose Us Section */}
      <WhyChooseUs />


      {/* Call to Action
      <div className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Begin Your Spiritual Journey?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Contact us today to start planning your Hajj or Umrah pilgrimage.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Get Started
          </button>
        </div>
      </div> */}

      <Testimonials />
      <Gallery/>
    </div>
  );
}
