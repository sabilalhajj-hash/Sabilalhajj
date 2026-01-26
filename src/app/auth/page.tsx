'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

function AuthPageContent() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '';
  const [mounted, setMounted] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Sign in state
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Sign up state
  const [signUpData, setSignUpData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    
    // Handle OAuth callback messages
    const errorParam = searchParams.get('error');
    const successParam = searchParams.get('success');
    
    if (errorParam) {
      switch (errorParam) {
        case 'oauth_config_error':
          setError(t('auth.oauth_config_error'));
          break;
        case 'invalid_state':
          setError(t('auth.oauth_invalid_state'));
          break;
        case 'token_exchange_failed':
          setError(t('auth.oauth_token_failed'));
          break;
        case 'user_info_failed':
          setError(t('auth.oauth_user_info_failed'));
          break;
        case 'oauth_error':
          setError(t('auth.oauth_error'));
          break;
        default:
          setError(t('auth.oauth_error'));
      }
      // Clean URL
      router.replace('/auth', { scroll: false });
    }
    
    if (successParam === 'google_signin') {
      setSuccess(t('auth.google_signin_success'));
      // Redirect after successful login
      setTimeout(() => {
        // Check user role and redirect
        fetch('/api/auth/me', { credentials: 'include' })
          .then(res => res.json())
          .then(data => {
            if (data.user) {
              const isAdmin = data.user.role === 'admin';
              const allowedRedirects = ['/admin', '/user'];
              const target = allowedRedirects.includes(redirectTo)
                ? (redirectTo === '/admin' && !isAdmin ? '/user' : redirectTo)
                : (isAdmin ? '/admin' : '/user');
              router.push(target);
            } else {
              router.push('/');
            }
          })
          .catch(() => {
            router.push('/');
          });
      }, 1500);
      // Clean URL
      router.replace('/auth', { scroll: false });
    }
  }, [mounted, searchParams, router, t, redirectTo]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrUsername, password }),
        credentials: 'include',
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || t('auth.login_failed'));
        setIsLoading(false);
        return;
      }
      
      const user = data.user as { role?: string };
      const isAdmin = user?.role === 'admin';
      const allowedRedirects = ['/admin', '/user'];
      const target = allowedRedirects.includes(redirectTo)
        ? (redirectTo === '/admin' && !isAdmin ? '/user' : redirectTo)
        : (isAdmin ? '/admin' : '/user');
      router.push(target);
    } catch (err) {
      setError(t('auth.error_occurred'));
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    // Validate password length
    if (signUpData.password.length < 8) {
      setError(t('auth.password_min_length'));
      return;
    }
    
    // Validate passwords match
    if (signUpData.password !== signUpData.confirmPassword) {
      setError(t('auth.passwords_not_match'));
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: signUpData.email,
          password: signUpData.password,
          name: signUpData.firstName || undefined,
          lastName: signUpData.lastName || undefined,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || t('auth.registration_failed'));
        setIsLoading(false);
        return;
      }
      
      setSuccess(t('auth.registration_success'));
      // Reset form
      setSignUpData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      
      // Switch to sign in after 2 seconds
      setTimeout(() => {
        setIsSignUp(false);
        setSuccess(null);
        setIsLoading(false);
      }, 2000);
    } catch (err) {
      setError(t('auth.error_occurred'));
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setError(null);
    setSuccess(null);
    // Redirect to Google OAuth route
    window.location.href = '/api/auth/google';
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-8">
        <div className="animate-pulse text-emerald-700 font-semibold" suppressHydrationWarning>Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full relative overflow-hidden">
      {/* Full-screen background */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/hajj1.jpg)',
          }}
        />
      </div>

      {/* Main form card */}
      <div className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
        <div className="w-full max-w-5xl bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row mx-auto">
          {/* Left Column - Visual/Branding Panel */}
          <div 
            className="hidden lg:flex w-full lg:w-[45%] relative bg-cover bg-center bg-no-repeat items-start justify-center p-6 md:p-8 min-h-[200px] lg:min-h-auto"
            style={{
              backgroundImage: 'url(/hajj3.jpg)',
            }}
          >
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30" />
            
            {/* Branding content - positioned at top */}
            <div className="relative z-10 flex flex-col items-center justify-start mt-8 lg:mt-12">
              <div className="bg-white/95 rounded-xl p-3 md:p-4 flex items-center space-x-2 md:space-x-3 shadow-lg">
                <Image
                  src="/sabilalhajj-removebg.png"
                  alt="Sabil alHajj Logo"
                  width={50}
                  height={50}
                  className="object-contain w-12 h-12 md:w-14 md:h-14 lg:w-[60px] lg:h-[60px]"
                />
                <h2 className="text-xl md:text-2xl font-bold text-yellow-500">
                  Sabil alHajj
                </h2>
              </div>
            </div>
          </div>

          {/* Mobile Logo - Show on small screens */}
          <div className="lg:hidden flex items-center justify-center pt-6 pb-4 px-6 bg-white border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <Image
                src="/sabilalhajj-removebg.png"
                alt="Sabil alHajj Logo"
                width={50}
                height={50}
                className="object-contain w-12 h-12"
              />
              <h2 className="text-xl font-bold text-emerald-600">
                Sabil alHajj
              </h2>
            </div>
          </div>

          {/* Right Column - Form Panel */}
          <div className="w-full lg:w-[55%] bg-white p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">
            {/* Title */}
            <div className="relative h-12 sm:h-14 mb-6 sm:mb-8 md:mb-10">
              <h1 
                key={`title-${isSignUp ? 'signup' : 'signin'}`}
                className={`absolute inset-0 text-2xl sm:text-3xl md:text-4xl font-bold text-black transition-all duration-300 ${
                  isTransitioning 
                    ? 'opacity-0 translate-y-2' 
                    : 'opacity-100 translate-y-0'
                }`}
              >
                {isSignUp ? t('common.sign_up') : t('common.sign_in')}
              </h1>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="mb-3 sm:mb-4 p-2.5 sm:p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-3 sm:mb-4 p-2.5 sm:p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs sm:text-sm">
                {success}
              </div>
            )}

            {/* Sign in Form */}
            <div className="relative min-h-[350px] sm:min-h-[400px]">
              {!isSignUp && (
                <form 
                  onSubmit={handleSignIn} 
                  key="sign-in-form"
                  className={`space-y-4 sm:space-y-5 md:space-y-6 transition-all duration-300 ${
                    isTransitioning 
                      ? 'opacity-0 translate-x-4 sm:translate-x-8 pointer-events-none' 
                      : 'opacity-100 translate-x-0 pointer-events-auto'
                  }`}
                >
                {/* Email or Username Field */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label htmlFor="emailOrUsername" className="block text-xs sm:text-sm font-medium text-black">
                    {t('auth.email_or_username')}
                  </label>
                  <input
                    id="emailOrUsername"
                    type="text"
                    value={emailOrUsername}
                    onChange={(e) => setEmailOrUsername(e.target.value)}
                    placeholder={t('auth.email_or_username_placeholder') || 'Enter your email'}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-black placeholder-gray-400"
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-black">
                      {t('common.password')}
                    </label>
                    <Link
                      href="#"
                      className="text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                      {t('auth.forgot_password')}
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t('common.password_placeholder') || 'Enter password'}
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-black placeholder-gray-400 pr-10 sm:pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label={showPassword ? t('auth.hide_password') : t('auth.show_password')} 
                    >
                      {showPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 sm:py-3 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      {t('auth.signing_in')}
                    </span>
                  ) : (
                    <>
                      {t('common.sign_in')} <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>

                {/* Separator */}
                <div className="relative my-4 sm:my-5 md:my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-xs sm:text-sm">
                    <span className="px-2 bg-white text-black">{t('auth.or')}</span>
                  </div>
                </div>

                {/* Google Sign In Button */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 sm:py-3 rounded-lg text-sm font-medium text-black border border-gray-300 bg-white hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  {t('auth.continue_with_google')}
                </button>

                {/* Toggle to Sign Up */}
                <div className="text-center mt-4 sm:mt-5 md:mt-6">
                  <p className="text-xs sm:text-sm text-gray-600">
                    {t('auth.no_account')}{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setIsTransitioning(true);
                        setTimeout(() => {
                          setIsSignUp(true);
                          setError(null);
                          setSuccess(null);
                          setEmailOrUsername('');
                          setPassword('');
                          setShowPassword(false);
                          setTimeout(() => {
                            setIsTransitioning(false);
                          }, 50);
                        }, 250);
                      }}
                      className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
                    >
                      {t('common.sign_up')}
                    </button>
                  </p>
                </div>
                </form>
              )}
              
              {/* Sign up Form */}
              {isSignUp && (
                <form 
                  onSubmit={handleSignUp} 
                  key="sign-up-form"
                  className={`space-y-4 sm:space-y-5 md:space-y-6 transition-all duration-300 ${
                    isTransitioning 
                      ? 'opacity-0 -translate-x-4 sm:-translate-x-8 pointer-events-none' 
                      : 'opacity-100 translate-x-0 pointer-events-auto'
                  }`}
                >
                {/* First Name Field */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label htmlFor="signup-firstname" className="block text-xs sm:text-sm font-medium text-black">
                    {t('form.first_name')}
                  </label>
                  <input
                    id="signup-firstname"
                    type="text"
                    value={signUpData.firstName}
                    onChange={(e) => setSignUpData({ ...signUpData, firstName: e.target.value })}
                    placeholder={t('form.first_name_placeholder')}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-black placeholder-gray-400"
                  />
                </div>

                {/* Last Name Field */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label htmlFor="signup-lastname" className="block text-xs sm:text-sm font-medium text-black">
                    {t('form.last_name')}
                  </label>
                  <input
                    id="signup-lastname"
                    type="text"
                    value={signUpData.lastName}
                    onChange={(e) => setSignUpData({ ...signUpData, lastName: e.target.value })}
                    placeholder={t('form.last_name_placeholder')}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-black placeholder-gray-400"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label htmlFor="signup-email" className="block text-xs sm:text-sm font-medium text-black">
                    {t('auth.email_address')}
                  </label>
                  <input
                    id="signup-email"
                    type="email"
                    value={signUpData.email}
                    onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                    placeholder={t('form.email_placeholder')}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-black placeholder-gray-400"
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label htmlFor="signup-password" className="block text-xs sm:text-sm font-medium text-black">
                    {t('auth.set_password')}
                  </label>
                  <div className="relative">
                    <input
                      id="signup-password"
                      type={showSignUpPassword ? 'text' : 'password'}
                      value={signUpData.password}
                      onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                      placeholder={t('common.password_placeholder')}
                      required
                      minLength={8}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-black placeholder-gray-400 pr-10 sm:pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                      className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label={showSignUpPassword ? t('auth.hide_password') : t('auth.show_password')}
                    >
                      {showSignUpPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label htmlFor="signup-confirm-password" className="block text-xs sm:text-sm font-medium text-black">
                    {t('auth.confirm_password')}
                  </label>
                  <div className="relative">
                    <input
                      id="signup-confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={signUpData.confirmPassword}
                      onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                      placeholder={t('auth.confirm_password_placeholder')}
                      required
                      minLength={8}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-black placeholder-gray-400 pr-10 sm:pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label={showConfirmPassword ? t('auth.hide_password') : t('auth.show_password')}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                    </button>
                  </div>
                </div>

                {/* Show Password Checkbox */}
                {/* <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="show-password-checkbox"
                    checked={showSignUpPassword}
                    onChange={(e) => {
                      setShowSignUpPassword(e.target.checked);
                      setShowConfirmPassword(e.target.checked);
                    }}
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                  />
                  <label htmlFor="show-password-checkbox" className="text-xs sm:text-sm text-black">
                    {t('auth.show_password')}
                  </label>
                </div> */}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full inline-flex items-center justify-center px-4 py-3 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      {t('auth.signing_up')}
                    </span>
                  ) : (
                    <>
                      {t('common.sign_up')} <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>

                {/* Separator */}
                <div className="relative my-4 sm:my-5 md:my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-xs sm:text-sm">
                    <span className="px-2 bg-white text-black">{t('auth.or')}</span>
                  </div>
                </div>

                {/* Google Sign In Button */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 sm:py-3 rounded-lg text-sm font-medium text-black border border-gray-300 bg-white hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  {t('auth.continue_with_google')}
                </button>

                {/* Toggle to Sign In */}
                <div className="text-center mt-4 sm:mt-5 md:mt-6">
                  <p className="text-xs sm:text-sm text-gray-600">
                    {t('auth.already_have_account')}{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setIsTransitioning(true);
                        setTimeout(() => {
                          setIsSignUp(false);
                          setError(null);
                          setSuccess(null);
                          setSignUpData({
                            firstName: '',
                            lastName: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                          });
                          setShowSignUpPassword(false);
                          setShowConfirmPassword(false);
                          setTimeout(() => {
                            setIsTransitioning(false);
                          }, 50);
                        }, 250);
                      }}
                      className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
                    >
                      {t('common.sign_in')}
                    </button>
                  </p>
                </div>
                </form>
              )}
            </div>

            {/* Back to Home Link */}
            <div className="mt-4 sm:mt-6 md:mt-8">
              <Link href="/" className="text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-800">
                {t('common.back_to_home')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-8">
          <div className="animate-pulse text-emerald-700 font-semibold">Loading...</div>
        </div>
      }
    >
      <AuthPageContent />
    </Suspense>
  );
}
