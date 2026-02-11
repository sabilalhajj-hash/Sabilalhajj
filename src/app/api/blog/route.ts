import { NextResponse } from 'next/server';
import { getBlogPosts } from '@/lib/db/settings';

/** GET: Public – return blog posts for the blog page. */
export async function GET() {
  try {
    const posts = await getBlogPosts();
    return NextResponse.json({ posts });
  } catch (e) {
    console.error('Blog GET error:', e);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}
