'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import {
  BarChart3,
  Users,
  BookOpen,
  Package,
  TrendingUp,
  LogOut,
  Menu,
  X,
  Settings,
  FileText,
  Download,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  AlertCircle,
  CheckCircle,
  Clock,
  ShieldPlus,
} from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  totalBookings: number;
  totalRevenue: number;
  pendingBookings: number;
  activeUsers: number;
  cancelledBookings: number;
}

interface RecentBooking {
  id: string;
  userName: string;
  packageType: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  date: string;
  amount: number;
}

interface RecentUser {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'suspended';
}

interface ApiUser {
  id: string;
  email: string;
  name: string | null;
  lastName: string | null;
  role: string;
  createdAt: string;
}

export default function AdminPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'bookings' | 'users' | 'packages' | 'reports' | 'settings'>('dashboard');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentBookings, setRecentBookings] = useState<RecentBooking[]>([]);
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [apiUsers, setApiUsers] = useState<ApiUser[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState<string | null>(null);
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [promoteLoadingId, setPromoteLoadingId] = useState<string | null>(null);
  const [promoteStatus, setPromoteStatus] = useState<'success' | 'error' | null>(null);

  const fetchUsers = useCallback(async () => {
    setUsersLoading(true);
    setUsersError(null);
    try {
      const res = await fetch('/api/admin/users', { credentials: 'include' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch users');
      setApiUsers(data.users ?? []);
    } catch (e) {
      setUsersError(e instanceof Error ? e.message : 'Failed to fetch users');
      setApiUsers([]);
    } finally {
      setUsersLoading(false);
    }
  }, []);

  const promoteUser = async (userId: string) => {
    setPromoteLoadingId(userId);
    setPromoteStatus(null);
    try {
      const res = await fetch('/api/admin/promote-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to promote');
      setPromoteStatus('success');
      await fetchUsers();
      setTimeout(() => setPromoteStatus(null), 3000);
    } catch (e) {
      setPromoteStatus('error');
      setTimeout(() => setPromoteStatus(null), 3000);
    } finally {
      setPromoteLoadingId(null);
    }
  };

  useEffect(() => {
    setMounted(true);
    // Mock stats data
    setStats({
      totalUsers: 1250,
      totalBookings: 856,
      totalRevenue: 425600,
      pendingBookings: 42,
      activeUsers: 892,
      cancelledBookings: 28,
    });

    // Mock recent bookings
    setRecentBookings([
      {
        id: 'BK001',
        userName: 'Ahmed Hassan',
        packageType: 'Umrah 7 Days',
        status: 'approved',
        date: '2024-01-15',
        amount: 1200,
      },
      {
        id: 'BK002',
        userName: 'Fatima Khan',
        packageType: 'Hajj Package',
        status: 'pending',
        date: '2024-01-14',
        amount: 3500,
      },
      {
        id: 'BK003',
        userName: 'Mohammed Ali',
        packageType: 'Umrah Plus',
        status: 'approved',
        date: '2024-01-13',
        amount: 1800,
      },
    ]);

    // Mock recent users
    setRecentUsers([
      {
        id: 'U001',
        name: 'Layla Ibrahim',
        email: 'layla@example.com',
        joinDate: '2024-01-10',
        status: 'active',
      },
      {
        id: 'U002',
        name: 'Hassan Noor',
        email: 'hassan@example.com',
        joinDate: '2024-01-09',
        status: 'active',
      },
      {
        id: 'U003',
        name: 'Yasmin Ahmed',
        email: 'yasmin@example.com',
        joinDate: '2024-01-08',
        status: 'inactive',
      },
    ]);
  }, []);

  useEffect(() => {
    if (mounted && activeTab === 'users') fetchUsers();
  }, [mounted, activeTab, fetchUsers]);

  const filteredUsers = useMemo(() => {
    const q = userSearchQuery.trim().toLowerCase();
    if (!q) return apiUsers;
    return apiUsers.filter(
      (u) =>
        u.email.toLowerCase().includes(q) ||
        (u.name ?? '').toLowerCase().includes(q) ||
        (u.lastName ?? '').toLowerCase().includes(q)
    );
  }, [apiUsers, userSearchQuery]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'active':
        return 'bg-emerald-100 text-emerald-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'rejected':
      case 'inactive':
        return 'bg-red-100 text-red-700';
      case 'suspended':
        return 'bg-red-100 text-red-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
      case 'active':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'rejected':
      case 'inactive':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const StatCard = ({ label, value, icon: Icon }: { label: string; value: string | number; icon: React.ReactNode }) => (
    <div className="bg-white rounded-xl shadow border border-slate-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-slate-600 font-medium">{label}</p>
        <div className="text-emerald-600">{Icon}</div>
      </div>
      <p className="text-3xl font-bold text-slate-900">{value}</p>
    </div>
  );

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-8">
        <div className="animate-pulse text-emerald-700 font-semibold">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="bg-white shadow border-b border-slate-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <h1 className="text-2xl font-black text-emerald-900">{t('admin.title')}</h1>
          </div>
          <button
            onClick={async () => {
              await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
              router.push('/auth?redirect=/admin');
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-700 font-semibold hover:bg-red-100 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            {t('admin.logout')}
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:sticky top-16 lg:top-0 left-0 h-[calc(100vh-64px)] w-64 bg-white border-r border-slate-200 p-6 transition-transform duration-300 z-30 overflow-y-auto`}
        >
          <nav className="space-y-2">
            {[
              { id: 'dashboard', label: t('admin.dashboard'), icon: BarChart3 },
              { id: 'bookings', label: t('admin.bookings'), icon: BookOpen },
              { id: 'users', label: t('admin.users'), icon: Users },
              { id: 'packages', label: t('admin.packages'), icon: Package },
              { id: 'reports', label: t('admin.reports'), icon: FileText },
              { id: 'settings', label: t('admin.settings'), icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors ${
                    activeTab === item.id
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard
                  label={t('admin.total_users')}
                  value={stats?.totalUsers || 0}
                  icon={<Users className="h-8 w-8" />}
                />
                <StatCard
                  label={t('admin.total_bookings')}
                  value={stats?.totalBookings || 0}
                  icon={<BookOpen className="h-8 w-8" />}
                />
                <StatCard
                  label={t('admin.total_revenue')}
                  value={`$${stats?.totalRevenue || 0}`}
                  icon={<TrendingUp className="h-8 w-8" />}
                />
                <StatCard
                  label={t('admin.pending_bookings')}
                  value={stats?.pendingBookings || 0}
                  icon={<Clock className="h-8 w-8" />}
                />
                <StatCard
                  label={t('admin.active_users')}
                  value={stats?.activeUsers || 0}
                  icon={<CheckCircle className="h-8 w-8" />}
                />
                <StatCard
                  label={t('admin.cancelled_bookings')}
                  value={stats?.cancelledBookings || 0}
                  icon={<AlertCircle className="h-8 w-8" />}
                />
              </div>

              {/* Recent Bookings & Users */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Bookings */}
                <div className="bg-white rounded-xl shadow border border-slate-100 p-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">{t('admin.recent_bookings')}</h2>
                  <div className="space-y-4">
                    {recentBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900">{booking.userName}</p>
                          <p className="text-sm text-slate-600">{booking.packageType}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(booking.status)}`}>
                            {getStatusIcon(booking.status)}
                            {t(`admin.${booking.status}`)}
                          </span>
                          <p className="font-semibold text-emerald-700">${booking.amount}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 px-4 py-2 border border-emerald-200 text-emerald-700 font-semibold rounded-lg hover:bg-emerald-50 transition-colors">
                    {t('admin.view_all_bookings')}
                  </button>
                </div>

                {/* Recent Users */}
                <div className="bg-white rounded-xl shadow border border-slate-100 p-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">{t('admin.recent_users')}</h2>
                  <div className="space-y-4">
                    {recentUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900">{user.name}</p>
                          <p className="text-sm text-slate-600">{user.email}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(user.status)}`}>
                          {t(`admin.${user.status}`)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 px-4 py-2 border border-emerald-200 text-emerald-700 font-semibold rounded-lg hover:bg-emerald-50 transition-colors">
                    {t('admin.view_all_users')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">{t('admin.manage_bookings')}</h2>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors">
                  <Plus className="h-5 w-5" />
                  {t('admin.add_package')}
                </button>
              </div>

              <div className="bg-white rounded-xl shadow border border-slate-100 p-6">
                <div className="flex gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder={t('admin.search_booking')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <select className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option>{t('admin.filter_by_status')}</option>
                    <option>{t('admin.pending')}</option>
                    <option>{t('admin.approved')}</option>
                    <option>{t('admin.completed')}</option>
                  </select>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b-2 border-slate-200">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">{t('admin.booking_status')}</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">{t('admin.user_email')}</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">{t('admin.package_name')}</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">{t('admin.revenue')}</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">{t('admin.actions')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentBookings.map((booking) => (
                        <tr key={booking.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-4">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(booking.status)}`}>
                              {getStatusIcon(booking.status)}
                              {t(`admin.${booking.status}`)}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-slate-700">{booking.userName}</td>
                          <td className="py-4 px-4 text-slate-700">{booking.packageType}</td>
                          <td className="py-4 px-4 font-semibold text-emerald-700">${booking.amount}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
                                <Eye className="h-4 w-4 text-slate-600" />
                              </button>
                              <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
                                <Edit className="h-4 w-4 text-slate-600" />
                              </button>
                              <button className="p-2 hover:bg-red-100 rounded-lg transition-colors">
                                <Trash2 className="h-4 w-4 text-red-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">{t('admin.manage_users')}</h2>
              </div>

              {promoteStatus && (
                <div className={`p-4 rounded-lg ${promoteStatus === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                  {promoteStatus === 'success' ? t('admin.promote_success') : t('admin.promote_failed')}
                </div>
              )}

              <div className="bg-white rounded-xl shadow border border-slate-100 p-6">
                <div className="flex gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder={t('admin.search_user')}
                      value={userSearchQuery}
                      onChange={(e) => setUserSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {usersError && (
                  <p className="mb-4 text-red-600 text-sm">{usersError}</p>
                )}

                {usersLoading ? (
                  <div className="py-12 text-center text-slate-500">{t('common.loading')}</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b-2 border-slate-200">
                        <tr>
                          <th className="text-left py-3 px-4 font-semibold text-slate-700">{t('admin.user_email')}</th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-700">{t('user.name')}</th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-700">{t('admin.role')}</th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-700">{t('admin.created_date')}</th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-700">{t('admin.actions')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user) => (
                          <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                            <td className="py-4 px-4 text-slate-700">{user.email}</td>
                            <td className="py-4 px-4 font-semibold text-slate-900">
                              {[user.name, user.lastName].filter(Boolean).join(' ') || '—'}
                            </td>
                            <td className="py-4 px-4">
                              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                                user.role === 'admin' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                              }`}>
                                {user.role === 'admin' ? t('admin.admin_role') : t('admin.user_role')}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-slate-700">
                              {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                {user.role === 'user' ? (
                                  <button
                                    onClick={() => promoteUser(user.id)}
                                    disabled={!!promoteLoadingId}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-700 font-semibold hover:bg-emerald-200 disabled:opacity-50 transition-colors text-sm"
                                  >
                                    <ShieldPlus className="h-4 w-4" />
                                    {promoteLoadingId === user.id ? t('common.loading') : t('admin.make_admin')}
                                  </button>
                                ) : (
                                  <span className="text-slate-400 text-sm">—</span>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {!usersLoading && filteredUsers.length === 0 && (
                  <p className="py-8 text-center text-slate-500">
                    {apiUsers.length === 0 ? 'No users yet.' : 'No users match your search.'}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Packages Tab */}
          {activeTab === 'packages' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">{t('admin.manage_packages')}</h2>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors">
                  <Plus className="h-5 w-5" />
                  {t('admin.add_package')}
                </button>
              </div>

              <div className="bg-white rounded-xl shadow border border-slate-100 p-6 text-center py-12">
                <Package className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600">{t('admin.view_packages')}</p>
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">{t('admin.view_reports')}</h2>

              <div className="grid lg:grid-cols-3 gap-6">
                {[
                  { title: t('admin.revenue_report'), icon: TrendingUp },
                  { title: t('admin.booking_report'), icon: BookOpen },
                  { title: t('admin.user_report'), icon: Users },
                ].map((report, idx) => {
                  const Icon = report.icon;
                  return (
                    <div key={idx} className="bg-white rounded-xl shadow border border-slate-100 p-6 hover:shadow-lg transition-shadow cursor-pointer">
                      <Icon className="h-12 w-12 text-emerald-600 mb-4" />
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{report.title}</h3>
                      <button className="flex items-center gap-2 px-4 py-2 text-emerald-700 font-semibold hover:bg-emerald-50 rounded-lg transition-colors">
                        <Download className="h-4 w-4" />
                        {t('admin.export_report')}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">{t('admin.admin_settings')}</h2>

              <div className="grid lg:grid-cols-2 gap-6">
                {[
                  { title: t('admin.system_settings'), icon: Settings },
                  { title: t('admin.email_settings'), icon: MoreVertical },
                  { title: t('admin.payment_settings'), icon: MoreVertical },
                  { title: t('admin.user_management'), icon: Users },
                ].map((setting, idx) => {
                  const Icon = setting.icon;
                  return (
                    <div key={idx} className="bg-white rounded-xl shadow border border-slate-100 p-6 hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="flex items-center gap-3 mb-4">
                        <Icon className="h-8 w-8 text-emerald-600" />
                        <h3 className="text-lg font-bold text-slate-900">{setting.title}</h3>
                      </div>
                      <button className="px-4 py-2 border border-emerald-200 text-emerald-700 font-semibold rounded-lg hover:bg-emerald-50 transition-colors">
                        {t('admin.edit')}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
