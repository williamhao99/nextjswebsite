/**
 * 🏠 BASE SITE PAGE: Works/Portfolio
 *
 * Showcase page for projects and work experience.
 * Links to individual project pages and content.
 */

import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import Link from 'next/link';

export default function Works() {
  return (
    <Layout title="Works - Will Hao" description="Portfolio and projects by Will Hao">
      <div className="content-area custom-page">
        <main className="site-main site-layout">

          {/* Page Header */}
          <PageHeader
            title="Works"
            description="A list of projects I've created, and my work experience history."
            isHero={true}
          />

          {/* Personal Projects Section */}
          <section className="section-container section-personal-project">
            <header className="feed-header container medium">
              <div className="feed-header-wrapper">
                <h2 className="section-title feed-header-title">Creating</h2>
              </div>
            </header>
            <div className="cards kg-grid kg-grid-2col container medium">
              <div className="card">
                <div className="card-wrapper">
                  <h3 className="h3 card-title">
                    Project Placeholder
                    <span className="card-arrow">↗</span>
                  </h3>
                  <div className="sub-heading card-excerpt">
                    Placeholder description.
                  </div>
                </div>
                <Link href="/works/project-does-not-exist" className="u-permalink" aria-label="Project Placeholder"></Link>
              </div>
              <div className="card">
                <div className="card-wrapper">
                  <h3 className="h3 card-title">
                    Project Placeholder 2
                    <span className="card-arrow">↗</span>
                  </h3>
                  <div className="sub-heading card-excerpt">
                    Placeholder description.
                  </div>
                </div>
                <Link href="/works/another-nonexistent-project" className="u-permalink" aria-label="Project Placeholder 2"></Link>
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section className="section-container experiences section-experiences">
            <header className="feed-header container medium">
              <div className="feed-header-wrapper">
                <h2 className="section-title feed-header-title">Experience</h2>
              </div>
            </header>
            <div className="container medium">
              <div className="experience-item">
                <h3 className="h3">Job Title placeholder</h3>
                <p className="sub-heading">
                  Work experience details
                </p>
              </div>
            </div>
          </section>

        </main>
      </div>
    </Layout>
  );
}