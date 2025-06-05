import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';

export default function Archive() {
  return (
    <Layout title="Archive - Will Hao" description="Complete archive of all posts and content">
      <div className="content-area custom-page">
        <main className="site-main site-layout">
          <PageHeader
            title="Archive"
            description="Complete archive of all posts and content"
            isHero={true}
          />

          <section className="section-container">
            <div className="container medium">
              <div className="archive-content">
                <div className="archive-year">
                  <h2 className="h2 archive-year-title">2024</h2>

                  <div className="archive-posts">
                    <article className="archive-post">
                      <div className="archive-post-date">
                        <span className="sub-heading">Dec</span>
                      </div>
                      <div className="archive-post-content">
                        <h3 className="h3 archive-post-title">
                          <a href="#placeholder">Post</a>
                        </h3>
                        <p className="sub-heading archive-post-tags">

                        </p>
                      </div>
                    </article>

                    <article className="archive-post">
                      <div className="archive-post-date">
                        <span className="sub-heading">Nov</span>
                      </div>
                      <div className="archive-post-content">
                        <h3 className="h3 archive-post-title">
                          <a href="#placeholder">Post</a>
                        </h3>
                        <p className="sub-heading archive-post-tags">

                        </p>
                      </div>
                    </article>
                  </div>
                </div>

                <div className="archive-year">
                  <h2 className="h2 archive-year-title">2023</h2>

                  <div className="archive-posts">
                    <article className="archive-post">
                      <div className="archive-post-date">
                        <span className="sub-heading">Sep</span>
                      </div>
                      <div className="archive-post-content">
                        <h3 className="h3 archive-post-title">
                          <a href="#placeholder">Post</a>
                        </h3>
                        <p className="sub-heading archive-post-tags">

                        </p>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}