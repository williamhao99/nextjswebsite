import { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import PostCard from '../components/PostCard';

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
                {publishedArchivePosts.map((post, index) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}