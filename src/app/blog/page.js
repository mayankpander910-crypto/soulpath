import { getPosts } from '@/lib/api';
import { PageHero } from '@/components/ui';
import NewsletterForm from '@/components/NewsletterForm';
import { mediaUrl } from '@/lib/config';
import BlogBrowser from './BlogBrowser';
import { Reveal } from '@/components/Reveal';

export const revalidate = 120;

export const metadata = {
  title: 'Travel Blog',
  description:
    'Stories from the road — insider tips, destination deep-dives, visa guides, packing lists and travel inspiration from the SoulPath Holiday team.',
  alternates: { canonical: '/blog' },
};

export default async function BlogPage() {
  const posts = await getPosts();
  const hero = posts[0];

  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Stories from the road"
        sub="Insider tips, destination deep-dives and comprehensive guides to fuel your wanderlust."
        image={hero?.heroImage}
        crumbs={[{ label: 'Blog' }]}
      />

      <section className="section" style={{ paddingTop: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
        <div className="container">
          <BlogBrowser posts={posts} />

          <Reveal
            style={{
              marginTop: 'clamp(2.4rem, 5vw, 4rem)',
              padding: 'clamp(1.4rem, 3vw, 2.4rem)',
              background: 'var(--sand)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.2rem',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ maxWidth: '46ch' }}>
              <h3 className="h3">Get the good stuff first</h3>
              <p className="small" style={{ marginTop: '0.5rem', color: 'var(--olive)' }}>
                Join our newsletter for early access to deals, new itineraries and travel guides.
              </p>
            </div>
            <div style={{ flex: '1 1 280px', maxWidth: 420 }}>
              <NewsletterForm variant="hero" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
