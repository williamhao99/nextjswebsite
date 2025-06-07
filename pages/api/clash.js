import { fetchClashPlayer } from '../../lib/api/data-fetchers';

export default async function handler(req, res) {
  // Set cache headers for better performance
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');

  try {
    const player = await fetchClashPlayer();
    res.status(200).json(player);
  } catch (error) {
    console.error(error);
    // Set shorter cache for errors
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120');
    res.status(500).json({ error: 'Failed to fetch Clash of Clans player data' });
  }
}