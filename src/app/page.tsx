'use client';

import WhyChooseUs from '../components/Home/WhyChooseUs';
import Hero from '../components/Home/Hero';
import PackageSelection from '../components/Home/PackageSelection';
import Services from '../components/Home/Services';
import Testimonials from '../components/Home/Testimonials';
import TrustedPartners from '../components/Home/TrustedPartners';
import SectionIndicator from '../components/SectionIndicator';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Gallery from '@/components/Gallery';

export const dynamic = 'force-dynamic';

export default function Home() {

  return (
    <div className="min-h-screen bg-gray-50">
      <SectionIndicator pageType="home" />

      {/* Hero Section */}
      <section id="hero">
        <Hero />
      </section>

      {/* Package Selection Section */}
      <section id="package-selection">
        <PackageSelection />
      </section>

      {/* Services Preview */}
      <section id="services">
        <Services />
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us">
        <WhyChooseUs />
      </section>

      {/* Testimonials Section */}
      <section id="testimonials">
        <Testimonials />
      </section>

      {/* Trusted Partners Section */}
      <section id="trusted-partners">
        <TrustedPartners />
      </section>

      {/* Gallery Section */}
      <section id="gallery">
        <Gallery/>
      </section>
    </div>
  );
}
