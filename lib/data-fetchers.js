// lib/data-fetchers.js

const CHESS_USERNAME = 'javablob';
const CLASH_API_TOKEN = process.env.CLASH_API_TOKEN;
const CLASH_PLAYER_TAG = process.env.CLASH_PLAYER_TAG;

export const fetchChessStats = async () => {
  try {
    // Fetch player stats
    const statsResponse = await fetch(`https://api.chess.com/pub/player/${CHESS_USERNAME}/stats`);
    if (!statsResponse.ok) {
      throw new Error('Failed to fetch chess stats');
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

    return formattedStats;
  } catch (error) {
    console.error('Error fetching chess stats:', error);
    // Return default values if fetch fails
    return {
      rapid: { rating: null, games: 0 },
      blitz: { rating: null, games: 0 },
      bullet: { rating: null, games: 0 },
      puzzles: { rating: null, total: 0 },
      totalGames: 0
    };
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
    // Return default values if fetch fails
    return {
      name: 'Player',
      townHallLevel: null,
      trophies: null,
      bestTrophies: null,
      league: null
    };
  }
};