import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/require-admin';
import { getWhatsappNumber, setWhatsappNumber } from '@/lib/db/settings';
import { z } from 'zod';

const updateSettingsSchema = z.object({
  whatsappNumber: z.string().min(1).max(50),
});

const DEFAULT_WHATSAPP_NUMBER = '2120606420326';

/** GET: Admin only – return current settings from DB (for editing). */
export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const whatsappNumber = await getWhatsappNumber();
    return NextResponse.json({ whatsappNumber });
  } catch (e) {
    console.error('Admin settings GET error:', e);
    // If table missing or DB error, return default so admin form always shows a value and can save
    return NextResponse.json(
      { whatsappNumber: DEFAULT_WHATSAPP_NUMBER },
      { status: 200 }
    );
  }
}

/** PATCH: Admin only – update settings (e.g. WhatsApp number). */
export async function PATCH(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const body = await request.json();
    const { whatsappNumber } = updateSettingsSchema.parse(body);
    await setWhatsappNumber(whatsappNumber);
    const updated = await getWhatsappNumber();
    return NextResponse.json({
      message: 'Settings updated',
      whatsappNumber: updated,
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: e.issues },
        { status: 400 }
      );
    }
    console.error('Admin settings PATCH error:', e);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
