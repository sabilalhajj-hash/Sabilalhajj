'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
  Compass,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LabelList,
} from 'recharts';

// Modern chart tooltip – consistent styling
const ChartTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; payload?: { fullName?: string } }>; label?: string }) => {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  const fullName = item.payload?.fullName;
  const title = fullName && fullName !== label ? fullName : label;
  return (
    <div className="rounded-xl border border-slate-200/80 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm">
      {title && <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1 max-w-[200px] truncate" title={fullName}>{title}</p>}
      <p className="text-lg font-bold text-slate-800 tabular-nums">{item.value}</p>
    </div>
  );
};

// Pie tooltip with optional percentage
const PieTooltipContent = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; payload?: { name: string; value: number; color: string } }> }) => {
  if (!active || !payload?.length) return null;
  const total = payload.reduce((s, p) => s + p.value, 0);
  const p = payload[0];
  const percent = total > 0 ? Math.round((p.value / total) * 100) : 0;
  return (
    <div className="rounded-xl border border-slate-200/80 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{p.name}</p>
      <p className="text-lg font-bold text-slate-800">{p.value} ({percent}%)</p>
    </div>
  );
};

interface UmrahBookingsByPackageItem {
  packageSlug: string;
  packageName: string | null;
  count: number;
}

interface BookingsByStatus {
  pending: number;
  approved: number;
  completed: number;
  cancelled: number;
}

interface DashboardStats {
  totalUsers: number;
  totalBookings: number;
  totalRevenue: number;
  pendingBookings: number;
  activeUsers: number;
  cancelledBookings: number;
  umrahBookingsByPackage?: UmrahBookingsByPackageItem[];
  bookingsByStatus?: BookingsByStatus;
}

interface RecentBooking {
  id: string;
  userId?: string | null;
  isGuest?: boolean;
  userName?: string;
  userEmail?: string;
  userFirstName?: string;
  userLastName?: string;
  userPhone?: string;
  packageType?: string;
  packageSlug?: string;
  packageName?: string;
  umrahType?: string | null;
  program?: { id?: string; name?: string };
  room?: { id?: string; name?: string };
  visa?: { id?: string; name?: string };
  status: string;
  bookingDate?: string;
  amount?: string | number | null;
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
  phone?: string | null;
  role: string;
  createdAt: string;
}

export default function AdminPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'bookings' | 'hajj' | 'users' | 'packages' | 'reports' | 'settings'>('dashboard');
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
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editUserForm, setEditUserForm] = useState({ name: '', lastName: '', email: '', phone: '', role: 'user' as 'user' | 'admin' });
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editUserLoading, setEditUserLoading] = useState(false);
  const [editUserError, setEditUserError] = useState<string | null>(null);
  const [userToDelete, setUserToDelete] = useState<ApiUser | null>(null);
  const [deleteUserLoading, setDeleteUserLoading] = useState(false);
  const [bookingActionLoadingId, setBookingActionLoadingId] = useState<string | null>(null);

  // Hajj reservations state
  interface HajjReservationItem {
    id: string;
    userId: string | null;
    status: string;
    name: string;
    lastName: string;
    email: string;
    phone?: string | null;
    nationality?: string | null;
    passportNumber?: string | null;
    passportExpiry?: string | null;
    dateOfBirth?: string | null;
    gender?: string | null;
    travelDate?: string | null;
    returnDate?: string | null;
    notes?: string | null;
    createdAt: string;
  }
  const [hajjReservations, setHajjReservations] = useState<HajjReservationItem[]>([]);
  const [hajjLoading, setHajjLoading] = useState(false);
  const [showAddHajjModal, setShowAddHajjModal] = useState(false);
  const [hajjForm, setHajjForm] = useState({
    userType: 'guest' as 'guest' | 'user',
    userId: '',
    name: '',
    lastName: '',
    email: '',
    phone: '',
    nationality: '',
    passportNumber: '',
    passportExpiry: '',
    dateOfBirth: '',
    gender: '',
    travelDate: '',
    returnDate: '',
    notes: '',
  });
  const [hajjSubmitLoading, setHajjSubmitLoading] = useState(false);
  const [hajjError, setHajjError] = useState<string | null>(null);
  const [hajjToDelete, setHajjToDelete] = useState<HajjReservationItem | null>(null);
  const [hajjDeleteLoading, setHajjDeleteLoading] = useState(false);

  // Packages state
  interface UmrahPackageItem {
    id: string;
    slug: string;
    name: string;
    image: string | null;
    description: string | null;
    isActive: boolean;
    umrahType?: string | null;
  }
  type ProgramFormItem = {
    id: string;
    name: string;
    ApproximateDuration: string;
    departure: string;
    return: string;
    from: string;
    to: string;
    description: string;
    highlights: string[];
    includes: string[];
  };
  type RoomFormItem = {
    id: string;
    name: string;
    size: string;
    description: string;
    capacity: string;
    view: string;
    features: string[];
    amenities: string[];
  };
  type VisaFormItem = {
    id: string;
    name: string;
    detail: string;
    description: string;
    validity: string;
    stay_duration: string;
    processing_time: string;
    requirements: string[];
    benefits: string[];
  };
  const defaultProgramItem = (): ProgramFormItem => ({
    id: '',
    name: '',
    ApproximateDuration: '',
    departure: '',
    return: '',
    from: '',
    to: '',
    description: '',
    highlights: [],
    includes: [],
  });
  const defaultRoomItem = (): RoomFormItem => ({
    id: '',
    name: '',
    size: '',
    description: '',
    capacity: '',
    view: '',
    features: [],
    amenities: [],
  });
  const defaultVisaItem = (): VisaFormItem => ({
    id: '',
    name: '',
    detail: '',
    description: '',
    validity: '',
    stay_duration: '',
    processing_time: '',
    requirements: [],
    benefits: [],
  });
  const [packages, setPackages] = useState<UmrahPackageItem[]>([]);
  const [packagesLoading, setPackagesLoading] = useState(false);
  const [showPackageForm, setShowPackageForm] = useState(false);
  const [packageAddStep, setPackageAddStep] = useState<1 | 2 | 3>(1);
  const [packageIsUmrah, setPackageIsUmrah] = useState<boolean | null>(null);
  const [packageUmrahType, setPackageUmrahType] = useState<'collective' | 'personalized' | null>(null);
  const [packageForm, setPackageForm] = useState({ title: '', image: '', description: '' });
  const [packageSubmitLoading, setPackageSubmitLoading] = useState(false);
  const [packageError, setPackageError] = useState<string | null>(null);
  const [addPackageImageUploading, setAddPackageImageUploading] = useState(false);
  const addPackageImageInputRef = useRef<HTMLInputElement>(null);
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);
  const [editPackageForm, setEditPackageForm] = useState<{
    name: string;
    image: string;
    description: string;
    umrahType: 'collective' | 'personalized';
    programs: ProgramFormItem[];
    rooms: RoomFormItem[];
    visas: VisaFormItem[];
  } | null>(null);
  const [editPackageLoading, setEditPackageLoading] = useState(false);
  const [editPackageSaving, setEditPackageSaving] = useState(false);
  const [editPackageError, setEditPackageError] = useState<string | null>(null);
  const [editPackageImageUploading, setEditPackageImageUploading] = useState(false);
  const editPackageImageInputRef = useRef<HTMLInputElement>(null);
  const [seedRamadanLoading, setSeedRamadanLoading] = useState(false);
  const [seedRamadanError, setSeedRamadanError] = useState<string | null>(null);

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

  const openEditUser = async (user: ApiUser) => {
    setEditingUserId(user.id);
    setEditUserForm({
      name: user.name ?? '',
      lastName: user.lastName ?? '',
      email: user.email ?? '',
      phone: (user as ApiUser & { phone?: string }).phone ?? '',
      role: (user.role === 'admin' ? 'admin' : 'user') as 'user' | 'admin',
    });
    setEditUserError(null);
    setShowEditUserModal(true);
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, { credentials: 'include' });
      const data = await res.json();
      if (res.ok && data.user) {
        const u = data.user;
        setEditUserForm({
          name: u.name ?? '',
          lastName: u.lastName ?? '',
          email: u.email ?? '',
          phone: u.phone ?? '',
          role: (u.role === 'admin' ? 'admin' : 'user') as 'user' | 'admin',
        });
      }
    } catch {
      // keep form as is
    }
  };

  const saveEditUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUserId) return;
    setEditUserLoading(true);
    setEditUserError(null);
    try {
      const res = await fetch(`/api/admin/users/${editingUserId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: editUserForm.name || null,
          lastName: editUserForm.lastName || null,
          email: editUserForm.email || undefined,
          phone: editUserForm.phone || null,
          role: editUserForm.role,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update user');
      setShowEditUserModal(false);
      setEditingUserId(null);
      await fetchUsers();
      setPromoteStatus('success');
      setTimeout(() => setPromoteStatus(null), 3000);
    } catch (e) {
      setEditUserError(e instanceof Error ? e.message : 'Failed to update user');
    } finally {
      setEditUserLoading(false);
    }
  };

  const cancelEditUser = () => {
    setShowEditUserModal(false);
    setEditingUserId(null);
    setEditUserError(null);
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    setDeleteUserLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${userToDelete.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete user');
      setUserToDelete(null);
      await fetchUsers();
      setPromoteStatus('success');
      setTimeout(() => setPromoteStatus(null), 3000);
    } catch (e) {
      setPromoteStatus('error');
      setTimeout(() => setPromoteStatus(null), 3000);
    } finally {
      setDeleteUserLoading(false);
    }
  };

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/stats', { credentials: 'include' });
      const data = await res.json();
      if (res.ok && data.stats) {
        setStats({
          totalUsers: data.stats.totalUsers ?? 0,
          totalBookings: data.stats.totalBookings ?? 0,
          totalRevenue: data.stats.totalRevenue ?? 0,
          pendingBookings: data.stats.pendingBookings ?? 0,
          activeUsers: data.stats.activeUsers ?? 0,
          cancelledBookings: data.stats.cancelledBookings ?? 0,
          umrahBookingsByPackage: data.stats.umrahBookingsByPackage ?? [],
          bookingsByStatus: data.stats.bookingsByStatus ?? { pending: 0, approved: 0, completed: 0, cancelled: 0 },
        });
      }
    } catch {
      // ignore
    }
  }, []);

  const fetchBookings = useCallback(async () => {
    setBookingsLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set('search', searchQuery);
      const res = await fetch(`/api/admin/bookings?${params}`, { credentials: 'include' });
      const data = await res.json();
      if (res.ok && Array.isArray(data.bookings)) {
        setRecentBookings(data.bookings.map((b: any) => ({
          id: b.id,
          userId: b.userId,
          isGuest: b.userId == null,
          userName: b.userName,
          userEmail: b.userEmail,
          userFirstName: b.userFirstName,
          userLastName: b.userLastName,
          userPhone: b.userPhone,
          packageType: b.packageType,
          packageSlug: b.packageSlug,
          packageName: b.packageName,
          umrahType: b.umrahType,
          program: b.program,
          room: b.room,
          visa: b.visa,
          status: b.status || 'pending',
          bookingDate: b.bookingDate,
          amount: b.amount,
        })));
      }
    } catch {
      setRecentBookings([]);
    } finally {
      setBookingsLoading(false);
    }
  }, [searchQuery]);

  const handleValidateBooking = async (id: string) => {
    setBookingActionLoadingId(id);
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: 'approved' }),
      });
      if (res.ok) await fetchBookings();
    } finally {
      setBookingActionLoadingId(null);
    }
  };

  const handleRejectBooking = async (id: string) => {
    setBookingActionLoadingId(id);
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: 'rejected' }),
      });
      if (res.ok) await fetchBookings();
    } finally {
      setBookingActionLoadingId(null);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect to sign-in if not logged in or not admin (client-side safeguard)
  useEffect(() => {
    if (!mounted) return;
    fetch('/api/auth/me', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (!data?.user || data.user.role !== 'admin') {
          router.replace(`/auth?redirect=${encodeURIComponent('/admin')}`);
        }
      })
      .catch(() => {
        router.replace(`/auth?redirect=${encodeURIComponent('/admin')}`);
      });
  }, [mounted, router]);

  useEffect(() => {
    if (mounted) fetchStats();
  }, [mounted, fetchStats]);

  useEffect(() => {
    if (mounted && activeTab === 'dashboard') {
      fetch('/api/admin/bookings?limit=5', { credentials: 'include' })
        .then(async (res) => {
          const data = await res.json();
          if (res.ok && Array.isArray(data?.bookings)) {
            setRecentBookings(data.bookings.map((b: any) => ({
              id: b.id,
              userId: b.userId,
              isGuest: b.userId == null,
              userName: b.userName,
              userEmail: b.userEmail,
              userFirstName: b.userFirstName,
              userLastName: b.userLastName,
              userPhone: b.userPhone,
              packageType: b.packageType,
              packageSlug: b.packageSlug,
              packageName: b.packageName,
              umrahType: b.umrahType,
              program: b.program,
              room: b.room,
              visa: b.visa,
              status: b.status || 'pending',
              bookingDate: b.bookingDate,
              amount: b.amount,
            })));
          }
        })
        .catch(() => {});
    }
  }, [mounted, activeTab]);

  useEffect(() => {
    if (mounted && activeTab === 'bookings') fetchBookings();
  }, [mounted, activeTab, fetchBookings]);

  const fetchHajjReservations = useCallback(async () => {
    setHajjLoading(true);
    try {
      const res = await fetch('/api/admin/hajj-reservations', { credentials: 'include' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch Hajj reservations');
      setHajjReservations(data.reservations ?? []);
    } catch {
      setHajjReservations([]);
    } finally {
      setHajjLoading(false);
    }
  }, []);

  useEffect(() => {
    if (mounted && activeTab === 'hajj') {
      fetchHajjReservations();
      fetchUsers(); // load users for "Registered user" dropdown
    }
  }, [mounted, activeTab, fetchHajjReservations, fetchUsers]);

  const submitHajjReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    setHajjError(null);
    setHajjSubmitLoading(true);
    try {
      const payload = {
        userId: hajjForm.userType === 'user' && hajjForm.userId ? hajjForm.userId : null,
        name: hajjForm.name.trim(),
        lastName: hajjForm.lastName.trim(),
        email: hajjForm.email.trim(),
        phone: hajjForm.phone.trim() || undefined,
        nationality: hajjForm.nationality.trim() || undefined,
        passportNumber: hajjForm.passportNumber.trim() || undefined,
        passportExpiry: hajjForm.passportExpiry.trim() || undefined,
        dateOfBirth: hajjForm.dateOfBirth.trim() || undefined,
        gender: hajjForm.gender.trim() || undefined,
        travelDate: hajjForm.travelDate || undefined,
        returnDate: hajjForm.returnDate || undefined,
        notes: hajjForm.notes.trim() || undefined,
      };
      const res = await fetch('/api/admin/hajj-reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add Hajj reservation');
      setShowAddHajjModal(false);
      setHajjForm({
        userType: 'guest',
        userId: '',
        name: '',
        lastName: '',
        email: '',
        phone: '',
        nationality: '',
        passportNumber: '',
        passportExpiry: '',
        dateOfBirth: '',
        gender: '',
        travelDate: '',
        returnDate: '',
        notes: '',
      });
      await fetchHajjReservations();
    } catch (err) {
      setHajjError(err instanceof Error ? err.message : 'Failed to add reservation');
    } finally {
      setHajjSubmitLoading(false);
    }
  };

  const handleDeleteHajjReservation = async () => {
    if (!hajjToDelete) return;
    setHajjDeleteLoading(true);
    try {
      const res = await fetch(`/api/admin/hajj-reservations/${hajjToDelete.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        setHajjToDelete(null);
        await fetchHajjReservations();
      }
    } finally {
      setHajjDeleteLoading(false);
    }
  };

  const fetchPackages = useCallback(async () => {
    setPackagesLoading(true);
    try {
      const res = await fetch('/api/packages?includeInactive=true', { credentials: 'include' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch packages');
      setPackages(data.packages ?? []);
    } catch (e) {
      setPackages([]);
    } finally {
      setPackagesLoading(false);
    }
  }, []);

  const seedRamadanPackage = useCallback(async () => {
    setSeedRamadanLoading(true);
    setSeedRamadanError(null);
    try {
      const res = await fetch('/api/packages/seed-ramadan', {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to seed');
      await fetchPackages();
    } catch (e) {
      setSeedRamadanError(e instanceof Error ? e.message : 'Failed to seed Ramadan package');
    } finally {
      setSeedRamadanLoading(false);
    }
  }, [fetchPackages]);

  const resetPackageForm = () => {
    setShowPackageForm(false);
    setPackageAddStep(1);
    setPackageIsUmrah(null);
    setPackageUmrahType(null);
    setPackageForm({ title: '', image: '', description: '' });
    setPackageError(null);
  };

  const handleAddPackage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (packageUmrahType === null) return;
    setPackageError(null);
    setPackageSubmitLoading(true);
    try {
      const res = await fetch('/api/packages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: packageForm.title,
          image: packageForm.image || undefined,
          description: packageForm.description || undefined,
          umrahType: packageUmrahType,
          isActive: true,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add package');
      resetPackageForm();
      await fetchPackages();
    } catch (e) {
      setPackageError(e instanceof Error ? e.message : 'Failed to add package');
    } finally {
      setPackageSubmitLoading(false);
    }
  };

  const handleDeletePackage = async (id: string) => {
    if (!confirm(t('admin.confirm_delete'))) return;
    try {
      const res = await fetch(`/api/packages/${id}`, { method: 'DELETE', credentials: 'include' });
      if (!res.ok) throw new Error('Failed to delete');
      await fetchPackages();
      if (editingPackageId === id) {
        setEditingPackageId(null);
        setEditPackageForm(null);
      }
    } catch {
      // ignore
    }
  };

  const openEditPackage = useCallback(async (pkg: UmrahPackageItem) => {
    setEditingPackageId(pkg.id);
    setEditPackageError(null);
    setEditPackageLoading(true);
    try {
      const res = await fetch(`/api/packages/${pkg.id}`, { credentials: 'include' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load package');
      const p = data.package;
      const programsRaw = p.programs;
      const programs: ProgramFormItem[] = Array.isArray(programsRaw)
        ? programsRaw.map((pr: Record<string, unknown>) => ({
            id: String(pr.id ?? pr.name ?? ''),
            name: String(pr.name ?? ''),
            ApproximateDuration: String(pr.ApproximateDuration ?? pr.approximateDuration ?? ''),
            departure: String(pr.departure ?? ''),
            return: String(pr.return ?? ''),
            from: String(pr.from ?? ''),
            to: String(pr.to ?? ''),
            description: String(pr.description ?? ''),
            highlights: Array.isArray(pr.highlights) ? pr.highlights.map(String) : [],
            includes: Array.isArray(pr.includes) ? pr.includes.map(String) : [],
          }))
        : [defaultProgramItem()];
      if (programs.length === 0) programs.push(defaultProgramItem());

      const roomsRaw = p.rooms;
      const rooms: RoomFormItem[] = Array.isArray(roomsRaw)
        ? roomsRaw.map((r: Record<string, unknown>) => ({
            id: String(r.id ?? r.name ?? ''),
            name: String(r.name ?? ''),
            size: String(r.size ?? ''),
            description: String(r.description ?? ''),
            capacity: String(r.capacity ?? ''),
            view: String(r.view ?? ''),
            features: Array.isArray(r.features) ? r.features.map(String) : [],
            amenities: Array.isArray(r.amenities) ? r.amenities.map(String) : [],
          }))
        : [defaultRoomItem()];
      if (rooms.length === 0) rooms.push(defaultRoomItem());

      const visasRaw = p.visas;
      const visas: VisaFormItem[] = Array.isArray(visasRaw)
        ? visasRaw.map((v: Record<string, unknown>) => ({
            id: String(v.id ?? v.name ?? ''),
            name: String(v.name ?? ''),
            detail: String(v.detail ?? ''),
            description: String(v.description ?? ''),
            validity: String(v.validity ?? ''),
            stay_duration: String(v.stay_duration ?? ''),
            processing_time: String(v.processing_time ?? ''),
            requirements: Array.isArray(v.requirements) ? v.requirements.map(String) : [],
            benefits: Array.isArray(v.benefits) ? v.benefits.map(String) : [],
          }))
        : [defaultVisaItem()];
      if (visas.length === 0) visas.push(defaultVisaItem());

      setEditPackageForm({
        name: p.name ?? '',
        image: p.image ?? '',
        description: p.description ?? '',
        umrahType: (p.umrahType === 'personalized' ? 'personalized' : 'collective') as 'collective' | 'personalized',
        programs,
        rooms,
        visas,
      });
    } catch (e) {
      setEditPackageError(e instanceof Error ? e.message : 'Failed to load package');
      setEditingPackageId(null);
    } finally {
      setEditPackageLoading(false);
    }
  }, []);

  const closeEditPackage = useCallback(() => {
    setEditingPackageId(null);
    setEditPackageForm(null);
    setEditPackageError(null);
  }, []);

  const updateEditProgram = useCallback((index: number, field: keyof ProgramFormItem, value: string | string[]) => {
    setEditPackageForm((prev) => {
      if (!prev) return prev;
      const next = [...prev.programs];
      if (!next[index]) return prev;
      next[index] = { ...next[index], [field]: value };
      return { ...prev, programs: next };
    });
  }, []);

  const addEditProgram = useCallback(() => {
    setEditPackageForm((prev) => {
      if (!prev) return prev;
      return { ...prev, programs: [...prev.programs, { ...defaultProgramItem(), id: `program-${Date.now()}` }] };
    });
  }, []);

  const removeEditProgram = useCallback((index: number) => {
    setEditPackageForm((prev) => {
      if (!prev || prev.programs.length <= 1) return prev;
      return { ...prev, programs: prev.programs.filter((_, i) => i !== index) };
    });
  }, []);

  const updateEditRoom = useCallback((index: number, field: keyof RoomFormItem, value: string | string[]) => {
    setEditPackageForm((prev) => {
      if (!prev) return prev;
      const next = [...prev.rooms];
      if (!next[index]) return prev;
      next[index] = { ...next[index], [field]: value };
      return { ...prev, rooms: next };
    });
  }, []);

  const addEditRoom = useCallback(() => {
    setEditPackageForm((prev) => {
      if (!prev) return prev;
      return { ...prev, rooms: [...prev.rooms, { ...defaultRoomItem(), id: `room-${Date.now()}` }] };
    });
  }, []);

  const removeEditRoom = useCallback((index: number) => {
    setEditPackageForm((prev) => {
      if (!prev || prev.rooms.length <= 1) return prev;
      return { ...prev, rooms: prev.rooms.filter((_, i) => i !== index) };
    });
  }, []);

  const updateEditVisa = useCallback((index: number, field: keyof VisaFormItem, value: string | string[]) => {
    setEditPackageForm((prev) => {
      if (!prev) return prev;
      const next = [...prev.visas];
      if (!next[index]) return prev;
      next[index] = { ...next[index], [field]: value };
      return { ...prev, visas: next };
    });
  }, []);

  const addEditVisa = useCallback(() => {
    setEditPackageForm((prev) => {
      if (!prev) return prev;
      return { ...prev, visas: [...prev.visas, { ...defaultVisaItem(), id: `visa-${Date.now()}` }] };
    });
  }, []);

  const removeEditVisa = useCallback((index: number) => {
    setEditPackageForm((prev) => {
      if (!prev || prev.visas.length <= 1) return prev;
      return { ...prev, visas: prev.visas.filter((_, i) => i !== index) };
    });
  }, []);

  const saveEditPackage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPackageId || !editPackageForm) return;
    setEditPackageSaving(true);
    setEditPackageError(null);
    try {
      const payload = {
        name: editPackageForm.name,
        image: editPackageForm.image || undefined,
        description: editPackageForm.description || undefined,
        umrahType: editPackageForm.umrahType,
        programs: editPackageForm.programs.map((pr) => ({
          id: pr.id || undefined,
          name: pr.name,
          ApproximateDuration: pr.ApproximateDuration,
          departure: pr.departure,
          return: pr.return,
          from: pr.from,
          to: pr.to,
          description: pr.description,
          highlights: pr.highlights,
          includes: pr.includes,
        })),
        rooms: editPackageForm.rooms.map((r) => ({
          id: r.id || undefined,
          name: r.name,
          size: r.size,
          description: r.description,
          capacity: r.capacity,
          view: r.view,
          features: r.features,
          amenities: r.amenities,
        })),
        visas: editPackageForm.visas.map((v) => ({
          id: v.id || undefined,
          name: v.name,
          detail: v.detail,
          description: v.description,
          validity: v.validity,
          stay_duration: v.stay_duration,
          processing_time: v.processing_time,
          requirements: v.requirements,
          benefits: v.benefits,
        })),
      };
      const res = await fetch(`/api/packages/${editingPackageId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update package');
      closeEditPackage();
      await fetchPackages();
    } catch (e) {
      setEditPackageError(e instanceof Error ? e.message : 'Failed to update package');
    } finally {
      setEditPackageSaving(false);
    }
  };

  useEffect(() => {
    if (mounted && activeTab === 'users') fetchUsers();
  }, [mounted, activeTab, fetchUsers]);

  useEffect(() => {
    if (mounted && activeTab === 'packages') fetchPackages();
  }, [mounted, activeTab, fetchPackages]);

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
      case 'confirmed':
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
      case 'confirmed':
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
              className="lg:hidden p-2 hover:bg-slate-100 rounded-full transition-colors"
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
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-700 font-semibold hover:bg-red-100 transition-colors"
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
              { id: 'hajj', label: t('admin.hajj') || 'Hajj', icon: Compass },
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
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-full font-semibold transition-colors ${
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

              {/* Charts: Total users, Umrah bookings by package, Pending bookings */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart 1: Total users – premium card + hero number + bar */}
                <div className="relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white p-6 shadow-md shadow-slate-200/50 ring-1 ring-slate-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-white to-teal-50/30 pointer-events-none" />
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-l-2xl" />
                  <div className="relative flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                        <Users className="h-5 w-5" />
                      </div>
                      <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">{t('admin.chart_total_users') || 'Total users'}</h2>
                    </div>
                    <p className="text-4xl font-extrabold tabular-nums tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-teal-700 mb-5">
                      {stats?.totalUsers ?? 0}
                    </p>
                    <div className="h-20 rounded-xl bg-slate-100/60 p-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[{ name: t('admin.total_users') || 'Users', count: Math.max(stats?.totalUsers ?? 0, 1) }]}
                          layout="vertical"
                          margin={{ top: 0, right: 12, left: 0, bottom: 0 }}
                        >
                          <XAxis type="number" hide domain={[0, 'auto']} />
                          <YAxis type="category" dataKey="name" width={0} hide />
                          <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(5, 150, 105, 0.06)' }} />
                          <Bar dataKey="count" fill="url(#totalUsersGradient)" radius={[0, 12, 12, 0]} maxBarSize={36} isAnimationActive>
                            <LabelList dataKey="count" position="right" className="fill-slate-600 text-sm font-bold" />
                            <defs>
                              <linearGradient id="totalUsersGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#059669" />
                                <stop offset="50%" stopColor="#0d9488" />
                                <stop offset="100%" stopColor="#14b8a6" />
                              </linearGradient>
                            </defs>
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Chart 2: Umrah bookings by package – premium horizontal bars */}
                <div className="relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white p-6 shadow-md shadow-slate-200/50 ring-1 ring-slate-100 lg:col-span-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-50/30 via-white to-emerald-50/20 pointer-events-none" />
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-500 to-emerald-500 rounded-l-2xl" />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600">
                        <Package className="h-5 w-5" />
                      </div>
                      <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">{t('admin.chart_umrah_by_package') || 'Umrah bookings by package'}</h2>
                    </div>
                    <div className="h-72 min-h-[200px] rounded-xl bg-slate-50/50 p-4">
                      {(stats?.umrahBookingsByPackage?.length ?? 0) > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={(stats?.umrahBookingsByPackage ?? []).map((p) => ({
                              name: (p.packageName || p.packageSlug || '—').length > 24 ? (p.packageName || p.packageSlug || '—').slice(0, 22) + '…' : (p.packageName || p.packageSlug || '—'),
                              fullName: p.packageName || p.packageSlug || '—',
                              count: p.count,
                            }))}
                            layout="vertical"
                            margin={{ top: 8, right: 52, left: 8, bottom: 8 }}
                          >
                            <defs>
                              <linearGradient id="umrahBarGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#0d9488" />
                                <stop offset="50%" stopColor="#14b8a6" />
                                <stop offset="100%" stopColor="#2dd4bf" />
                              </linearGradient>
                              <filter id="umrahBarShadow" x="-10%" y="-10%" width="120%" height="120%">
                                <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodOpacity="0.12" floodColor="#0d9488" />
                              </filter>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                            <XAxis type="number" tick={{ fontSize: 12, fill: '#64748b', fontFamily: 'inherit' }} allowDecimals={false} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
                            <YAxis type="category" dataKey="name" width={128} tick={{ fontSize: 13, fill: '#334155', fontFamily: 'inherit' }} tickLine={false} axisLine={false} />
                            <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(13, 148, 136, 0.05)' }} />
                            <Bar dataKey="count" fill="url(#umrahBarGradient)" radius={[0, 10, 10, 0]} maxBarSize={32} isAnimationActive filter="url(#umrahBarShadow)">
                              <LabelList dataKey="count" position="right" className="fill-slate-600 text-sm font-bold" />
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="flex h-full flex-col items-center justify-center gap-3 rounded-xl bg-white/60 text-slate-500">
                          <Package className="h-12 w-12 text-slate-300" />
                          <p className="text-sm font-medium">{t('admin.no_packages') || 'No Umrah bookings yet'}</p>
                          <p className="text-xs text-slate-400">Bookings will appear here by package</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Chart 3: Pending bookings – donut with clear legend */}
                <div className="rounded-2xl border border-slate-200/60 bg-gradient-to-br from-white to-slate-50/50 p-6 shadow-sm lg:col-span-3">
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">{t('admin.chart_pending_bookings') || 'Bookings by status'}</h2>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-6">
                    <div className="h-64 w-64 shrink-0 mx-auto md:mx-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <defs>
                            <filter id="pieShadow" x="-20%" y="-20%" width="140%" height="140%">
                              <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.08" />
                            </filter>
                          </defs>
                          <Pie
                            data={[
                              { name: t('admin.pending') || 'Pending', value: stats?.bookingsByStatus?.pending ?? 0, color: '#f59e0b' },
                              { name: t('admin.approved') || 'Approved', value: stats?.bookingsByStatus?.approved ?? 0, color: '#059669' },
                              { name: t('admin.completed') || 'Completed', value: stats?.bookingsByStatus?.completed ?? 0, color: '#0d9488' },
                              { name: t('admin.cancelled') || 'Cancelled', value: stats?.bookingsByStatus?.cancelled ?? 0, color: '#dc2626' },
                            ].filter((d) => d.value > 0)}
                            cx="50%"
                            cy="50%"
                            innerRadius={56}
                            outerRadius={88}
                            paddingAngle={3}
                            dataKey="value"
                            stroke="white"
                            strokeWidth={2}
                            isAnimationActive
                          >
                            {[
                              { name: t('admin.pending') || 'Pending', value: stats?.bookingsByStatus?.pending ?? 0, color: '#f59e0b' },
                              { name: t('admin.approved') || 'Approved', value: stats?.bookingsByStatus?.approved ?? 0, color: '#059669' },
                              { name: t('admin.completed') || 'Completed', value: stats?.bookingsByStatus?.completed ?? 0, color: '#0d9488' },
                              { name: t('admin.cancelled') || 'Cancelled', value: stats?.bookingsByStatus?.cancelled ?? 0, color: '#dc2626' },
                            ]
                              .filter((d) => d.value > 0)
                              .map((entry, i) => (
                                <Cell key={i} fill={entry.color} filter="url(#pieShadow)" />
                              ))}
                          </Pie>
                          <Tooltip content={<PieTooltipContent />} />
                          {(stats?.bookingsByStatus?.pending ?? 0) + (stats?.bookingsByStatus?.approved ?? 0) + (stats?.bookingsByStatus?.completed ?? 0) + (stats?.bookingsByStatus?.cancelled ?? 0) === 0 && (
                            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-slate-400 text-sm font-medium">
                              {t('admin.no_bookings') || 'No bookings'}
                            </text>
                          )}
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
                      {[
                        { key: 'pending', label: t('admin.pending') || 'Pending', color: '#f59e0b', value: stats?.bookingsByStatus?.pending ?? 0 },
                        { key: 'approved', label: t('admin.approved') || 'Approved', color: '#059669', value: stats?.bookingsByStatus?.approved ?? 0 },
                        { key: 'completed', label: t('admin.completed') || 'Completed', color: '#0d9488', value: stats?.bookingsByStatus?.completed ?? 0 },
                        { key: 'cancelled', label: t('admin.cancelled') || 'Cancelled', color: '#dc2626', value: stats?.bookingsByStatus?.cancelled ?? 0 },
                      ].map(({ key, label, color, value }) => (
                        <div key={key} className="flex items-center gap-2">
                          <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: color }} />
                          <span className="text-sm text-slate-600">{label}:</span>
                          <span className="text-sm font-bold tabular-nums text-slate-800">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Bookings & Users */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Bookings */}
                <div className="bg-white rounded-xl shadow border border-slate-100 p-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">{t('admin.recent_bookings')}</h2>
                  <div className="space-y-4">
                    {recentBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-full hover:bg-slate-50 transition-colors">
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900 flex items-center gap-2">
                            {[booking.userFirstName, booking.userLastName].filter(Boolean).join(' ') || booking.userName || booking.userEmail || '—'}
                            {booking.isGuest && (
                              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-200 text-slate-700">
                                Guest
                              </span>
                            )}
                          </p>
                          <p className="text-sm text-slate-600">
                            {booking.umrahType === 'collective' ? 'Umrah Collective' : booking.umrahType === 'personalized' ? 'Umrah Personalized' : ''}
                            {booking.umrahType && (booking.packageName || booking.packageSlug) ? ' · ' : ''}
                            {booking.packageName || booking.packageSlug || booking.packageType || '—'}
                            {booking.program?.name ? ` · ${booking.program.name}` : ''}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(booking.status)}`}>
                            {getStatusIcon(booking.status)}
                            {t(`admin.${booking.status}`) || booking.status}
                          </span>
                          <p className="font-semibold text-emerald-700">{booking.amount ?? '—'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className="w-full mt-4 px-4 py-2 border border-emerald-200 text-emerald-700 font-semibold rounded-full hover:bg-emerald-50 transition-colors"
                  >
                    {t('admin.view_all_bookings')}
                  </button>
                </div>

                {/* Recent Users */}
                <div className="bg-white rounded-xl shadow border border-slate-100 p-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">{t('admin.recent_users')}</h2>
                  <div className="space-y-4">
                    {recentUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-full hover:bg-slate-50 transition-colors">
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
                  <button className="w-full mt-4 px-4 py-2 border border-emerald-200 text-emerald-700 font-semibold rounded-full hover:bg-emerald-50 transition-colors">
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
                {/* <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors">
                  <Plus className="h-5 w-5" />
                  {t('admin.add_package')}
                </button> */}
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
                      className="w-full  pl-10 pr-4  text-black py-2 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <select className="px-4 py-2 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option>{t('admin.filter_by_status')}</option>
                    <option>{t('admin.pending')}</option>
                    <option>{t('admin.approved')}</option>
                    <option>{t('admin.completed')}</option>
                  </select>
                </div>

                <div className="overflow-x-auto">
                  {bookingsLoading ? (
                    <div className="py-12 text-center text-slate-500">{t('common.loading')}</div>
                  ) : recentBookings.length === 0 ? (
                    <div className="py-12 text-center text-slate-500">
                      <BookOpen className="h-16 w-16 mx-auto mb-4 text-slate-300" />
                      <p>{t('user.no_bookings')}</p>
                    </div>
                  ) : (
                  <table className="w-full ">
                    <thead className="border-b-2 border-slate-200">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">{t('admin.booking_status')}</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Umrah type</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">{t('admin.package_name')}</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Program</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Room</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Visa</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">{t('form.first_name')}</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">{t('form.last_name')}</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">{t('admin.user_email')}</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">{t('user.phone')}</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">{t('admin.revenue')}</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">{t('user.booking_date')}</th>
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
                            {booking.isGuest && (
                              <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-200 text-slate-700">Guest</span>
                            )}
                          </td>
                          <td className="py-4 px-4 text-slate-700">
                            {booking.umrahType === 'collective' ? 'Collective' : booking.umrahType === 'personalized' ? 'Personalized' : '—'}
                          </td>
                          <td className="py-4 px-4 text-slate-700">{booking.packageName || booking.packageSlug || booking.packageType || '—'}</td>
                          <td className="py-4 px-4 text-slate-700">{booking.program?.name ?? '—'}</td>
                          <td className="py-4 px-4 text-slate-700">{booking.room?.name ?? '—'}</td>
                          <td className="py-4 px-4 text-slate-700">{booking.visa?.name ?? '—'}</td>
                          <td className="py-4 px-4 text-slate-700">{booking.userFirstName || booking.userName || '—'}</td>
                          <td className="py-4 px-4 text-slate-700">{booking.userLastName || '—'}</td>
                          <td className="py-4 px-4 text-slate-700">{booking.userEmail || '—'}</td>
                          <td className="py-4 px-4 text-slate-700">{booking.userPhone || '—'}</td>
                          <td className="py-4 px-4 font-semibold text-emerald-700">{booking.amount || '—'}</td>
                          <td className="py-4 px-4 text-slate-700">
                            {booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : '—'}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              {booking.status === 'pending' && (
                                <>
                                  <button
                                    onClick={() => handleValidateBooking(booking.id)}
                                    disabled={bookingActionLoadingId === booking.id}
                                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold hover:bg-emerald-200 transition-colors disabled:opacity-50"
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                    {t('admin.approve_booking')}
                                  </button>
                                  <button
                                    onClick={() => handleRejectBooking(booking.id)}
                                    disabled={bookingActionLoadingId === booking.id}
                                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition-colors disabled:opacity-50"
                                  >
                                    <AlertCircle className="h-4 w-4" />
                                    {t('admin.reject_booking')}
                                  </button>
                                </>
                              )}
                              {booking.status !== 'pending' && (
                                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(booking.status)}`}>
                                  {t(`admin.${booking.status}`)}
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Hajj Tab */}
          {activeTab === 'hajj' && (
            <div className="space-y-6 ">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">{t('admin.hajj') || 'Hajj'} {t('admin.reservations') || 'Reservations'}</h2>
                <button
                  type="button"
                  onClick={() => { setShowAddHajjModal(true); setHajjError(null); }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
                >
                  <Plus className="h-5 w-5" />
                  {t('admin.add_hajj_reservation') || 'Add Hajj reservation'}
                </button>
              </div>

              <div className="bg-white  rounded-xl shadow border border-slate-100 p-6">
                {hajjLoading ? (
                  <div className="py-12 text-center text-slate-500">{t('common.loading')}</div>
                ) : hajjReservations.length === 0 ? (
                  <div className="py-12 text-center text-slate-500">
                    <Compass className="h-16 w-16 mx-auto mb-4 text-slate-300" />
                    <p>{t('admin.no_hajj_reservations') || 'No Hajj reservations yet. Add one to book for a pilgrim via Nusuk.'}</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b-2 border-slate-200">
                        <tr>
                          <th className="text-left py-3 px-4 font-semibold text-slate-700">{t('form.first_name')}</th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-700">{t('form.last_name')}</th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-700">{t('user.email')}</th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-700">{t('user.phone')}</th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-700">{t('admin.nationality') || 'Nationality'}</th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-700">{t('admin.passport') || 'Passport'}</th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-700">{t('admin.status') || 'Status'}</th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-700">{t('admin.linked_user') || 'User'}</th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-700">{t('admin.actions')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {hajjReservations.map((r) => (
                          <tr key={r.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                            <td className="py-4 px-4 text-slate-700">{r.name}</td>
                            <td className="py-4 px-4 text-slate-700">{r.lastName}</td>
                            <td className="py-4 px-4 text-slate-700">{r.email}</td>
                            <td className="py-4 px-4 text-slate-700">{r.phone || '—'}</td>
                            <td className="py-4 px-4 text-slate-700">{r.nationality || '—'}</td>
                            <td className="py-4 px-4 text-slate-700">{r.passportNumber ? `${r.passportNumber}${r.passportExpiry ? ` (exp. ${r.passportExpiry})` : ''}` : '—'}</td>
                            <td className="py-4 px-4">
                              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(r.status)}`}>
                                {getStatusIcon(r.status)}
                                {t(`admin.${r.status}`) || r.status}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-slate-700">
                              {r.userId ? (
                                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">{t('admin.registered_user') || 'Registered'}</span>
                              ) : (
                                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-200 text-slate-700">{t('admin.guest') || 'Guest'}</span>
                              )}
                            </td>
                            <td className="py-4 px-4">
                              <button
                                type="button"
                                onClick={() => setHajjToDelete(r)}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                                {t('admin.delete')}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Add Hajj reservation modal */}
              {showAddHajjModal && (
                <div className="fixed inset-0  z-50 flex items-center justify-center p-4 bg-slate-900/60 overflow-y-auto">
                  <div className="bg-white h-[70vh] overflow-y-auto rounded-xl shadow-xl max-w-2xl w-full my-8 p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{t('admin.add_hajj_reservation') || 'Add Hajj reservation'}</h3>
                    <p className="text-sm text-slate-600 mb-4">{t('admin.hajj_reservation_help') || 'Add pilgrim details to book for them on Nusuk. Link to a registered user or enter as guest.'}</p>
                    {hajjError && (
                      <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">{hajjError}</div>
                    )}
                    <form onSubmit={submitHajjReservation} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{t('admin.reservation_for') || 'Reservation for'}</label>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="userType"
                              checked={hajjForm.userType === 'guest'}
                              onChange={() => setHajjForm((p) => ({ ...p, userType: 'guest', userId: '' }))}
                              className="text-emerald-600"
                            />
                            <span>{t('admin.guest') || 'Guest'}</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="userType"
                              checked={hajjForm.userType === 'user'}
                              onChange={() => setHajjForm((p) => ({ ...p, userType: 'user' }))}
                              className="text-emerald-600"
                            />
                            <span>{t('admin.registered_user') || 'Registered user'}</span>
                          </label>
                        </div>
                        {hajjForm.userType === 'user' && (
                          <select
                            value={hajjForm.userId}
                            onChange={(e) => {
                              const uid = e.target.value;
                              const u = apiUsers.find((x) => x.id === uid);
                              setHajjForm((p) => ({
                                ...p,
                                userId: uid,
                                name: u?.name ?? p.name,
                                lastName: u?.lastName ?? p.lastName,
                                email: u?.email ?? p.email,
                                phone: u?.phone ?? p.phone,
                              }));
                            }}
                            className="mt-2 w-full px-4 py-2 border border-slate-200 rounded-lg text-black focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                          >
                            <option value="">— {t('admin.select_user') || 'Select user'} —</option>
                            {apiUsers.map((u) => (
                              <option key={u.id} value={u.id}>
                                {[u.name, u.lastName].filter(Boolean).join(' ') || u.email} ({u.email})
                              </option>
                            ))}
                          </select>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">{t('form.first_name')} *</label>
                          <input
                            type="text"
                            value={hajjForm.name}
                            onChange={(e) => setHajjForm((p) => ({ ...p, name: e.target.value }))}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg text-black focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">{t('form.last_name')} *</label>
                          <input
                            type="text"
                            value={hajjForm.lastName}
                            onChange={(e) => setHajjForm((p) => ({ ...p, lastName: e.target.value }))}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg text-black focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{t('user.email')} *</label>
                        <input
                          type="email"
                          value={hajjForm.email}
                          onChange={(e) => setHajjForm((p) => ({ ...p, email: e.target.value }))}
                          className="w-full px-4 py-2 border border-slate-200 rounded-lg text-black focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{t('user.phone')}</label>
                        <input
                          type="tel"
                          value={hajjForm.phone}
                          onChange={(e) => setHajjForm((p) => ({ ...p, phone: e.target.value }))}
                          className="w-full px-4 py-2 border border-slate-200 rounded-lg text-black focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{t('admin.nationality') || 'Nationality'}</label>
                        <input
                          type="text"
                          value={hajjForm.nationality}
                          onChange={(e) => setHajjForm((p) => ({ ...p, nationality: e.target.value }))}
                          className="w-full px-4 py-2 border border-slate-200 rounded-lg text-black focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                          placeholder="e.g. Morocco, Saudi Arabia"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">{t('admin.passport_number') || 'Passport number'}</label>
                          <input
                            type="text"
                            value={hajjForm.passportNumber}
                            onChange={(e) => setHajjForm((p) => ({ ...p, passportNumber: e.target.value }))}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg text-black focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">{t('admin.passport_expiry') || 'Passport expiry'}</label>
                          <input
                            type="text"
                            value={hajjForm.passportExpiry}
                            onChange={(e) => setHajjForm((p) => ({ ...p, passportExpiry: e.target.value }))}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg text-black focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            placeholder="YYYY-MM-DD"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">{t('admin.date_of_birth') || 'Date of birth'}</label>
                          <input
                            type="text"
                            value={hajjForm.dateOfBirth}
                            onChange={(e) => setHajjForm((p) => ({ ...p, dateOfBirth: e.target.value }))}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg text-black focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            placeholder="YYYY-MM-DD"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">{t('admin.gender') || 'Gender'}</label>
                          <select
                            value={hajjForm.gender}
                            onChange={(e) => setHajjForm((p) => ({ ...p, gender: e.target.value }))}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg text-black focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                          >
                            <option value="">—</option>
                            <option value="male">{t('admin.male') || 'Male'}</option>
                            <option value="female">{t('admin.female') || 'Female'}</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">{t('admin.travel_date') || 'Travel date'}</label>
                          <input
                            type="date"
                            value={hajjForm.travelDate}
                            onChange={(e) => setHajjForm((p) => ({ ...p, travelDate: e.target.value }))}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg text-black focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">{t('admin.return_date') || 'Return date'}</label>
                          <input
                            type="date"
                            value={hajjForm.returnDate}
                            onChange={(e) => setHajjForm((p) => ({ ...p, returnDate: e.target.value }))}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg text-black focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{t('admin.notes') || 'Notes'}</label>
                        <textarea
                          value={hajjForm.notes}
                          onChange={(e) => setHajjForm((p) => ({ ...p, notes: e.target.value }))}
                          rows={3}
                          className="w-full px-4 py-2 border border-slate-200 rounded-lg text-black focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
                        />
                      </div>
                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => { setShowAddHajjModal(false); setHajjError(null); }}
                          className="flex-1 px-4 py-2 border border-slate-200 rounded-full font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          {t('common.cancel')}
                        </button>
                        <button
                          type="submit"
                          disabled={hajjSubmitLoading}
                          className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-full font-semibold hover:bg-emerald-700 disabled:opacity-50"
                        >
                          {hajjSubmitLoading ? t('common.loading') : (t('admin.add_hajj_reservation') || 'Add reservation')}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Delete Hajj reservation modal */}
              {hajjToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60">
                  <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{t('admin.delete_hajj_reservation') || 'Delete Hajj reservation?'}</h3>
                    <p className="text-slate-600 mb-6">
                      {t('admin.confirm_delete_hajj') || 'Remove reservation for'} {hajjToDelete.name} {hajjToDelete.lastName}?
                    </p>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setHajjToDelete(null)}
                        className="flex-1 px-4 py-2 border border-slate-200 rounded-full font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        {t('common.cancel')}
                      </button>
                      <button
                        onClick={handleDeleteHajjReservation}
                        disabled={hajjDeleteLoading}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 disabled:opacity-50"
                      >
                        {hajjDeleteLoading ? t('common.loading') : t('admin.delete')}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">{t('admin.manage_users')}</h2>
              </div>

              {promoteStatus && (
                <div className={`p-4 rounded-full ${promoteStatus === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                  {promoteStatus === 'success' ? t('admin.promote_success') : t('admin.promote_failed')}
                </div>
              )}

              {/* Edit User Modal */}
              {showEditUserModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60">
                  <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{t('admin.edit_user')}</h3>
                    <form onSubmit={saveEditUser} className="space-y-4">
                      {editUserError && (
                        <p className="text-red-600 text-sm">{editUserError}</p>
                      )}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{t('form.first_name')}</label>
                        <input
                          type="text"
                          value={editUserForm.name}
                          onChange={(e) => setEditUserForm((p) => ({ ...p, name: e.target.value }))}
                          className="w-full text-black px-4 py-2 border border-slate-200 rounded-full focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{t('form.last_name')}</label>
                        <input
                          type="text"
                          value={editUserForm.lastName}
                          onChange={(e) => setEditUserForm((p) => ({ ...p, lastName: e.target.value }))}
                          className="w-full  text-black px-4 py-2 border border-slate-200 rounded-full focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{t('user.email')}</label>
                        <input
                          type="email"
                          value={editUserForm.email}
                          onChange={(e) => setEditUserForm((p) => ({ ...p, email: e.target.value }))}
                          className="w-full px-4 py-2  text-black border border-slate-200 rounded-full focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{t('user.phone')}</label>
                        <input
                          type="tel"
                          value={editUserForm.phone}
                          onChange={(e) => setEditUserForm((p) => ({ ...p, phone: e.target.value }))}
                          className="w-full px-4 text-black py-2 border border-slate-200 rounded-full focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{t('admin.role')}</label>
                        <select
                          value={editUserForm.role}
                          onChange={(e) => setEditUserForm((p) => ({ ...p, role: e.target.value as 'user' | 'admin' }))}
                          className="w-full px-4 py-2 border border-slate-200 rounded-full focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        >
                          <option value="user">{t('admin.user_role')}</option>
                          <option value="admin">{t('admin.admin_role')}</option>
                        </select>
                      </div>
                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={cancelEditUser}
                          className="flex-1 px-4 py-2 border border-slate-200 rounded-full font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          {t('common.cancel')}
                        </button>
                        <button
                          type="submit"
                          disabled={editUserLoading}
                          className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-full font-semibold hover:bg-emerald-700 disabled:opacity-50"
                        >
                          {editUserLoading ? t('common.loading') : t('admin.edit')}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Delete User Confirmation Modal */}
              {userToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60">
                  <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{t('admin.delete_user')}</h3>
                    <p className="text-slate-600 mb-6">
                      {t('admin.confirm_delete_user', { email: userToDelete.email })}
                    </p>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setUserToDelete(null)}
                        className="flex-1 px-4 py-2 border border-slate-200 rounded-full font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        {t('common.cancel')}
                      </button>
                      <button
                        onClick={handleDeleteUser}
                        disabled={deleteUserLoading}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 disabled:opacity-50"
                      >
                        {deleteUserLoading ? t('common.loading') : t('admin.delete')}
                      </button>
                    </div>
                  </div>
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
                      className="w-full  text-black pl-10 pr-4 py-2 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                              <div className="flex items-center gap-2 flex-wrap">
                                <button
                                  onClick={() => openEditUser(user)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-colors text-sm"
                                  title={t('admin.edit_user')}
                                >
                                  <Edit className="h-4 w-4" />
                                  {t('admin.edit')}
                                </button>
                                {user.role === 'user' && (
                                  <button
                                    onClick={() => promoteUser(user.id)}
                                    disabled={!!promoteLoadingId}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold hover:bg-emerald-200 disabled:opacity-50 transition-colors text-sm"
                                  >
                                    <ShieldPlus className="h-4 w-4" />
                                    {promoteLoadingId === user.id ? t('common.loading') : t('admin.make_admin')}
                                  </button>
                                )}
                                <button
                                  onClick={() => setUserToDelete(user)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition-colors text-sm"
                                  title={t('admin.delete_user')}
                                >
                                  <Trash2 className="h-4 w-4" />
                                  {t('admin.delete')}
                                </button>
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
                <div className="flex items-center gap-3">
                  <Link
                    href="/umrah/collective"
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-200 text-emerald-700 font-semibold hover:bg-emerald-50 transition-colors"
                  >
                    <Eye className="h-5 w-5" />
                    {t('admin.view_packages')}
                  </Link>
                  <button
                    onClick={() => {
                      setShowPackageForm(true);
                      setPackageAddStep(1);
                      setPackageIsUmrah(null);
                      setPackageUmrahType(null);
                      setPackageForm({ title: '', image: '', description: '' });
                      setPackageError(null);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    <Plus className="h-5 w-5" />
                    {t('admin.add_package')}
                  </button>
                  <button
                    type="button"
                    onClick={seedRamadanPackage}
                    disabled={seedRamadanLoading}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-amber-200 bg-amber-50 text-amber-800 font-semibold hover:bg-amber-100 disabled:opacity-50 transition-colors"
                  >
                    {seedRamadanLoading ? t('common.loading') : t('admin.seed_ramadan_package')}
                  </button>
                </div>
              </div>
              {seedRamadanError && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-700 text-sm">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {seedRamadanError}
                </div>
              )}

              {/* Add Package Modal – multi-step */}
              {showPackageForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60">
                  <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                    {packageAddStep === 1 && (
                      <>
                        <h3 className="text-xl font-bold text-slate-900 mb-4">{t('admin.add_package')}</h3>
                        <p className="text-slate-600 mb-6">{t('admin.add_package_umrah_question')}</p>
                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() => {
                              setPackageIsUmrah(true);
                              setPackageAddStep(2);
                            }}
                            className="flex-1 px-4 py-3 bg-emerald-600 text-white rounded-full font-semibold hover:bg-emerald-700"
                          >
                            {t('admin.add_package_yes')}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setPackageIsUmrah(false);
                            }}
                            className="flex-1 px-4 py-3 border border-slate-200 rounded-full font-semibold text-slate-700 hover:bg-slate-50"
                          >
                            {t('admin.add_package_no')}
                          </button>
                        </div>
                        {packageIsUmrah === false && (
                          <p className="mt-4 text-amber-700 text-sm">{t('admin.only_umrah_supported')}</p>
                        )}
                        <div className="mt-6 flex justify-end">
                          <button
                            type="button"
                            onClick={resetPackageForm}
                            className="px-4 py-2 border border-slate-200 rounded-full font-semibold text-slate-700 hover:bg-slate-50"
                          >
                            {t('common.cancel')}
                          </button>
                        </div>
                      </>
                    )}
                    {packageAddStep === 2 && (
                      <>
                        <h3 className="text-xl font-bold text-slate-900 mb-4">{t('admin.add_package')}</h3>
                        <p className="text-slate-600 mb-6">{t('admin.add_package_choose_type')}</p>
                        <div className="flex gap-3 mb-6">
                          <button
                            type="button"
                            onClick={() => {
                              setPackageUmrahType('collective');
                              setPackageAddStep(3);
                            }}
                            className="flex-1 px-4 py-3 border-2 border-emerald-200 bg-emerald-50 text-emerald-800 rounded-full font-semibold hover:bg-emerald-100"
                          >
                            {t('admin.add_package_collective')}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setPackageUmrahType('personalized');
                              setPackageAddStep(3);
                            }}
                            className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-full font-semibold text-slate-700 hover:bg-slate-50"
                          >
                            {t('admin.add_package_personalized')}
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => setPackageAddStep(1)}
                          className="text-slate-600 text-sm font-medium hover:text-slate-900"
                        >
                          ← {t('common.cancel')}
                        </button>
                      </>
                    )}
                    {packageAddStep === 3 && (
                      <form onSubmit={handleAddPackage} className="space-y-4">
                        <h3 className="text-xl font-bold text-slate-900 mb-1">{t('admin.add_package_details')}</h3>
                        <p className="text-sm text-slate-500 mb-4">
                          {packageUmrahType === 'collective' ? t('admin.add_package_collective') : t('admin.add_package_personalized')}
                        </p>
                        {packageError && (
                          <p className="text-red-600 text-sm">{packageError}</p>
                        )}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">{t('admin.package_name')}</label>
                          <input
                            type="text"
                            value={packageForm.title}
                            onChange={(e) => setPackageForm((p) => ({ ...p, title: e.target.value }))}
                            placeholder="e.g. Ramadan Umrah 2026"
                            className="w-full px-4  text-black py-2 border border-slate-200 rounded-full focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">{t('admin.package_image')}</label>
                          <input
                            ref={addPackageImageInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              setAddPackageImageUploading(true);
                              setPackageError(null);
                              try {
                                const formData = new FormData();
                                formData.append('file', file);
                                const res = await fetch('/api/upload', {
                                  method: 'POST',
                                  credentials: 'include',
                                  body: formData,
                                });
                                const data = await res.json();
                                if (!res.ok) throw new Error(data.error || 'Upload failed');
                                setPackageForm((p) => ({ ...p, image: data.url }));
                              } catch (err) {
                                setPackageError(err instanceof Error ? err.message : 'Upload failed');
                              } finally {
                                setAddPackageImageUploading(false);
                                e.target.value = '';
                              }
                            }}
                          />
                          <div className="flex items-center gap-4">
                            {packageForm.image && (
                              <div className="w-16 h-16 rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
                                <img src={packageForm.image} alt="" className="w-full h-full object-cover" />
                              </div>
                            )}
                            <button
                              type="button"
                              onClick={() => addPackageImageInputRef.current?.click()}
                              disabled={addPackageImageUploading}
                              className="px-4 py-2 border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                            >
                              {addPackageImageUploading ? t('common.loading') : t('admin.upload_image')}
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">{t('admin.package_description')}</label>
                          <textarea
                            value={packageForm.description}
                            onChange={(e) => setPackageForm((p) => ({ ...p, description: e.target.value }))}
                            placeholder="Brief description of the package"
                            rows={3}
                            className="w-full px-4 py-2 border border-slate-200 rounded-full focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
                          />
                        </div>
                        <div className="flex gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => setPackageAddStep(2)}
                            className="px-4 py-2 border border-slate-200 rounded-full font-semibold text-slate-700 hover:bg-slate-50"
                          >
                            ← Back
                          </button>
                          <button
                            type="button"
                            onClick={resetPackageForm}
                            className="flex-1 px-4 py-2 border border-slate-200 rounded-full font-semibold text-slate-700 hover:bg-slate-50"
                          >
                            {t('common.cancel')}
                          </button>
                          <button
                            type="submit"
                            disabled={packageSubmitLoading}
                            className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-full font-semibold hover:bg-emerald-700 disabled:opacity-50"
                          >
                            {packageSubmitLoading ? t('common.loading') : t('admin.add_package')}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              )}

              {/* Edit Package Modal */}
              {editingPackageId && (
                <div className="fixed  inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 overflow-y-auto">
                  <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full my-8 h-[70vh] overflow-y-auto">
                    {editPackageLoading ? (
                      <div className="p-12 text-center text-slate-500">{t('common.loading')}</div>
                    ) : editPackageForm ? (
                      <form onSubmit={saveEditPackage} className="p-6 space-y-6">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                          <h3 className="text-xl font-bold text-slate-900">{t('admin.update_package')}</h3>
                          <button type="button" onClick={closeEditPackage} className="p-2 hover:bg-slate-100 rounded-full text-slate-600">
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                        {editPackageError && (
                          <p className="text-red-600 text-sm">{editPackageError}</p>
                        )}
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t('admin.package_name')}</label>
                            <input
                              type="text"
                              value={editPackageForm.name}
                              onChange={(e) => setEditPackageForm((p) => p ? { ...p, name: e.target.value } : p)}
                              className="w-full px-4 py-2   border text-black border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t('admin.package_image')}</label>
                            <input
                              ref={editPackageImageInputRef}
                              type="file"
                              accept="image/jpeg,image/png,image/webp,image/gif"
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file || !editPackageForm) return;
                                setEditPackageImageUploading(true);
                                setEditPackageError(null);
                                try {
                                  const formData = new FormData();
                                  formData.append('file', file);
                                  const res = await fetch('/api/upload', {
                                    method: 'POST',
                                    credentials: 'include',
                                    body: formData,
                                  });
                                  const data = await res.json();
                                  if (!res.ok) throw new Error(data.error || 'Upload failed');
                                  setEditPackageForm((p) => p ? { ...p, image: data.url } : p);
                                } catch (err) {
                                  setEditPackageError(err instanceof Error ? err.message : 'Upload failed');
                                } finally {
                                  setEditPackageImageUploading(false);
                                  e.target.value = '';
                                }
                              }}
                            />
                            <div className="flex items-center gap-4">
                              {editPackageForm.image && (
                                <div className="w-20 h-20 rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
                                  <img src={editPackageForm.image} alt="" className="w-full h-full object-cover" />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <button
                                  type="button"
                                  onClick={() => editPackageImageInputRef.current?.click()}
                                  disabled={editPackageImageUploading}
                                  className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                                >
                                  {editPackageImageUploading ? t('common.loading') : t('admin.upload_image')}
                                </button>
                                {editPackageForm.image && (
                                  <p className="mt-1 text-xs text-slate-500 truncate">{editPackageForm.image}</p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                            <select
                              value={editPackageForm.umrahType}
                              onChange={(e) => setEditPackageForm((p) => p ? { ...p, umrahType: e.target.value as 'collective' | 'personalized' } : p)}
                              className="w-full px-4 py-2 border text-black border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            >
                              <option value="collective">{t('admin.add_package_collective')}</option>
                              <option value="personalized">{t('admin.add_package_personalized')}</option>
                            </select>
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t('admin.package_description')}</label>
                            <textarea
                              value={editPackageForm.description}
                              onChange={(e) => setEditPackageForm((p) => p ? { ...p, description: e.target.value } : p)}
                              rows={3}
                              className="w-full px-4 py-2 border text-black border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
                            />
                          </div>
                        </div>

                        <div className="border-t border-slate-200 pt-4">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold text-slate-900">{t('admin.package_programs')}</h4>
                            <button type="button" onClick={addEditProgram} className="flex items-center gap-1 px-3 py-1.5 text-sm bg-emerald-100 text-emerald-700 rounded-lg font-semibold hover:bg-emerald-200">
                              <Plus className="h-4 w-4" /> {t('admin.add_program')}
                            </button>
                          </div>
                          <div className="space-y-4">
                            {editPackageForm.programs.map((pr, idx) => (
                              <div key={idx} className="p-4 border border-slate-200 rounded-lg bg-slate-50/50 space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-slate-700">Program {idx + 1}</span>
                                  {editPackageForm.programs.length > 1 && (
                                    <button type="button" onClick={() => removeEditProgram(idx)} className="text-red-600 text-sm font-semibold hover:bg-red-50 px-2 py-1 rounded">
                                      {t('admin.remove')}
                                    </button>
                                  )}
                                </div>
                                <div className="grid gap-2 sm:grid-cols-2">
                                  <input placeholder="ID (e.g. ramadan-journey)" value={pr.id} onChange={(e) => updateEditProgram(idx, 'id', e.target.value)} className="text-black w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                                  <input placeholder="Name" value={pr.name} onChange={(e) => updateEditProgram(idx, 'name', e.target.value)} className="text-black w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                                  <input placeholder="Duration (e.g. 15 Days)" value={pr.ApproximateDuration} onChange={(e) => updateEditProgram(idx, 'ApproximateDuration', e.target.value)} className="text-black w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                                  <input placeholder="Departure date" value={pr.departure} onChange={(e) => updateEditProgram(idx, 'departure', e.target.value)} className="text-black w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                                  <input placeholder="Return date" value={pr.return} onChange={(e) => updateEditProgram(idx, 'return', e.target.value)} className="text-black w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                                  <input placeholder="From (city)" value={pr.from} onChange={(e) => updateEditProgram(idx, 'from', e.target.value)} className="text-black w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                                  <input placeholder="To (destination)" value={pr.to} onChange={(e) => updateEditProgram(idx, 'to', e.target.value)} className="text-black w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                                </div>
                                <textarea placeholder="Description" value={pr.description} onChange={(e) => updateEditProgram(idx, 'description', e.target.value)} rows={2} className="w-full  text-black px-3 py-2 border border-slate-200 rounded-lg text-sm resize-none" />
                                <div>
                                  <label className="block text-xs font-medium text-slate-600 mb-1">Highlights (one per line)</label>
                                  <textarea
                                    value={pr.highlights.join('\n')}
                                    onChange={(e) => updateEditProgram(idx, 'highlights', e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))}
                                    rows={2}
                                    className="w-full text-black px-3 py-2 border border-slate-200 rounded-lg text-sm resize-none"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-slate-600 mb-1">Includes (one per line)</label>
                                  <textarea
                                    value={pr.includes.join('\n')}
                                    onChange={(e) => updateEditProgram(idx, 'includes', e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))}
                                    rows={2}
                                    className="w-full  text-black px-3 py-2 border border-slate-200 rounded-lg text-sm resize-none"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="border-t border-slate-200 pt-4">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold text-slate-900">{t('admin.package_rooms')}</h4>
                            <button type="button" onClick={addEditRoom} className="flex items-center gap-1 px-3 py-1.5 text-sm bg-emerald-100 text-emerald-700 rounded-lg font-semibold hover:bg-emerald-200">
                              <Plus className="h-4 w-4" /> {t('admin.add_room')}
                            </button>
                          </div>
                          <div className="space-y-4">
                            {editPackageForm.rooms.map((room, idx) => (
                              <div key={idx} className="p-4 border border-slate-200 rounded-lg bg-slate-50/50 space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-slate-700">Room {idx + 1}</span>
                                  {editPackageForm.rooms.length > 1 && (
                                    <button type="button" onClick={() => removeEditRoom(idx)} className="text-red-600 text-sm font-semibold hover:bg-red-50 px-2 py-1 rounded">{t('admin.remove')}</button>
                                  )}
                                </div>
                                <div className="grid gap-2 sm:grid-cols-2">
                                  <input placeholder="ID (e.g. twin)" value={room.id} onChange={(e) => updateEditRoom(idx, 'id', e.target.value)} className="text-black w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                                  <input placeholder="Name" value={room.name} onChange={(e) => updateEditRoom(idx, 'name', e.target.value)} className="text-black w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                                  <input placeholder="Size" value={room.size} onChange={(e) => updateEditRoom(idx, 'size', e.target.value)} className="text-black w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                                  <input placeholder="Capacity" value={room.capacity} onChange={(e) => updateEditRoom(idx, 'capacity', e.target.value)} className="text-black w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                                  <input placeholder="View" value={room.view} onChange={(e) => updateEditRoom(idx, 'view', e.target.value)} className="text-black w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                                </div>
                                <textarea placeholder="Description" value={room.description} onChange={(e) => updateEditRoom(idx, 'description', e.target.value)} rows={2} className="w-full text-black px-3 py-2 border border-slate-200 rounded-lg text-sm resize-none" />
                                <div>
                                  <label className="block text-xs font-medium text-slate-600 mb-1">Features (one per line)</label>
                                  <textarea value={room.features.join('\n')} onChange={(e) => updateEditRoom(idx, 'features', e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))} rows={2} className="w-full text-black px-3 py-2 border border-slate-200 rounded-lg text-sm resize-none" />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-slate-600 mb-1">Amenities (one per line)</label>
                                  <textarea value={room.amenities.join('\n')} onChange={(e) => updateEditRoom(idx, 'amenities', e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))} rows={2} className="w-full text-black px-3 py-2 border border-slate-200 rounded-lg text-sm resize-none" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="border-t border-slate-200 pt-4">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold text-slate-900">{t('admin.package_visas')}</h4>
                            <button type="button" onClick={addEditVisa} className="flex items-center gap-1 px-3 py-1.5 text-sm bg-emerald-100 text-emerald-700 rounded-lg font-semibold hover:bg-emerald-200">
                              <Plus className="h-4 w-4" /> {t('admin.add_visa')}
                            </button>
                          </div>
                          <div className="space-y-4">
                            {editPackageForm.visas.map((visa, idx) => (
                              <div key={idx} className="p-4 border border-slate-200 rounded-lg bg-slate-50/50 space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-slate-700">Visa {idx + 1}</span>
                                  {editPackageForm.visas.length > 1 && (
                                    <button type="button" onClick={() => removeEditVisa(idx)} className="text-red-600 text-sm font-semibold hover:bg-red-50 px-2 py-1 rounded">{t('admin.remove')}</button>
                                  )}
                                </div>
                                <div className="grid gap-2 sm:grid-cols-2">
                                  <input placeholder="ID (e.g. umrah)" value={visa.id} onChange={(e) => updateEditVisa(idx, 'id', e.target.value)} className="text-black w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                                  <input placeholder="Name" value={visa.name} onChange={(e) => updateEditVisa(idx, 'name', e.target.value)} className="text-black w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                                  <input placeholder="Detail" value={visa.detail} onChange={(e) => updateEditVisa(idx, 'detail', e.target.value)} className="text-black w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                                  <input placeholder="Validity" value={visa.validity} onChange={(e) => updateEditVisa(idx, 'validity', e.target.value)} className="text-black w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                                  <input placeholder="Stay duration" value={visa.stay_duration} onChange={(e) => updateEditVisa(idx, 'stay_duration', e.target.value)} className="text-black w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                                  <input placeholder="Processing time" value={visa.processing_time} onChange={(e) => updateEditVisa(idx, 'processing_time', e.target.value)} className="text-black w-full px-3 py-2 border border-slate-200 rounded-lg text-sm sm:col-span-2" />
                                </div>
                                <textarea placeholder="Description" value={visa.description} onChange={(e) => updateEditVisa(idx, 'description', e.target.value)} rows={2} className="w-full text-black px-3 py-2 border border-slate-200 rounded-lg text-sm resize-none" />
                                <div>
                                  <label className="block text-xs font-medium text-slate-600 mb-1">Requirements (one per line)</label>
                                  <textarea value={visa.requirements.join('\n')} onChange={(e) => updateEditVisa(idx, 'requirements', e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))} rows={2} className="w-full text-black px-3 py-2 border border-slate-200 rounded-lg text-sm resize-none" />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-slate-600 mb-1">Benefits (one per line)</label>
                                  <textarea value={visa.benefits.join('\n')} onChange={(e) => updateEditVisa(idx, 'benefits', e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))} rows={2} className="w-full text-black px-3 py-2 border border-slate-200 rounded-lg text-sm resize-none" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-3 pt-4 border-t border-slate-200">
                          <button type="button" onClick={closeEditPackage} className="flex-1 px-4 py-2 border border-slate-200 rounded-full font-semibold text-slate-700 hover:bg-slate-50">
                            {t('common.cancel')}
                          </button>
                          <button type="submit" disabled={editPackageSaving} className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-full font-semibold hover:bg-emerald-700 disabled:opacity-50">
                            {editPackageSaving ? t('common.loading') : t('admin.save_changes')}
                          </button>
                        </div>
                      </form>
                    ) : null}
                  </div>
                </div>
              )}

              <div className="bg-white rounded-xl shadow border border-slate-100 p-6">
                {packagesLoading ? (
                  <div className="py-12 text-center text-slate-500">{t('common.loading')}</div>
                ) : packages.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-600 mb-2">{t('admin.no_packages')}</p>
                    <p className="text-sm text-slate-500">{t('admin.add_first_package')}</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {packages.map((pkg) => (
                      <div
                        key={pkg.id}
                        className="flex items-center gap-4 p-4 border border-slate-100 rounded-full hover:bg-slate-50"
                      >
                        <div className="w-16 h-16 rounded-full bg-slate-100 overflow-hidden shrink-0">
                          {pkg.image ? (
                            <img src={pkg.image} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="h-8 w-8 text-slate-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-900 flex items-center gap-2">
                            {pkg.name}
                            {pkg.umrahType && (
                              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${pkg.umrahType === 'collective' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'}`}>
                                {pkg.umrahType === 'collective' ? t('admin.add_package_collective') : t('admin.add_package_personalized')}
                              </span>
                            )}
                          </p>
                          <p className="text-sm text-slate-600 truncate">{pkg.description || '—'}</p>
                          <p className="text-xs text-slate-400">/{pkg.slug}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => openEditPackage(pkg)}
                            className="p-2 hover:bg-emerald-100 rounded-full text-emerald-700 transition-colors"
                            title={t('admin.update_package')}
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePackage(pkg.id)}
                            className="p-2 hover:bg-red-100 rounded-full text-red-600 transition-colors"
                            title={t('admin.delete_package')}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
                      <button className="flex items-center gap-2 px-4 py-2 text-emerald-700 font-semibold hover:bg-emerald-50 rounded-full transition-colors">
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
                  { title: t('admin.user_management'), icon: Users, action: () => setActiveTab('users') },
                ].map((setting, idx) => {
                  const Icon = setting.icon;
                  return (
                    <div key={idx} className="bg-white rounded-xl shadow border border-slate-100 p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center gap-3 mb-4">
                        <Icon className="h-8 w-8 text-emerald-600" />
                        <h3 className="text-lg font-bold text-slate-900">{setting.title}</h3>
                      </div>
                      <button
                        onClick={() => (setting as { action?: () => void }).action?.()}
                        className="px-4 py-2 border border-emerald-200 text-emerald-700 font-semibold rounded-full hover:bg-emerald-50 transition-colors"
                      >
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
