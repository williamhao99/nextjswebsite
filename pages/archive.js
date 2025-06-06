import { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import PostCard from '../components/PostCard';
import { formatDate } from '../lib/utils';

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
  },
  {
    id: 'a2',
    title: 'Another Archive Post',
    slug: 'another-nonexistent-archive',
    excerpt: 'Another placeholder for the archive. Replace with your real posts.',
    published_at: '2023-09-10T10:00:00.000Z',
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
                  // Use the same date formatting as blog.js
                  const date = new Date(post.published_at);
                  const year = date.getFullYear();
                  const monthName = date.toLocaleDateString('en-US', { month: 'long' });
                  const dayMonth = date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
                  return (
                    <PostCard
                      key={post.id}
                      post={post}
                      noDate={true}
                      noLink={false}
                      feedLayout="List"
                    />
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