import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/require-admin';
import { getGuideContent, setGuideContent, type GuideContent } from '@/lib/db/settings';
import { z } from 'zod';

const guideContentSchema = z.object({
  guideName: z.string(),
  guideBadge: z.string(),
  guideSectionGuidanceTitle: z.string(),
  guideSectionGuidancePara: z.string(),
  guideSectionGuidancePara2: z.string(),
  guideSectionRoleTitle: z.string(),
  guideSectionRolePara: z.string(),
  guideRoleItem1: z.string(),
  guideRoleItem2: z.string(),
  guideRoleItem3: z.string(),
  guideRoleItem4: z.string(),
  guideSectionWhyTitle: z.string(),
  guideWhyItem1: z.string(),
  guideWhyItem2: z.string(),
  guideWhyItem3: z.string(),
  guideWhyItem4: z.string(),
  guideWhyItem5: z.string(),
  guideSectionPlatformTitle: z.string(),
  guideSectionPlatformPara: z.string(),
  guideGalleryTitle: z.string(),
  guideGalleryAlt1: z.string(),
  guideGalleryAlt2: z.string(),
  guideGalleryAlt3: z.string(),
  profileImageUrl: z.string(),
  galleryImageUrls: z.array(z.string()),
});

/** GET: Admin only – return current guide content for editing. */
export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const content = await getGuideContent();
    return NextResponse.json(content ?? null);
  } catch (e) {
    console.error('Admin guide-content GET error:', e);
    return NextResponse.json(
      { error: 'Failed to load guide content' },
      { status: 500 }
    );
  }
}

/** PATCH: Admin only – update guide content. */
export async function PATCH(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const body = await request.json();
    const parsed = guideContentSchema.parse(body);
    const content: GuideContent = {
      ...parsed,
      galleryImageUrls: Array.isArray(parsed.galleryImageUrls)
        ? parsed.galleryImageUrls.slice(0, 10)
        : [],
    };
    await setGuideContent(content);
    const updated = await getGuideContent();
    return NextResponse.json({
      message: 'Guide content updated',
      content: updated,
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: e.issues },
        { status: 400 }
      );
    }
    console.error('Admin guide-content PATCH error:', e);
    return NextResponse.json(
      { error: 'Failed to update guide content' },
      { status: 500 }
    );
  }
}
