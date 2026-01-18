import { z } from 'zod';

// User data validation schema
export const userDataSchema = z.object({
  name: z
    .string()
    .min(2, 'validation.first_name_min_length')
    .max(50, 'validation.first_name_max_length')
    .regex(/^[a-zA-Z\s]+$/, 'validation.first_name_letters_only'),
  lastName: z
    .string()
    .min(2, 'validation.last_name_min_length')
    .max(50, 'validation.last_name_max_length')
    .regex(/^[a-zA-Z\s]+$/, 'validation.last_name_letters_only'),
  email: z
    .string()
    .min(1, 'validation.email_required')
    .email('validation.email_invalid'),
  phone: z
    .string()
    .min(8, 'validation.phone_min_digits')
    .max(15, 'validation.phone_max_digits')
    .regex(/^[\+]?[1-9][\d]{0,15}$/, 'validation.phone_invalid'),
  city: z
    .string()
    .min(2, 'validation.city_min_length')
    .max(100, 'validation.city_max_length'),
  address: z
    .string()
    .min(5, 'validation.address_min_length')
    .max(200, 'validation.address_max_length'),
  zip: z
    .string()
    .regex(/^[0-9]{4,10}$/, 'validation.zip_invalid'),
  gender: z
    .string()
    .min(1, 'validation.gender_required')
    .refine((val) => ['male', 'female'].includes(val), {
      message: 'validation.gender_invalid',
    }),
});

export type UserData = z.infer<typeof userDataSchema>;

// Booking validation schema
export const bookingSchema = z.object({
  program: z.string().min(1, 'validation.program_required'),
  room: z.string().min(1, 'validation.room_required'),
  visa: z.string().min(1, 'validation.visa_required'),
  userData: userDataSchema,
});

export type BookingData = z.infer<typeof bookingSchema>;

// Helper function to translate Zod errors
export function translateZodError(error: z.ZodError, t: (key: string) => string): Record<string, string> {
  const errors: Record<string, string> = {};
  
  error.issues.forEach((err) => {
    const path = err.path.join('.');
    const message = err.message;
    
    // If message is a translation key, translate it
    if (message.startsWith('validation.')) {
      errors[path] = t(message);
    } else {
      errors[path] = message;
    }
  });
  
  return errors;
}
