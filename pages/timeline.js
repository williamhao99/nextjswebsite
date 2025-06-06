import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';

export default function Timeline() {
  return (
    <Layout title="Timeline - Will Hao" description="My journey and experiences">
      <div className="content-area custom-page">
        <main className="site-main site-layout">
          <PageHeader
            title="Timeline"
            description="A timeline of my personal life, student, and career milestones."
            isHero={true}
          />

          <section className="section-container">
            <div className="container medium">
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-date">
                    <span className="sub-heading">2024</span>
                  </div>
                  <div className="timeline-content">
                    <h3 className="h3">Event</h3>
                    <p className="body-1">
                      •
                    </p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-date">
                    <span className="sub-heading">2023</span>
                  </div>
                  <div className="timeline-content">
                    <h3 className="h3">Event</h3>
                    <p className="body-1">
                      •
                    </p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-date">
                    <span className="sub-heading">2022</span>
                  </div>
                  <div className="timeline-content">
                    <h3 className="h3">Event</h3>
                    <p className="body-1">
                      •
                    </p>
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