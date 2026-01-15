'use client';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  const footerLinks = {
    services: [
      { name: t('services.hajj.title'), href: '/services' },
      { name: t('services.umrah.title'), href: '/services' },
      { name: t('services.visa.title'), href: '/services' },
      { name: 'Transportation', href: '/services' },
      { name: 'Accommodation', href: '/services' },
    ],
    company: [
      { name: t('navigation.about'), href: '/about' },
      { name: 'Our Portfolio', href: '/portfolio' },
      { name: t('contact.title'), href: '/contact' },
      { name: 'Blog', href: '/blog' },
    ],
    legal: [
      { name: t('footer.privacy'), href: '#' },
      { name: t('footer.terms'), href: '#' },
      { name: t('footer.cookies'), href: '#' },
    ],
    contact: [
      { text: '123 Pilgrimage Street, Makkah, Saudi Arabia', icon: '📍' },
      { text: '+966 12 345 6789', icon: '📞' },
      { text: 'info@sabilalhajj.com', icon: '✉️' },
    ]
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">🕋</div>
              <h3 className="text-xl font-bold">Sabil Al-Hajj</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C8.396 0 7.996.014 6.797.067 5.609.12 4.836.245 4.199.471c-.661.236-1.221.551-1.782.977C1.856 1.873.996 2.553.996 3.332c0 .78.86 1.46 1.421 1.886.561.426 1.121.691 1.782.927.637.226 1.41.351 2.599.404C7.996 6.55 8.396 6.564 12.017 6.564s4.021-.014 5.22-.067c1.189-.053 1.962-.178 2.599-.404.661-.236 1.221-.551 1.782-.977.561-.426 1.421-1.106 1.421-1.886 0-.78-.86-1.46-1.421-1.886-.561-.426-1.121-.691-1.782-.927-.637-.226-1.41-.351-2.599-.404C16.038.014 15.638 0 12.017 0zM12.017 3.937a8.063 8.063 0 100 16.126 8.063 8.063 0 000-16.126zm0 13.302a5.239 5.239 0 110-10.478 5.239 5.239 0 010 10.478zm8.406-13.527a1.886 1.886 0 11-3.772 0 1.886 1.886 0 013.772 0z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.services')}</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.company')}</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.contact_info')}</h4>
            <ul className="space-y-3">
              {footerLinks.contact.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-gray-300 text-sm">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        {/* <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-lg font-semibold mb-4">{t('footer.newsletter_title')}</h4>
            <p className="text-gray-300 text-sm mb-4">
              {t('footer.newsletter_description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                {t('footer.subscribe')}
              </button>
            </div>
          </div>
        </div> */}

        {/* Bottom Footer */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-300 text-sm mb-4 md:mb-0">
              {t('footer.copyright', { year: currentYear })}
            </div>
            <div className="flex space-x-6">
              {footerLinks.legal.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}