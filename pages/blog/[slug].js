/**
 * 📝 CONTENT PAGE: Individual Blog Posts
 *
 * Dynamic route handler for individual blog posts.
 * This is now a blank template ready for content.
 * Route: /blog/[slug] (e.g., /blog/freshman-year-of-college)
 */

import Link from 'next/link'
import { Layout } from '../../components'

export default function Post() {
  return (
    <Layout>
      <div className="content-area">
        <main className="site-main">
          <div className="container medium">
            <div className="page-content">
              <h1 className="h1">Blog Post Not Found</h1>
              <p className="body-1">
                This is a blank template. Individual blog posts will appear here once content is added.
              </p>
              <Link href="/blog" className="button">← Back to Blog</Link>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
}

// Remove getStaticPaths and getStaticProps to avoid build-time data generation
// This makes the page work without any data dependencies
