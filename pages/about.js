// pages/about.js

import { Layout, PageHeader } from '../components'

export default function About() {
  return (
    <Layout
      title="About - Will Hao"
      description="Learn more about Will Hao"
    >
      <div className="content-area custom-page">
        <main className="site-main site-layout">
          <PageHeader
            title="About"
            description="Last updated: "
            isHero={true}
          />

          <section className="section-container">
            <div className="container medium">
              <div className="page-content">
                <p>Placeholder text</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  )
}