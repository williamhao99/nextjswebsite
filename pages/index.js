/**
 * 🏠 BASE SITE PAGE: Homepage
 *
 * The main landing page of the website.
 * Contains hero section and site navigation.
 */

// pages/index.js
import Layout from '../components/Layout';
import Hero from '../components/Hero';

// No more getStaticProps! The page is now fully static.
// Widget data is fetched client-side for faster initial page load.

export default function Home() {
  return (
    <Layout
      title="Will Hao - Portfolio"
      description="UT Austin Class of 2028, Mathematics + Plan II Honors"
    >
      <div className="content-area">
        <main className="site-main site-layout">
          <Hero
            heroText="I'm Will — welcome to my website!"
            description="I am a rising sophomore at UT Austin, and this website serves as my personal portfolio that contains my work, blog, projects, and more."
          />
        </main>
      </div>
    </Layout>
  );
}