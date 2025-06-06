import BaseWidget from './BaseWidget';

const ClashWidget = () => {
  const formatTrophies = (trophies) => trophies ? trophies.toLocaleString() : '0';

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

  const renderContent = (data) => (
    <>
      <div className="clash-info">
        <div className="clash-main">
          <div className="trophies-info">
            <div className="trophy-item">
              <span className="trophy-label">Current</span>
              <span className="trophy-value">🏆 {formatTrophies(data?.trophies)}</span>
            </div>
            <div className="trophy-item">
              <span className="trophy-label">Best</span>
              <span className="trophy-value">⭐ {formatTrophies(data?.bestTrophies)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="clash-right-section">
        <div className="town-hall-centered">
          <span className="th-emoji">{getTownHallEmoji(data?.townHallLevel)}</span>
          <span className="th-level">TH{data?.townHallLevel || '?'}</span>
        </div>
      </div>
    </>
  );

  return (
    <BaseWidget
      type="clash"
      endpoint="/api/clash/player"
      interval={60 * 60 * 1000} // 1 hour
      username={(data) => data?.name}
      icon={icon}
      renderContent={renderContent}
      loadingText="Loading..."
    />
  );
};

export default ClashWidget;