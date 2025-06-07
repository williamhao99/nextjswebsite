import useApiData from '../../lib/hooks/useApiData';

const ClashWidget = () => {
  const { data, loading, error } = useApiData('/api/clash', {
    retryAttempts: 3,
    retryDelay: 1500,
    refetchInterval: 5 * 60 * 1000 // Refetch every 5 minutes
  });

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

  // Loading skeleton with same dimensions
  const LoadingSkeleton = () => (
    <div className="widget-row">
      <div className="clash-left-section">
        <div className="clash-icon loading-skeleton" aria-hidden="true">
          {icon}
        </div>
        <div className="widget-username loading-text">Loading...</div>
      </div>
      <div className="clash-row">
        {/* Town Hall section in the middle */}
        <div className="clash-townhall">
          <span className="th-emoji">🏠</span>
          <span className="th-level loading-dots">TH?</span>
        </div>
        {/* Trophies section on the right */}
        <div className="clash-trophies-col">
          <div className="trophy-row">
            <span className="trophy-label">CURRENT</span>
            <span className="trophy-value"><span role="img" aria-label="trophy">🏆</span><span className="loading-dots">Loading...</span></span>
          </div>
          <div className="trophy-row">
            <span className="trophy-label">BEST</span>
            <span className="trophy-value"><span role="img" aria-label="star">⭐</span><span className="loading-dots">Loading...</span></span>
          </div>
        </div>
      </div>
    </div>
  );

  // Error state with same dimensions
  const ErrorState = () => (
    <div className="widget-row">
      <div className="clash-left-section">
        <div className="clash-icon" aria-hidden="true">
          {icon}
        </div>
        <div className="widget-username">Player</div>
      </div>
      <div className="clash-row">
        {/* Town Hall section in the middle */}
        <div className="clash-townhall">
          <span className="th-emoji">🏠</span>
          <span className="th-level error-text">TH?</span>
        </div>
        {/* Trophies section on the right */}
        <div className="clash-trophies-col">
          <div className="trophy-row">
            <span className="trophy-label">CURRENT</span>
            <span className="trophy-value"><span role="img" aria-label="trophy">🏆</span><span className="error-text">—</span></span>
          </div>
          <div className="trophy-row">
            <span className="trophy-label">BEST</span>
            <span className="trophy-value"><span role="img" aria-label="star">⭐</span><span className="error-text">—</span></span>
          </div>
        </div>
      </div>
    </div>
  );

  // Loaded content with same dimensions
  const LoadedContent = () => (
    <div className="widget-row">
      <div className="clash-left-section">
        <div className="clash-icon" aria-hidden="true">
          {icon}
        </div>
        <div className="widget-username">{data?.name || 'Player'}</div>
      </div>
      <div className="clash-row">
        {/* Town Hall section in the middle */}
        <div className="clash-townhall">
          <span className="th-emoji">{getTownHallEmoji(data?.townHallLevel)}</span>
          <span className="th-level">TH{data?.townHallLevel || '?'}</span>
        </div>
        {/* Trophies section on the right */}
        <div className="clash-trophies-col">
          <div className="trophy-row">
            <span className="trophy-label">CURRENT</span>
            <span className="trophy-value"><span role="img" aria-label="trophy">🏆</span>{formatTrophies(data?.trophies)}</span>
          </div>
          <div className="trophy-row">
            <span className="trophy-label">BEST</span>
            <span className="trophy-value"><span role="img" aria-label="star">⭐</span>{formatTrophies(data?.bestTrophies)}</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Render appropriate content based on state
  const renderContent = () => {
    if (error && !data) {
      return <ErrorState />;
    }
    if (loading && !data) {
      return <LoadingSkeleton />;
    }
    return <LoadedContent />;
  };

  return (
    <div className="clash-widget-container">
      <div className={`clash-widget ${loading ? 'loading' : ''} ${error ? 'error' : ''}`}>
        <div className="clash-widget-link">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ClashWidget;