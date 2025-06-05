const client_id = process.env.SPOTIFY_CLIENT_ID;
const redirect_uri = process.env.NODE_ENV === 'production'
  ? 'https://willhao.info/api/spotify/callback'
  : 'https://willhao.info/api/spotify/callback'; // Using production for both since localhost isn't allowed

export default function handler(req, res) {
  const scope = 'user-read-currently-playing user-read-playback-state';
  const state = Math.random().toString(36).substring(2, 15);

  const authUrl = 'https://accounts.spotify.com/authorize?' +
    new URLSearchParams({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    });

  res.redirect(authUrl);
}