/**
 * 📝 CONTENT PAGE: Individual Work Items
 *
 * Dynamic route handler for individual portfolio/work items.
 * This is now a blank template ready for content.
 * Route: /works/[slug] (e.g., /works/drp-math-talk)
 */

import Link from 'next/link'
import Layout from '../../components/Layout'

export default function WorkItem() {
  return (
    <Layout>
      <div className="content-area">
        <main className="site-main">
          <div className="container medium">
            <div className="page-content">
              <h1 className="h1">Work Item Not Found</h1>
              <p className="body-1">
                This is a blank template. Individual work items will appear here once content is added.
              </p>
              <Link href="/works" className="button">← Back to Works</Link>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
}

// Remove getStaticPaths and getStaticProps to avoid build-time data generation
// This makes the page work without any data dependencies