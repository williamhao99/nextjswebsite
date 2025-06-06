import { useState, useEffect } from 'react';

const ClashWidget = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await fetch('/api/clash');
        const playerData = await response.json();
        setData(playerData);
      } catch (error) {
        console.error("Failed to fetch Clash of Clans data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayer();
  }, []);

  const formatTrophies = (trophies) => trophies ? String(trophies) : '0';

  const getTownHallEmoji = (level) => {
    const emojiMap = {
      15: '🏰', 14: '🏛️', 13: '🏯', 12: '🏛️', 11: '🏰',
      10: '🏯', 9: '🏛️', 8: '🏰', 7: '🏯', 6: '🏛️', 5: '🏰'
    };
    return emojiMap[level] || '🏠';
  };

  const icon = (
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <image
        href="/images/clash-of-clans-icon.png"
        x="0"
        y="0"
        width="32"
        height="32"
        style={{
          borderRadius: '4px',
          objectFit: 'cover'
        }}
      />
    </svg>
  );

  const content = (
    <div className="widget-row">
      <div className="clash-left-section">
        <div className="clash-icon" aria-hidden="true">
          {icon}
        </div>
        <div className="widget-username">{loading ? 'Loading...' : data?.name || 'Player'}</div>
      </div>
      <div className="clash-row">
        {/* Town Hall section in the middle */}
        <div className="clash-townhall">
          <span className="th-emoji">{loading ? '...' : getTownHallEmoji(data?.townHallLevel)}</span>
          <span className="th-level">TH{loading ? '?' : data?.townHallLevel || '?'}</span>
        </div>
        {/* Trophies section on the right */}
        <div className="clash-trophies-col">
          <div className="trophy-row">
            <span className="trophy-label">CURRENT</span>
            <span className="trophy-value"><span role="img" aria-label="trophy">🏆</span>{loading ? '...' : formatTrophies(data?.trophies)}</span>
          </div>
          <div className="trophy-row">
            <span className="trophy-label">BEST</span>
            <span className="trophy-value"><span role="img" aria-label="star">⭐</span>{loading ? '...' : formatTrophies(data?.bestTrophies)}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="clash-widget-container">
      <div className={`clash-widget ${loading ? 'loading' : ''}`}>
        <div className="clash-widget-link">
          {content}
        </div>
      </div>
    </div>
  );
};

export default ClashWidget;