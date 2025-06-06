import { fetchClashPlayer } from '../../lib/data-fetchers';

export default async function handler(req, res) {
  try {
    const player = await fetchClashPlayer();
    res.status(200).json(player);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch Clash of Clans player data' });
  }
}