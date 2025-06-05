import fs from 'fs';
import path from 'path';

// You'll need to get these from Clash of Clans API
// Get API token from: https://developer.clashofclans.com/
const CLASH_API_TOKEN = process.env.CLASH_API_TOKEN; // Add this to your .env.local
const CLASH_PLAYER_TAG = process.env.CLASH_PLAYER_TAG; // Your player tag (without #)

const DATA_FILE = path.join(process.cwd(), 'data', 'clash-player.json');

// Ensure data directory exists
const ensureDataDir = () => {
  const dataDir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Cache data for 1 hour to avoid rate limiting
const getCachedData = () => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
      const now = Date.now();
      const oneHour = 60 * 60 * 1000;

      if (now - data.lastUpdated < oneHour) {
        return data.player;
      }
    }
  } catch (error) {
    console.error('Error reading cached clash data:', error);
  }
  return null;
};

const saveDataToCache = (player) => {
  try {
    ensureDataDir();
    const data = {
      player,
      lastUpdated: Date.now()
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving clash data to cache:', error);
  }
};

const fetchClashPlayer = async () => {
  if (!CLASH_API_TOKEN || !CLASH_PLAYER_TAG) {
    throw new Error('Clash of Clans API token or player tag not configured');
  }

  try {
    const response = await fetch(
      `https://api.clashofclans.com/v1/players/%23${CLASH_PLAYER_TAG}`,
      {
        headers: {
          'Authorization': `Bearer ${CLASH_API_TOKEN}`,
          'Accept': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Clash API error: ${response.status}`);
    }

    const playerData = await response.json();

    const formattedPlayer = {
      name: playerData.name,
      tag: playerData.tag,
      townHallLevel: playerData.townHallLevel,
      trophies: playerData.trophies,
      bestTrophies: playerData.bestTrophies,
      league: playerData.league ? {
        name: playerData.league.name,
        iconUrls: playerData.league.iconUrls
      } : null,
      clan: playerData.clan ? {
        name: playerData.clan.name,
        tag: playerData.clan.tag
      } : null,
      role: playerData.role,
      warStars: playerData.warStars,
      attackWins: playerData.attackWins,
      defenseWins: playerData.defenseWins,
      builderHallLevel: playerData.builderHallLevel || null,
      versusTrophies: playerData.versusTrophies || null,
      bestVersusTrophies: playerData.bestVersusTrophies || null
    };

    return formattedPlayer;
  } catch (error) {
    console.error('Error fetching clash player:', error);
    throw error;
  }
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Try to get cached data first
    let player = getCachedData();

    if (!player) {
      // Fetch fresh data if no valid cache
      player = await fetchClashPlayer();
      saveDataToCache(player);
    }

    res.status(200).json(player);
  } catch (error) {
    console.error('Clash API error:', error);

    // Try to return cached data even if it's expired, as fallback
    const cachedPlayer = getCachedData();
    if (cachedPlayer) {
      res.status(200).json(cachedPlayer);
    } else {
      res.status(500).json({
        error: 'Failed to fetch clash player data',
        name: 'Player',
        townHallLevel: null,
        trophies: null,
        bestTrophies: null,
        league: null
      });
    }
  }
}