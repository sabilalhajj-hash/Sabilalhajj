import { NextResponse } from 'next/server';
import { getWhatsappNumber } from '@/lib/db/settings';

const FALLBACK_NUMBER = '2120606420326';

/** Public API: returns site settings used by the frontend (e.g. WhatsApp number for contact). */
export async function GET() {
  try {
    const whatsappNumber = await getWhatsappNumber();
    return NextResponse.json({
      whatsappNumber,
      whatsappUrl: `https://wa.me/${whatsappNumber}`,
    });
  } catch (e) {
    console.error('Settings GET error:', e);
    // If table missing (migration not run), return fallback so site still works
    return NextResponse.json({
      whatsappNumber: FALLBACK_NUMBER,
      whatsappUrl: `https://wa.me/${FALLBACK_NUMBER}`,
    });
  }
}
