import { NextResponse } from 'next/server';
import { getGuideContent } from '@/lib/db/settings';

/** GET: Public – return guide content for the global-infos page. */
export async function GET() {
  try {
    const content = await getGuideContent();
    return NextResponse.json(content ?? {});
  } catch (e) {
    console.error('Guide content GET error:', e);
    return NextResponse.json({}, { status: 200 });
  }
}
