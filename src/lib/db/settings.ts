import { eq } from 'drizzle-orm';
import { db } from './index';
import { siteSettings, type NewSiteSetting } from './schema';

const WHATSAPP_NUMBER_KEY = 'whatsapp_number';
const DEFAULT_WHATSAPP_NUMBER = '2120606420326';

export async function getSetting(key: string): Promise<string | null> {
  const [row] = await db
    .select({ value: siteSettings.value })
    .from(siteSettings)
    .where(eq(siteSettings.key, key))
    .limit(1);
  return row?.value ?? null;
}

export async function setSetting(key: string, value: string): Promise<void> {
  await db
    .insert(siteSettings)
    .values({
      key,
      value,
      updatedAt: new Date(),
    } as NewSiteSetting)
    .onConflictDoUpdate({
      target: siteSettings.key,
      set: { value, updatedAt: new Date() },
    });
}

/** Returns the WhatsApp number (digits only) for wa.me links, or default if not set. */
export async function getWhatsappNumber(): Promise<string> {
  const raw = await getSetting(WHATSAPP_NUMBER_KEY);
  if (!raw || !raw.trim()) return DEFAULT_WHATSAPP_NUMBER;
  const digits = raw.replace(/\D/g, '');
  return digits || DEFAULT_WHATSAPP_NUMBER;
}

/** Set the WhatsApp number (can include +, spaces; stored as digits only). */
export async function setWhatsappNumber(input: string): Promise<void> {
  const digits = input.replace(/\D/g, '');
  await setSetting(WHATSAPP_NUMBER_KEY, digits || DEFAULT_WHATSAPP_NUMBER);
}
