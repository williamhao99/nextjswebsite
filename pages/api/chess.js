import { fetchChessStats } from '../../lib/data-fetchers';

export default async function handler(req, res) {
  try {
    const stats = await fetchChessStats();
    res.status(200).json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch chess stats' });
  }
}