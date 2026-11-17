import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPost, getPosts, categoryLabel, formatDate, readingTime } from '@/lib/api';
import { mediaUrl } from '@/lib/config';
import { PageHero, SectionHead } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { ArrowRight } from '@/components/Icons';

export const revalidate = 120;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: 'Story not found' };
  return {
    title: post.seoMeta?.title || post.title,
    description: post.seoMeta?.description || post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      images: post.heroImage ? [{ url: mediaUrl(post.heroImage) }] : undefined,
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const [post, all] = await Promise.all([getPost(slug), getPosts()]);
  if (!post) notFound();

  const related = all
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);
  const fallback = all.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={categoryLabel(post.category)}
        title={post.title}
        sub={post.excerpt}
        image={post.heroImage}
        crumbs={[{ label: 'Blog', href: '/blog' }, { label: post.title }]}
      />

      <article className="section" style={{ paddingTop: 'clamp(2rem, 4vw, 3rem)' }}>
        <div className="container">
          <div className="article">
            <div className="article__meta">
              <span>{post.author || 'SoulPath Team'}</span>
              <span aria-hidden="true">·</span>
              <span>{formatDate(post.publishedAt)}</span>
              <span aria-hidden="true">·</span>
              <span>{readingTime(post.content || post.excerpt)} min read</span>
            </div>

            {post.content ? (
              <div
                className="prose"
                // content is authored in the existing CMS — rendered as-is, like the original site
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            ) : (
              <p className="prose">{post.excerpt}</p>
            )}

            <div
              style={{
                marginTop: '2.4rem',
                paddingTop: '1.6rem',
                borderTop: '1px solid var(--line)',
                display: 'flex',
                gap: '0.8rem',
                flexWrap: 'wrap',
              }}
            >
              <Link href="/blog" className="btn btn--outline">
                Back to blog
              </Link>
              <Link href="/packages" className="btn btn--dark">
                Explore packages <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </article>

      {(related.length ? related : fallback).length > 0 && (
        <section className="section section--cream">
          <div className="container">
            <SectionHead eyebrow="Keep reading" title="More from the journal" />
            <div className="blog-grid">
              {(related.length ? related : fallback).map((p) => (
                <Reveal as="article" className="blog-card" key={p._id}>
                  <Link href={`/blog/${p.slug}`} className="blog-card__media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={mediaUrl(p.heroImage)} alt={p.title} loading="lazy" />
                  </Link>
                  <span className="blog-card__cat">{categoryLabel(p.category)}</span>
                  <h3>
                    <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                  </h3>
                  <div className="blog-card__meta">
                    <span>{formatDate(p.publishedAt)}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
