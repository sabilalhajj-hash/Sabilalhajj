import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/require-admin';
import { getBlogPosts, setBlogPosts, type BlogPost } from '@/lib/db/settings';
import { z } from 'zod';

const blogPostSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers, and hyphens only'),
  title: z.string().min(1),
  excerpt: z.string(),
  content: z.string(),
  date: z.string(),
  image: z.string().optional(),
});

const patchSchema = z.object({
  posts: z.array(blogPostSchema),
});

/** GET: Admin only – return blog posts for editing. */
export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const posts = await getBlogPosts();
    return NextResponse.json({ posts });
  } catch (e) {
    console.error('Admin blog GET error:', e);
    return NextResponse.json(
      { error: 'Failed to load blog posts' },
      { status: 500 }
    );
  }
}

/** PATCH: Admin only – update blog posts. */
export async function PATCH(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const body = await request.json();
    const parsed = patchSchema.parse(body);
    const posts: BlogPost[] = parsed.posts.map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      content: p.content,
      date: p.date,
      image: p.image || undefined,
    }));
    await setBlogPosts(posts);
    const updated = await getBlogPosts();
    return NextResponse.json({
      message: 'Blog posts updated',
      posts: updated,
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: e.issues },
        { status: 400 }
      );
    }
    console.error('Admin blog PATCH error:', e);
    return NextResponse.json(
      { error: 'Failed to update blog posts' },
      { status: 500 }
    );
  }
}
