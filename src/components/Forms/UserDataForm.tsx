'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { userDataSchema, UserData, translateZodError } from '@/lib/validation';
import FormField from './FormField';
import LoadingSpinner from '../Loading/LoadingSpinner';

interface UserDataFormProps {
  onSubmit: (data: UserData) => void | Promise<void>;
  initialData?: Partial<UserData>;
  isLoading?: boolean;
  submitLabel?: string;
}

export default function UserDataForm({
  onSubmit,
  initialData,
  isLoading = false,
  submitLabel,
}: UserDataFormProps) {
  const { t } = useTranslation();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<UserData>({
    resolver: zodResolver(userDataSchema),
    defaultValues: initialData,
  });

  const onFormSubmit = async (data: UserData) => {
    try {
      // Validate with Zod and translate errors
      const result = userDataSchema.safeParse(data);
      
      if (!result.success) {
        const translatedErrors = translateZodError(result.error, t);
        Object.entries(translatedErrors).forEach(([field, message]) => {
          setError(field as keyof UserData, {
            type: 'validation',
            message: message,
          });
        });
        return;
      }
      
      await onSubmit(result.data);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const genderOptions = [
    { value: 'male', label: t('common.male') || 'Male' },
    { value: 'female', label: t('common.female') || 'Female' },
  ];

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label={t('form.first_name') || 'First Name'}
          name="name"
          register={register('name')}
          error={errors.name}
          required
          placeholder={t('form.first_name_placeholder') || 'Enter your first name'}
        />
        
        <FormField
          label={t('form.last_name') || 'Last Name'}
          name="lastName"
          register={register('lastName')}
          error={errors.lastName}
          required
          placeholder={t('form.last_name_placeholder') || 'Enter your last name'}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label={t('form.email') || 'Email'}
          name="email"
          type="email"
          register={register('email')}
          error={errors.email}
          required
          placeholder={t('form.email_placeholder') || 'your.email@example.com'}
        />
        
        <FormField
          label={t('form.phone') || 'Phone'}
          name="phone"
          type="tel"
          register={register('phone')}
          error={errors.phone}
          required
          placeholder={t('form.phone_placeholder') || '+1234567890'}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label={t('form.city') || 'City'}
          name="city"
          register={register('city')}
          error={errors.city}
          required
          placeholder={t('form.city_placeholder') || 'Enter your city'}
        />
        
        <FormField
          label={t('form.zip') || 'ZIP Code'}
          name="zip"
          register={register('zip')}
          error={errors.zip}
          required
          placeholder={t('form.zip_placeholder') || '12345'}
        />
      </div>

      <FormField
        label={t('form.address') || 'Address'}
        name="address"
        type="textarea"
        register={register('address')}
        error={errors.address}
        required
        placeholder={t('form.address_placeholder') || 'Enter your full address'}
      />

      <FormField
        label={t('form.gender') || 'Gender'}
        name="gender"
        type="select"
        register={register('gender')}
        error={errors.gender}
        required
        options={genderOptions}
      />

      <button
        type="submit"
        disabled={isSubmitting || isLoading}
        className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting || isLoading ? (
          <>
            <LoadingSpinner size="sm" />
            <span>{t('form.submitting') || 'Submitting...'}</span>
          </>
        ) : (
          <span>{submitLabel || t('form.submit') || 'Submit'}</span>
        )}
      </button>
    </form>
  );
}
