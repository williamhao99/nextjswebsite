// lib/data-fetchers.js

const CHESS_USERNAME = 'javablob';
const CLASH_API_TOKEN = process.env.CLASH_API_TOKEN;
const CLASH_PLAYER_TAG = process.env.CLASH_PLAYER_TAG;

// Cache configuration
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const cache = new Map();

// Helper function to create fetch with timeout
const fetchWithTimeout = async (url, options = {}, timeout = 10000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
};

// Generic cache helper
const getCachedData = (key) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  return null;
};

const setCachedData = (key, data) => {
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
};

export const fetchChessStats = async () => {
  const cacheKey = `chess-${CHESS_USERNAME}`;

  // Check cache first
  const cachedData = getCachedData(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    // Fetch player stats with timeout
    const statsResponse = await fetchWithTimeout(
      `https://api.chess.com/pub/player/${CHESS_USERNAME}/stats`,
      {},
      8000 // 8 second timeout
    );

    if (!statsResponse.ok) {
      throw new Error(`Chess API error: ${statsResponse.status}`);
    }

    const statsData = await statsResponse.json();

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

    // Cache the successful result
    setCachedData(cacheKey, formattedStats);
    return formattedStats;
  } catch (error) {
    console.error('Error fetching chess stats:', error);
    // Return default values if fetch fails
    const defaultStats = {
      rapid: { rating: null, games: 0 },
      blitz: { rating: null, games: 0 },
      bullet: { rating: null, games: 0 },
      puzzles: { rating: null, total: 0 },
      totalGames: 0
    };

    // Cache default values for a shorter time (1 minute) to retry sooner
    cache.set(cacheKey, {
      data: defaultStats,
      timestamp: Date.now() - (CACHE_TTL - 60000)
    });

    return defaultStats;
  }
};

export const fetchClashPlayer = async () => {
  if (!CLASH_API_TOKEN || !CLASH_PLAYER_TAG) {
    console.warn('Clash of Clans API token or player tag not configured');
    return {
      name: 'Player',
      townHallLevel: null,
      trophies: null,
      bestTrophies: null,
      league: null
    };
  }

  const cacheKey = `clash-${CLASH_PLAYER_TAG}`;

  // Check cache first
  const cachedData = getCachedData(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetchWithTimeout(
      `https://api.clashofclans.com/v1/players/%23${CLASH_PLAYER_TAG}`,
      {
        headers: {
          'Authorization': `Bearer ${CLASH_API_TOKEN}`,
          'Accept': 'application/json'
        }
      },
      8000 // 8 second timeout
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

    // Cache the successful result
    setCachedData(cacheKey, formattedPlayer);
    return formattedPlayer;
  } catch (error) {
    console.error('Error fetching clash player:', error);
    // Return default values if fetch fails
    const defaultPlayer = {
      name: 'Player',
      townHallLevel: null,
      trophies: null,
      bestTrophies: null,
      league: null
    };

    // Cache default values for a shorter time (1 minute) to retry sooner
    cache.set(cacheKey, {
      data: defaultPlayer,
      timestamp: Date.now() - (CACHE_TTL - 60000)
    });

    return defaultPlayer;
  }
};