import { useState, useEffect } from 'react';

const SpotifyIcon = () => (
  <div className="spotify-icon">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  </div>
);

function SpotifyWidgetContainer({ trackData, isPlaying, loading, placeholder }) {
  if (loading) {
    return (
      <div className="spotify-widget-container">
        <div className="spotify-widget loading">
          <div className="spotify-widget-link">
            <div className="spotify-left-section">
              <SpotifyIcon />
            </div>
            <div className="spotify-info">
              <div className="spotify-track">
                <span className="track-name">Loading Spotify...</span>
                <span className="track-artist">Connecting to API</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (placeholder) {
    return (
      <div className="spotify-widget-container">
        <div className="spotify-widget not-playing">
          <a
            href="https://open.spotify.com/user/williamhao99?si=a55b81b68fab41dc"
            target="_blank"
            rel="noopener noreferrer"
            className="spotify-widget-link"
            aria-label="View Spotify profile"
          >
            <div className="spotify-left-section">
              <SpotifyIcon />
            </div>
            <div className="spotify-info-centered">
              <div className="spotify-track">
                <span className="track-name">Spotify</span>
              </div>
              <div className="spotify-status">
                <span className="last-played">No recent activity</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    );
  }

  const LinkWrapper = ({ children }) => {
    if (trackData.songUrl) {
      return (
        <a
          href={trackData.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="spotify-widget-link"
          aria-label={`${isPlaying ? 'Currently playing' : 'Last played'}: ${trackData.name} by ${trackData.artist}`}
        >
          {children}
        </a>
      );
    }
    return <div className="spotify-widget-link">{children}</div>;
  };

  return (
    <div className="spotify-widget-container">
      <div className={`spotify-widget ${isPlaying ? 'playing' : 'not-playing'}`}>
        <LinkWrapper>
          <div className="spotify-left-section">
            <SpotifyIcon />
          </div>

          <div className="spotify-info">
            <div className="spotify-track">
              <span className="track-name">{trackData.name}</span>
              <span className="track-artist">by {trackData.artist}</span>
            </div>
            <div className="spotify-status">
              {isPlaying ? (
                <>
                  <span className="listening-on">Listening on Spotify</span>
                  <div className="sound-bars">
                    <div className="bar bar1"></div>
                    <div className="bar bar2"></div>
                    <div className="bar bar3"></div>
                    <div className="bar bar4"></div>
                  </div>
                </>
              ) : (
                <span className="last-played">Last played on Spotify</span>
              )}
            </div>
          </div>

          {trackData.albumArt && (
            <div className="album-art">
              <img
                src={trackData.albumArt}
                alt={`Album art for ${trackData.name}`}
                loading="lazy"
              />
            </div>
          )}
        </LinkWrapper>
      </div>
    </div>
  );
}

export default function SpotifyWidget() {
  // For now, show placeholder state since Spotify API requires authentication
  // TODO: Re-implement Spotify API with proper authentication
  return <SpotifyWidgetContainer placeholder />;

  // Commented out the old implementation that was causing 404 errors
  /*
  const [trackData, setTrackData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSpotifyData = async () => {
      try {
        const response = await fetch('/api/spotify/current-track');
        const data = await response.json();

        if (data.isPlaying) {
          setTrackData(data);
          setIsPlaying(true);
        } else {
          setTrackData(data.lastPlayed || null);
          setIsPlaying(false);
        }
      } catch (error) {
        console.error('Error fetching Spotify data:', error);
        setTrackData(null);
        setIsPlaying(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpotifyData();
    const interval = setInterval(fetchSpotifyData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <SpotifyWidgetContainer loading />;
  }

  if (!trackData) {
    return <SpotifyWidgetContainer placeholder />;
  }

  return (
    <SpotifyWidgetContainer
      trackData={trackData}
      isPlaying={isPlaying}
    />
  );
  */
}