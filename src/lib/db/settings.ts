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

const BLOG_POSTS_KEY = 'blog_posts';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image?: string;
}

/** Default blog posts used when DB has none stored. */
const DEFAULT_BLOG_POSTS: BlogPost[] = [
  { slug: 'complete-guide-to-hajj-pilgrimage', title: 'Complete Guide to Hajj Pilgrimage', excerpt: 'Everything you need to know before embarking on your Hajj journey. From preparation to rituals.', content: 'The Hajj pilgrimage is one of the five pillars of Islam and a profound spiritual journey. Every year, millions of Muslims from around the world travel to Mecca to fulfill this sacred duty. This comprehensive guide covers everything from visa requirements and packing tips to the step-by-step rituals of Hajj. Whether you\'re a first-time pilgrim or preparing for a return journey, proper preparation is key to a meaningful experience.', date: '2025-02-01' },
  { slug: 'umrah-tips-for-first-timers', title: 'Umrah Tips for First Timers', excerpt: 'Essential advice for those performing Umrah for the first time. Make your spiritual journey smooth.', content: 'Performing Umrah for the first time can be both exciting and overwhelming. This article provides practical tips for first-time Umrah pilgrims: what to pack, how to navigate the holy sites, staying hydrated in the Saudi heat, and managing your spiritual focus amidst the crowds. We also share insights on the best times to visit and how to make the most of your blessed journey.', date: '2025-01-28' },
  { slug: 'best-time-to-perform-umrah', title: 'Best Time to Perform Umrah', excerpt: 'Discover the ideal seasons and months for your Umrah pilgrimage. Weather, crowd, and spiritual considerations.', content: 'Choosing when to perform Umrah depends on several factors including weather, crowd levels, and personal circumstances. Ramadan Umrah holds special significance with multiplied rewards, while the cooler months of November to March offer comfortable temperatures. We break down the pros and cons of each season to help you plan your perfect pilgrimage timing.', date: '2025-01-20' },
  { slug: 'what-to-pack-for-hajj', title: 'What to Pack for Hajj', excerpt: 'A practical packing list for your Hajj journey. Essential items and what to leave behind.', content: 'Packing for Hajj requires careful consideration. You\'ll need Ihram clothing, comfortable footwear for walking long distances, essential medications, and practical items for the desert climate. This checklist helps you pack efficiently—bringing what you need without overloading. We also cover important documents and health essentials that many pilgrims overlook.', date: '2025-01-15' },
  { slug: 'spiritual-preparation-for-pilgrimage', title: 'Spiritual Preparation for Pilgrimage', excerpt: 'Prepare your heart and soul for the journey of a lifetime. Mental and spiritual readiness tips.', content: 'While physical preparation is important, spiritual preparation for Hajj or Umrah is equally essential. This article explores how to purify your intentions, increase your knowledge of the rituals, strengthen your connection with Allah through extra worship, and seek forgiveness before your journey. A well-prepared heart experiences the pilgrimage more profoundly.', date: '2025-01-10' },
  { slug: 'visa-process-for-saudi-pilgrimage', title: 'Visa Process for Saudi Pilgrimage', excerpt: 'Step-by-step guide to obtaining your Hajj or Umrah visa. Documents and requirements explained.', content: 'Navigating the Saudi visa process for pilgrimage can seem daunting. This guide walks you through the complete process: required documents, application steps, processing times, and common pitfalls to avoid. Whether you\'re applying through an agency or independently, understanding the requirements helps ensure a smooth approval process for your spiritual journey.', date: '2025-01-05' },
];

export async function getBlogPosts(): Promise<BlogPost[]> {
  const raw = await getSetting(BLOG_POSTS_KEY);
  if (!raw || !raw.trim()) return DEFAULT_BLOG_POSTS;
  try {
    const parsed = JSON.parse(raw) as BlogPost[];
    return Array.isArray(parsed) ? parsed : DEFAULT_BLOG_POSTS;
  } catch {
    return DEFAULT_BLOG_POSTS;
  }
}

export async function setBlogPosts(posts: BlogPost[]): Promise<void> {
  await setSetting(BLOG_POSTS_KEY, JSON.stringify(posts));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug);
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const posts = await getBlogPosts();
  return posts.map((p) => p.slug);
}
