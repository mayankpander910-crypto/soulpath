import { getDestinations, getPackages, getPosts } from '@/lib/api';
import { SITE_URL } from '@/lib/config';

export default async function sitemap() {
  const [destinations, packages, posts] = await Promise.all([
    getDestinations(),
    getPackages(),
    getPosts(),
  ]);

  const staticRoutes = [
    '',
    '/destinations',
    '/packages',
    '/offers',
    '/blog',
    '/testimonials',
    '/travel-guide',
    '/corporate-tours',
    '/travel-with-influencers',
    '/become-partner',
    '/about',
    '/contact',
    '/flights',
    '/request-proposal',
    '/privacy',
    '/terms',
    '/refund',
    '/support',
    '/login',
    '/register',
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1 : 0.7,
  }));

  return [
    ...staticRoutes,
    ...destinations.map((d) => ({
      url: `${SITE_URL}/destinations/${d.slug}`,
      lastModified: d.updatedAt ? new Date(d.updatedAt) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })),
    ...packages.map((p) => ({
      url: `${SITE_URL}/packages/${p.slug}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })),
    ...posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    })),
  ];
}
