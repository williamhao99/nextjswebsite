/**
 * 📝 CONTENT PAGE: Special Static Pages
 *
 * Dynamic route handler for special pages like projects.
 * This is now a blank template ready for content.
 * Route: /page/[slug] → redirects to /[slug] (e.g., /drp-math-talk)
 */

import Link from 'next/link'
import Layout from '../../components/Layout'

export default function Page() {
  return (
    <Layout>
      <div className="content-area">
        <main className="site-main">
          <div className="container medium">
            <div className="page-content">
              <h1 className="h1">Page Not Found</h1>
              <p className="body-1">
                This is a blank template. Special pages will appear here once content is added.
              </p>
              <Link href="/" className="button">← Back to Home</Link>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
}

// Remove getStaticPaths and getStaticProps to avoid build-time data generation
// This makes the page work without any data dependencies
