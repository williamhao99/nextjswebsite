import { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';

// Placeholder archive posts for demo purposes
const placeholderArchivePosts = [
  {
    id: 'a1',
    title: 'Placeholder Archive Post',
    slug: 'this-page-does-not-exist',
    excerpt: 'This is a placeholder archive post. Your actual content will appear here once you start writing.',
    published_at: '2024-12-15T10:00:00.000Z',
    visibility: 'public',
    type: 'post',
    status: 'published'
  }
];

export default function Archive() {
  // Filter only published posts
  const publishedArchivePosts = placeholderArchivePosts.filter(post => post.type === 'post' && post.status === 'published');

  return (
    <Layout title="Archive - Will Hao" description="Complete archive of all posts and content">
      <div className="content-area custom-page">
        <main className="site-main">
          <PageHeader
            title="Archive"
            description="Complete archive of all posts and content"
            isHero={true}
          />
          <section className="section-container">
            <div className="container medium">
              <div className="post-feed">
                {publishedArchivePosts.map((post, index) => {
                  const date = new Date(post.published_at);
                  const year = date.getFullYear();
                  const month = date.getMonth() + 1;
                  const monthName = date.toLocaleDateString('en-US', { month: 'long' });
                  const dayMonth = date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
                  return (
                    <article key={post.id} className={`feed archive-wrapper post-year-${year} post-date-${month}`} data-month={`${monthName} ${year}`}>
                      <div className="date-wrapper">
                        <div className="section-title year-post-label">{year} BLOG</div>
                        <div className="section-title month-post-label">✦ {monthName.toUpperCase()}</div>
                      </div>
                      <div className="feed-wrapper">
                        <h2 className="body-1 feed-title">{post.title}</h2>
                        {post.excerpt && (
                          <div className="feed-excerpt">{post.excerpt.substring(0, 100)}...</div>
                        )}
                        <div className="dot-spacer"></div>
                        <div className="feed-right">
                          <div className={`feed-visibility feed-visibility-${post.visibility || 'public'}`}>
                            <svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12.729 1.2l3.346 6.629 6.44.638-4.2 4.478 1.47 7.027L12 16.13 4.215 19.97l1.47-7.027-4.2-4.478 6.44-.638L12.729 1.2zM12 3.209L9.62 8.13l-5.512.55 3.561 3.795-1.241 5.947L12 15.387l5.572 3.035-1.241-5.947 3.561-3.795-5.512-.55L12 3.209z" />
                            </svg>
                          </div>
                          <time className="body-1 feed-calendar" dateTime={date.toISOString()}>
                            {dayMonth}
                          </time>
                          <div className="feed-icon">
                            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="9,18 15,12 9,6"></polyline>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <Link href={`#${post.slug}`} className="u-permalink" aria-label={post.title}></Link>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}