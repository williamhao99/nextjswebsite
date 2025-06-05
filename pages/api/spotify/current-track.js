import fs from 'fs';
import path from 'path';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

// File to store last played track
const LAST_PLAYED_FILE = path.join(process.cwd(), 'data', 'last-played.json');

// Ensure data directory exists
const ensureDataDir = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Read last played data
const getLastPlayed = () => {
  try {
    ensureDataDir();
    if (fs.existsSync(LAST_PLAYED_FILE)) {
      const data = fs.readFileSync(LAST_PLAYED_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading last played data:', error);
  }
  return null;
};

// Store last played data
const storeLastPlayed = (trackData) => {
  try {
    ensureDataDir();
    fs.writeFileSync(LAST_PLAYED_FILE, JSON.stringify(trackData, null, 2));
  } catch (error) {
    console.error('Error storing last played data:', error);
  }
};

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }).toString(),
  });

  return response.json();
};

const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (response.status === 204 || response.status > 400) {
    return { isPlaying: false };
  }

  const song = await response.json();

  if (!song.is_playing) {
    return { isPlaying: false };
  }

  const isPlaying = song.is_playing;
  const name = song.item.name;
  const artist = song.item.artists.map((artist) => artist.name).join(', ');
  const album = song.item.album.name;
  const albumArt = song.item.album.images[0]?.url;
  const songUrl = song.item.external_urls.spotify;

  const trackData = {
    isPlaying,
    name,
    artist,
    album,
    albumArt,
    songUrl,
    timestamp: new Date().toISOString(),
  };

  // Store this as the last played track
  storeLastPlayed(trackData);

  return trackData;
};

export default async function handler(req, res) {
  try {
    const response = await getNowPlaying();

    if (!response.isPlaying) {
      // Return last played data if available
      const lastPlayed = getLastPlayed();
      return res.status(200).json({
        isPlaying: false,
        lastPlayed: lastPlayed
      });
    }

    const { isPlaying, name, artist, album, albumArt, songUrl, timestamp } = response;

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=60, stale-while-revalidate=30'
    );

    return res.status(200).json({
      isPlaying,
      name,
      artist,
      album,
      albumArt,
      songUrl,
      timestamp,
    });
  } catch (error) {
    console.error('Spotify API Error:', error);

    // On error, still try to return last played data
    const lastPlayed = getLastPlayed();
    return res.status(200).json({
      isPlaying: false,
      lastPlayed: lastPlayed,
      error: 'Unable to fetch current track'
    });
  }
}