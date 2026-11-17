'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { mediaUrl } from '@/lib/config';
import { BLOG_CATEGORIES, categoryLabel, formatDate, readingTime } from '@/lib/api';
import { ArrowRight } from '@/components/Icons';

export default function BlogBrowser({ posts }) {
  const [category, setCategory] = useState('all');

  const filtered = useMemo(
    () => (category === 'all' ? posts : posts.filter((p) => p.category === category)),
    [posts, category]
  );

  const [featured, ...rest] = filtered;

  return (
    <>
      <div className="toolbar">
        <div className="toolbar__group pills" role="group" aria-label="Filter articles by category">
          {BLOG_CATEGORIES.map((c) => (
            <button
              key={c.value}
              type="button"
              className={`pill${category === c.value ? ' is-active' : ''}`}
              onClick={() => setCategory(c.value)}
              aria-pressed={category === c.value}
            >
              {c.label}
            </button>
          ))}
        </div>
        <span className="toolbar__count">
          {filtered.length} {filtered.length === 1 ? 'story' : 'stories'}
        </span>
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <h3 className="h3">No stories in this category yet</h3>
          <p className="lede">New guides are published every month — check back soon.</p>
        </div>
      )}

      {featured && (
        <article className="blog-feature">
          <Link href={`/blog/${featured.slug}`} className="blog-feature__media" aria-label={featured.title}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={mediaUrl(featured.heroImage)} alt={featured.title} loading="lazy" />
          </Link>
          <div>
            <span className="eyebrow">Featured story</span>
            <h2>
              <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
            </h2>
            <p>{featured.excerpt}</p>
            <div className="blog-card__meta">
              <span>{featured.author || 'SoulPath Team'}</span>
              <span aria-hidden="true">·</span>
              <span>{formatDate(featured.publishedAt)}</span>
              <span aria-hidden="true">·</span>
              <span>{categoryLabel(featured.category)}</span>
            </div>
            <Link href={`/blog/${featured.slug}`} className="link-arrow" style={{ marginTop: '1.2rem' }}>
              Read the story <ArrowRight size={13} />
            </Link>
          </div>
        </article>
      )}

      {rest.length > 0 && (
        <div className="blog-grid">
          {rest.map((post) => (
            <article className="blog-card" key={post._id}>
              <Link href={`/blog/${post.slug}`} className="blog-card__media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={mediaUrl(post.heroImage)} alt={post.title} loading="lazy" />
              </Link>
              <span className="blog-card__cat">{categoryLabel(post.category)}</span>
              <h3>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p>{post.excerpt}</p>
              <div className="blog-card__meta">
                <span>{formatDate(post.publishedAt)}</span>
                <span aria-hidden="true">·</span>
                <span>{readingTime(post.excerpt)} min read</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
