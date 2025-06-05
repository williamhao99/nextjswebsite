// pages/[slug].js

import Link from 'next/link'
import Layout from '../components/Layout'

export default function StaticPage() {
  return (
    <Layout>
      <div className="content-area custom-page">
        <main className="site-main">
          <section className="section-container">
            <div className="container medium">
              <div className="page-content">
                <h1 className="h1">Page Not Found</h1>
                <p className="body-1">
                  This is a blank template. Dynamic pages will appear here once content is added.
                </p>
                <Link href="/" className="button">← Back to Home</Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  )
}

// Remove getStaticPaths and getStaticProps to avoid build-time data generation
// This makes the page work without any data dependencies