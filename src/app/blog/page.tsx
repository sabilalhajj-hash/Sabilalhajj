'use client';

import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { BlogPost } from '@/lib/blog';

export const dynamic = 'force-dynamic';

export default function BlogPage() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      fetch('/api/blog', { cache: 'no-store' })
        .then((res) => res.json())
        .then((data) => setPosts(data.posts ?? []))
        .catch(() => setPosts([]))
        .finally(() => setLoading(false));
    }
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">{t('Loading...')}</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          {t('pages.blog.title', 'Blog')}
        </h1>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          {t('pages.blog.subtitle', 'Insights and guides for your pilgrimage journey')}
        </p>
        {loading ? (
          <p className="text-center text-gray-500 py-12">{t('common.loading') || 'Loading...'}</p>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-white shadow rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-6">
                {post.image ? (
                  <div className="mb-4 rounded-lg overflow-hidden bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="mb-4 h-24 w-full rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                    <span className="text-4xl opacity-60">🕋</span>
                  </div>
                )}
                <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">{post.excerpt}</p>
                <span className="text-emerald-600 font-medium text-sm group-hover:underline">
                  {t('pages.blog.read_more', 'Read more')} →
                </span>
              </div>
            </Link>
          ))}
        </div>
        )}
      </div>
    </div>
  );
}
