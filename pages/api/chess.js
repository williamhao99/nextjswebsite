import { fetchChessStats } from '../../lib/api/data-fetchers';

export default async function handler(req, res) {
  // Set cache headers for better performance
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');

  try {
    const stats = await fetchChessStats();
    res.status(200).json(stats);
  } catch (error) {
    console.error(error);
    // Set shorter cache for errors
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120');
    res.status(500).json({ error: 'Failed to fetch chess stats' });
  }
}