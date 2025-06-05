const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.NODE_ENV === 'production'
  ? 'https://willhao.info/api/spotify/callback'
  : 'https://willhao.info/api/spotify/callback'; // Using production for both since localhost isn't allowed

export default async function handler(req, res) {
  const { code, state } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Authorization code missing' });
  }

  try {
    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri
      })
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error('Token exchange failed:', tokenData);
      return res.status(400).json({ error: 'Failed to exchange code for token', details: tokenData });
    }

    const { access_token, refresh_token, expires_in } = tokenData;

    // Display the tokens for the user to copy to their .env.local
    res.status(200).json({
      success: true,
      message: 'Authorization successful! Copy these tokens to your .env.local file:',
      tokens: {
        access_token,
        refresh_token,
        expires_in,
        expires_at: new Date(Date.now() + expires_in * 1000).toISOString()
      },
      instructions: [
        'Add these to your .env.local file:',
        `SPOTIFY_ACCESS_TOKEN=${access_token}`,
        `SPOTIFY_REFRESH_TOKEN=${refresh_token}`,
        'Then restart your development server.'
      ]
    });
  } catch (error) {
    console.error('Callback error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}