import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getAllBlogSlugs } from '@/lib/blog';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Sabil AlHajj Blog`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium mb-8 transition-colors"
        >
          ← Back to Blog
        </Link>
        <article className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-8 sm:p-12">
            <time
              dateTime={post.date}
              className="text-sm text-gray-500 block mb-4"
            >
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>
            <div className="prose prose-lg text-gray-700 leading-relaxed max-w-none">
              <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>
              <p>{post.content}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
