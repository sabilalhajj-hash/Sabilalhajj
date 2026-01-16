'use client';

import React, { useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Minus, Plus, CheckCircle2, ChevronDown, ArrowLeft, Loader2 } from 'lucide-react';



export default function BookingPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [adults, setAdults] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Form refs
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const nationalityRef = useRef<HTMLInputElement>(null);
  const documentTypeRef = useRef<HTMLSelectElement>(null);

  


  // Get selected options from URL params
  const selectedProgram = searchParams.get('program');
  const selectedRoom = searchParams.get('room');
  const selectedVisa = searchParams.get('visa');

  // Form validation
  const validateForm = () => {
    const errors: string[] = [];

    if (!phoneRef.current?.value.trim()) {
      errors.push(t('booking.validation.phone_required') || 'Phone number is required');
    }
    if (!emailRef.current?.value.trim()) {
      errors.push(t('booking.validation.email_required') || 'Email address is required');
    }
    if (!firstNameRef.current?.value.trim()) {
      errors.push(t('booking.validation.first_name_required') || 'First name is required');
    }
    if (!lastNameRef.current?.value.trim()) {
      errors.push(t('booking.validation.last_name_required') || 'Last name is required');
    }
    if (!nationalityRef.current?.value.trim()) {
      errors.push(t('booking.validation.nationality_required') || 'Nationality is required');
    }
    if (!documentTypeRef.current?.value || documentTypeRef.current.value === (t('booking.select_document_option') || 'Select travel document type')) {
      errors.push(t('booking.validation.document_type_required') || 'Please select a travel document type');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRef.current?.value && !emailRegex.test(emailRef.current.value)) {
      errors.push(t('booking.validation.email_invalid') || 'Please enter a valid email address');
    }

    return errors;
  };



  // Handle form submission
  const handleSubmit = async () => {
   
    // Reset previous states
    setSubmitError('');
    setSubmitSuccess(false);

  
    const validationErrors = validateForm();

    if (validationErrors.length > 0) {
      setSubmitError(validationErrors.join('. '));
      return;
    }

    setIsSubmitting(true);

    try {
      // Collect form data
      const bookingData = {
        // Package details
        program: selectedProgram,
        room: selectedRoom,
        visa: selectedVisa,
        packageName: 'Ramadan Umrah 2026 — Early Month',
        dates: '18 February 2026 – 4 March 2026',
        pricePerPerson: 600,
        currency: 'EUR',

        // Contact info
        phone: phoneRef.current?.value.trim(),
        email: emailRef.current?.value.trim(),

        // Performer details
        adults: adults,
        performers: [{
          firstName: firstNameRef.current?.value.trim(),
          lastName: lastNameRef.current?.value.trim(),
          nationality: nationalityRef.current?.value.trim(),
          documentType: documentTypeRef.current?.value,
          type: 'adult'
        }],

        // Metadata
        submittedAt: new Date().toISOString(),
        status: 'pending'
      };

      console.log('📧 Calling server action to send booking email...');
      const emailResult = await sendBookingEmail(bookingData);
      console.log('✅ Server action completed:', emailResult);

      console.log("SUCCCCESSSSS YOUNESSS - EMAIL SENT!");

      setSubmitSuccess(true);

      // Optional: router.push('/success');

    } catch (error: any) {
    console.error('Submission error:', error);
    setSubmitError(error.message || 'An unexpected error occurred.');
  } finally {
    setIsSubmitting(false);
  }


       };

  return (
    <div className="min-h-screen bg-white py-12 px-4 font-sans">
      <div className="max-w-4xl mx-auto">

        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[#1B3C33] hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">{t('booking.back_to_package') || 'Back to Package Details'}</span>
          </button>
        </div>

        {/* 1. Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-[#1B3C33] mb-6 leading-tight">
            {t('booking.complete_booking_title') || 'Complete Your Umrah Booking'}
          </h1>

          {/* Package Summary Card */}
          <div className="bg-[#1B3C33] rounded-2xl p-6 text-white shadow-lg mb-8">
            <h2 className="text-lg font-bold mb-1">Ramadan Umrah 2026 — Early Month</h2>
            <p className="text-sm opacity-90 mb-2">18 February 2026 – 4 March 2026</p>
            <div className="flex justify-center gap-6 text-sm">
              <span>{t('booking.program_label') || 'Program'}: {selectedProgram}</span>
              <span>•</span>
              <span>{t('booking.room_label') || 'Room'}: {selectedRoom}</span>
              <span>•</span>
              <span>{t('booking.visa_label') || 'Visa'}: {selectedVisa}</span>
            </div>
            <p className="text-xl font-black mt-2">€600 per person</p>
          </div>
        </div>

        {/* 2. Form Container */}
        <div className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 border border-slate-100">

          {/* Performer Counter */}
          <div className="mb-12">
            <h3 className="text-center font-bold text-slate-800 mb-6">{t('booking.performer_count_title') || 'Number of Umrah Performers'}</h3>
            <div className="bg-[#F8FAF9] border-2 border-[#10B981] rounded-2xl p-6 flex flex-col items-center">
              <span className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">{t('booking.adults_label') || 'Adults'}</span>
              <div className="flex items-center gap-8">
                <button
                  onClick={() => setAdults(Math.max(1, adults - 1))}
                  className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-100 transition-colors"
                >
                  <Minus size={18} className="text-slate-600" />
                </button>
                <span className="text-3xl font-black text-slate-900">{adults}</span>
                <button
                  onClick={() => setAdults(adults + 1)}
                  className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-100 transition-colors"
                >
                  <Plus size={18} className="text-slate-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Contact Info Section */}
          <div className="space-y-6 mb-10">
            <h3 className="font-bold text-[#1B3C33]">{t('booking.contact_info_title') || 'Contact Information'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">{t('booking.phone_label') || 'Phone Number'} <span className="text-red-500">*</span></label>
                <input ref={phoneRef} type="tel" className="text-black w-full p-4 bg-[#F8FAFB] border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">{t('booking.email_label') || 'Email Address'} <span className="text-red-500">*</span></label>
                <input ref={emailRef} type="email" className="text-black w-full p-4 bg-[#F8FAFB] border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all" required />
              </div>
            </div>
          </div>

          <hr className="border-slate-100 mb-10" />

          {/* Individual Performer Info Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 mb-10 shadow-sm">
            <h3 className="text-lg font-bold text-[#1B3C33] mb-8">{t('booking.performer_info_title') || 'Umrah Performer 1 Information - Adult'}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">{t('booking.first_name_label') || 'First Name'} <span className="text-red-500">*</span></label>
                <input ref={firstNameRef} type="text" className=" text-black w-full p-4 bg-[#F8FAFB] border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">{t('booking.last_name_label') || 'Last Name'} <span className="text-red-500">*</span></label>
                <input ref={lastNameRef} type="text" className=" text-black w-full p-4 bg-[#F8FAFB] border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all" required />
              </div>
            </div>

            <div className="space-y-2 mb-8">
              <label className="text-sm font-bold text-slate-700">{t('booking.nationality_label') || 'Nationality'} <span className="text-red-500">*</span></label>
              <input ref={nationalityRef} type="text" className=" text-black w-full p-4 bg-[#F8FAFB] border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all" required />
            </div>

            {/* Travel Document Dropdown */}
            <div className="bg-[#FAF7F0] border border-[#E5D5B8] rounded-xl p-6">
              <label className="text-sm font-bold text-[#8B4513] mb-4 block">{t('booking.document_type_label') || 'Select travel document type'} <span className="text-red-500">*</span></label>
              <div className="relative">
                <select ref={documentTypeRef} className="w-full p-4 bg-white border border-slate-200 rounded-xl appearance-none cursor-pointer outline-none font-medium text-slate-600 focus:ring-2 focus:ring-emerald-500 transition-all" required>
                  <option>{t('booking.select_document_option') || 'Select travel document type'}</option>
                  <option>{t('booking.passport_option') || 'Passport'}</option>
                  <option>{t('booking.national_id_option') || 'National ID'}</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
              </div>
            </div>
          </div>

          {/* Error Message */}
          {submitError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm">
              {submitError}
            </div>
          )}

          {/* Success Message */}
          {submitSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 text-sm flex items-center gap-2">
              <CheckCircle2 size={16} />
              {t('booking.success.message') || 'Booking submitted successfully! Redirecting to confirmation page...'}
            </div>
          )}

         

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              onClick={() => {
                console.log('🖱️ Submit button clicked directly!');
                handleSubmit();
              }}
              disabled={isSubmitting || submitSuccess}
              className="bg-[#1B3C33] text-white py-4 px-12 rounded-xl font-bold flex items-center gap-2 hover:bg-[#152e27] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  {t('booking.submitting') || 'Submitting...'}
                </>
              ) : submitSuccess ? (
                <>
                  <CheckCircle2 size={20} />
                  {t('booking.success.submitted') || 'Submitted Successfully'}
                </>
              ) : (
                <>
                  <CheckCircle2 size={20} />
                  {t('booking.submit_button') || 'Submit Booking Request'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



// ------------------------------------------------------------------------- YOUNESYOUNES

