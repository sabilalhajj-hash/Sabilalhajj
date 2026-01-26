'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { LogOut, User, BookOpen, Settings, Mail, Phone, Calendar, MoreVertical, Download, Trash2, Eye } from 'lucide-react';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  lastName: string;
  phone: string;
  createdAt: string;
  role: string;
}

interface Booking {
  id: string;
  packageType: string;
  bookingDate: string;
  travelDate: string;
  status: 'active' | 'completed' | 'cancelled';
  totalPrice: number;
}

export default function UserPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'bookings' | 'profile' | 'settings'>('bookings');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Mock user data - Replace with actual API call
    setUserProfile({
      id: '1',
      email: 'user@example.com',
      name: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
      createdAt: new Date().toISOString(),
      role: 'user',
    });

    // Mock bookings data - Replace with actual API call
    setBookings([
      {
        id: 'BK001',
        packageType: 'Umrah (7 Days)',
        bookingDate: new Date().toISOString(),
        travelDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'active',
        totalPrice: 1200,
      },
      {
        id: 'BK002',
        packageType: 'Hajj Package',
        bookingDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        travelDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'completed',
        totalPrice: 3500,
      },
    ]);
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    setShowLogoutConfirm(false);
    setLoading(false);
    router.push('/auth?redirect=/user');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-100 text-emerald-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-8">
        <div className="animate-pulse text-emerald-700 font-semibold" suppressHydrationWarning>Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-emerald-900 mb-2">{t('user.title')}</h1>
            <p className="text-slate-600">{t('user.subtitle')}</p>
          </div>
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 font-semibold hover:bg-red-100 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            {t('user.logout')}
          </button>
        </div>

        {/* Logout Confirmation Modal */}
        {showLogoutConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 rounded-lg">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('user.logout_confirm')}</h2>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
                >
                  {t('user.cancel')}
                </button>
                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="flex-1 px-4 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50 transition-colors"
                >
                  {loading ? t('common.loading') : t('user.logout')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="mb-8 border-b border-slate-200 flex gap-8">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex items-center gap-2 px-4 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === 'bookings'
                ? 'text-emerald-700 border-emerald-700'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            <BookOpen className="h-5 w-5" />
            {t('user.bookings')}
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === 'profile'
                ? 'text-emerald-700 border-emerald-700'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            <User className="h-5 w-5" />
            {t('user.profile')}
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === 'settings'
                ? 'text-emerald-700 border-emerald-700'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            <Settings className="h-5 w-5" />
            {t('user.settings')}
          </button>
        </div>

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {bookings && bookings.length > 0 ? (
              <>
                <div className="grid gap-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="bg-white rounded-xl shadow border border-slate-100 p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-slate-900">{booking.packageType}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(booking.status)}`}>
                              {t(`user.${booking.status}`)}
                            </span>
                          </div>
                          <p className="text-slate-600 text-sm">{t('user.booking_id')}: {booking.id}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-emerald-700">${booking.totalPrice}</p>
                          <p className="text-xs text-slate-500">{t('user.total_price')}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 py-4 border-y border-slate-100">
                        <div>
                          <p className="text-xs text-slate-500 mb-1">{t('user.booking_date')}</p>
                          <p className="text-sm font-semibold text-slate-900">{formatDate(booking.bookingDate)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">{t('user.travel_date')}</p>
                          <p className="text-sm font-semibold text-slate-900">{formatDate(booking.travelDate)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">{t('user.status')}</p>
                          <p className="text-sm font-semibold text-slate-900 capitalize">{t(`user.${booking.status}`)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">{t('user.total_price')}</p>
                          <p className="text-sm font-semibold text-emerald-700">${booking.totalPrice}</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-emerald-50 text-emerald-700 font-semibold hover:bg-emerald-100 transition-colors">
                          <Eye className="h-4 w-4" />
                          {t('user.view_booking')}
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition-colors">
                          <Download className="h-4 w-4" />
                          {t('user.download_receipt')}
                        </button>
                        {booking.status === 'active' && (
                          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-700 font-semibold hover:bg-red-100 transition-colors">
                            <Trash2 className="h-4 w-4" />
                            {t('user.cancel_booking')}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-white rounded-xl shadow border border-slate-100 p-12 text-center">
                <BookOpen className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">{t('user.no_bookings')}</h3>
                <p className="text-slate-600 mb-6">{t('user.no_bookings_description')}</p>
                <Link
                  href="/umrah"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
                >
                  {t('user.start_booking')}
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && userProfile && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow border border-slate-100 p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">{t('user.profile')}</h2>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase">{t('user.name')}</label>
                  <p className="text-lg font-semibold text-slate-900">{userProfile.name} {userProfile.lastName}</p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {t('user.email')}
                  </label>
                  <p className="text-lg font-semibold text-slate-900">{userProfile.email}</p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {t('user.phone')}
                  </label>
                  <p className="text-lg font-semibold text-slate-900">{userProfile.phone}</p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {t('user.joined')}
                  </label>
                  <p className="text-lg font-semibold text-slate-900">{formatDate(userProfile.createdAt)}</p>
                </div>
              </div>

              <button className="mt-8 w-full px-4 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors">
                {t('user.edit_profile')}
              </button>
            </div>

            <div className="bg-white rounded-xl shadow border border-slate-100 p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">{t('user.account_settings')}</h2>

              <div className="space-y-3">
                <button className="w-full px-4 py-3 rounded-lg border border-slate-200 text-left font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  {t('user.change_password')}
                </button>

                <button className="w-full px-4 py-3 rounded-lg border border-slate-200 text-left font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  {t('user.notification_preferences')}
                </button>

                <button className="w-full px-4 py-3 rounded-lg border border-slate-200 text-left font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  {t('user.privacy_settings')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow border border-slate-100 p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">{t('user.account_settings')}</h2>

              <div className="space-y-4">
                <button className="w-full px-4 py-3 rounded-lg border border-slate-200 text-left font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                  {t('user.change_password')}
                </button>

                <button className="w-full px-4 py-3 rounded-lg border border-slate-200 text-left font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                  {t('user.notification_preferences')}
                </button>

                <button className="w-full px-4 py-3 rounded-lg border border-slate-200 text-left font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                  {t('user.privacy_settings')}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow border border-slate-100 p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">{t('user.help_support')}</h2>

              <div className="space-y-4">
                <button className="w-full px-4 py-3 rounded-lg border border-slate-200 text-left font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                  {t('user.contact_support')}
                </button>

                <button className="w-full px-4 py-3 rounded-lg border border-slate-200 text-left font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                  {t('user.faq')}
                </button>

                <Link
                  href="/"
                  className="block px-4 py-3 rounded-lg border border-slate-200 text-left font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  {t('common.back_to_home')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
