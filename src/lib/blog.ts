/** Re-export BlogPost type and db helpers for server-side usage. */
export type { BlogPost } from '@/lib/db/settings';
export {
  getBlogPosts,
  getBlogPostBySlug,
  getAllBlogSlugs,
} from '@/lib/db/settings';
