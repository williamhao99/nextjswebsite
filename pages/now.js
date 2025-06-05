import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';

export default function Now() {
  return (
    <Layout title="Now - Will Hao" description="What Will Hao is up to right now">
      <div className="content-area custom-page">
        <main className="site-main site-layout">

          <PageHeader
            title="Now"
            description="What I'm focused on at this point in my life."
            isHero={true}
          />

          <section className="section-container">
            <div className="container medium">
              <div className="page-content">
                <h2 className="h2">Currently Working On</h2>
                <p className="body-1">
                  •
                </p>

                <br />

                <h2 className="h2">Learning & Reading</h2>
                <p className="body-1">
                  •
                </p>

                <br />

                <h2 className="h2">Location & Lifestyle</h2>
                <p className="body-1">
                  •
                </p>

                <br />

                <p className="sub-heading">
                  <em>This is a <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer">now page</a>,
                  inspired by Derek Sivers. Last updated: {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</em>
                </p>
              </div>
            </div>
          </section>

        </main>
      </div>
    </Layout>
  );
}