/**
 * 🏠 BASE SITE PAGE: Homepage
 *
 * The main landing page of the website.
 * Contains hero section and site navigation.
 */

// pages/index.js
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import { fetchChessStats, fetchClashPlayer } from '../lib/data-fetchers';

export async function getStaticProps() {
  try {
    // Fetch data for all widgets here
    const [chessData, clashData] = await Promise.all([
      fetchChessStats(),
      fetchClashPlayer(),
    ]);

    return {
      props: {
        chessData,
        clashData,
      },
      // Re-generate the page in the background every 30 minutes
      revalidate: 1800, // 30 minutes in seconds
    };
  } catch (error) {
    console.error('Error fetching homepage data:', error);

    // Return fallback data if fetch fails
    return {
      props: {
        chessData: {
          rapid: { rating: null, games: 0 },
          blitz: { rating: null, games: 0 },
          bullet: { rating: null, games: 0 },
          puzzles: { rating: null, total: 0 },
          totalGames: 0
        },
        clashData: {
          name: 'Player',
          townHallLevel: null,
          trophies: null,
          bestTrophies: null,
          league: null
        },
      },
      revalidate: 1800,
    };
  }
}

export default function Home({ chessData, clashData }) {
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
            chessData={chessData}
            clashData={clashData}
          />
        </main>
      </div>
    </Layout>
  );
}