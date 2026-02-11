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

const GUIDE_CONTENT_KEY = 'guide_content';

export interface GuideContent {
  guideName: string;
  guideBadge: string;
  guideSectionGuidanceTitle: string;
  guideSectionGuidancePara: string;
  guideSectionGuidancePara2: string;
  guideSectionRoleTitle: string;
  guideSectionRolePara: string;
  guideRoleItem1: string;
  guideRoleItem2: string;
  guideRoleItem3: string;
  guideRoleItem4: string;
  guideSectionWhyTitle: string;
  guideWhyItem1: string;
  guideWhyItem2: string;
  guideWhyItem3: string;
  guideWhyItem4: string;
  guideWhyItem5: string;
  guideSectionPlatformTitle: string;
  guideSectionPlatformPara: string;
  guideGalleryTitle: string;
  guideGalleryAlt1: string;
  guideGalleryAlt2: string;
  guideGalleryAlt3: string;
  profileImageUrl: string;
  galleryImageUrls: string[];
}

export async function getGuideContent(): Promise<GuideContent | null> {
  const raw = await getSetting(GUIDE_CONTENT_KEY);
  if (!raw || !raw.trim()) return null;
  try {
    return JSON.parse(raw) as GuideContent;
  } catch {
    return null;
  }
}

export async function setGuideContent(content: GuideContent): Promise<void> {
  await setSetting(GUIDE_CONTENT_KEY, JSON.stringify(content));
}
