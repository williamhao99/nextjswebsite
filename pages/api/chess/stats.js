import fs from 'fs';
import path from 'path';

const CHESS_USERNAME = 'javablob';
const DATA_FILE = path.join(process.cwd(), 'data', 'chess-stats.json');

// Ensure data directory exists
const ensureDataDir = () => {
  const dataDir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Cache data for 30 minutes to avoid rate limiting
const getCachedData = () => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
      const now = Date.now();
      const thirtyMinutes = 30 * 60 * 1000;

      if (now - data.lastUpdated < thirtyMinutes) {
        return data.stats;
      }
    }
  } catch (error) {
    console.error('Error reading cached chess data:', error);
  }
  return null;
};

const saveDataToCache = (stats) => {
  try {
    ensureDataDir();
    const data = {
      stats,
      lastUpdated: Date.now()
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving chess data to cache:', error);
  }
};

const fetchChessStats = async () => {
  try {
    // Fetch player stats
    const statsResponse = await fetch(`https://api.chess.com/pub/player/${CHESS_USERNAME}/stats`);
    if (!statsResponse.ok) {
      throw new Error('Failed to fetch chess stats');
    }
    const statsData = await statsResponse.json();

    // Fetch puzzle stats
    const puzzleResponse = await fetch(`https://api.chess.com/pub/player/${CHESS_USERNAME}/stats`);
    let puzzleData = null;
    if (puzzleResponse.ok) {
      puzzleData = await puzzleResponse.json();
    }

    // Calculate total games
    const totalGames = (
      (statsData.chess_rapid?.last?.games_played || 0) +
      (statsData.chess_blitz?.last?.games_played || 0) +
      (statsData.chess_bullet?.last?.games_played || 0) +
      (statsData.chess_daily?.last?.games_played || 0)
    );

    const formattedStats = {
      rapid: {
        rating: statsData.chess_rapid?.last?.rating,
        games: statsData.chess_rapid?.last?.games_played || 0
      },
      blitz: {
        rating: statsData.chess_blitz?.last?.rating,
        games: statsData.chess_blitz?.last?.games_played || 0
      },
      bullet: {
        rating: statsData.chess_bullet?.last?.rating,
        games: statsData.chess_bullet?.last?.games_played || 0
      },
      puzzles: {
        rating: statsData.tactics?.highest?.rating,
        total: statsData.tactics?.highest?.total_attempts || 0
      },
      totalGames
    };

    return formattedStats;
  } catch (error) {
    console.error('Error fetching chess stats:', error);
    throw error;
  }
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Try to get cached data first
    let stats = getCachedData();

    if (!stats) {
      // Fetch fresh data if no valid cache
      stats = await fetchChessStats();
      saveDataToCache(stats);
    }

    res.status(200).json(stats);
  } catch (error) {
    console.error('Chess API error:', error);

    // Try to return cached data even if it's expired, as fallback
    const cachedStats = getCachedData();
    if (cachedStats) {
      res.status(200).json(cachedStats);
    } else {
      res.status(500).json({
        error: 'Failed to fetch chess stats',
        rapid: { rating: null, games: 0 },
        blitz: { rating: null, games: 0 },
        bullet: { rating: null, games: 0 },
        puzzles: { rating: null, total: 0 },
        totalGames: 0
      });
    }
  }
}