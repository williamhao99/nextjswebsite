import { useState, useEffect } from 'react';

const BaseWidget = ({
  type,
  endpoint,
  interval = 30 * 60 * 1000, // 30 minutes default
  username,
  link,
  icon,
  renderContent,
  loadingText = "Loading...",
  className = ""
}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint);
        if (response.ok) {
          const result = await response.json();
          setData(result);
          setError(false);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    if (interval > 0) {
      const timer = setInterval(fetchData, interval);
      return () => clearInterval(timer);
    }
  }, [endpoint, interval]);

  const widgetClasses = `${type}-widget ${loading ? 'loading' : ''} ${error ? 'error' : ''} ${className}`;

  // Handle dynamic username from data or static username
  const displayUsername = typeof username === 'function'
    ? username(data) || loadingText
    : username || loadingText;

  const content = (
    <div className="widget-row">
      <div className={`${type}-left-section`}>
        <div className={`${type}-icon`} aria-hidden="true">
          {icon}
        </div>
        <div className="widget-username">{displayUsername}</div>
      </div>
      {renderContent(data, loading, error)}
    </div>
  );

  return (
    <div className={`${type}-widget-container`}>
      <div className={widgetClasses}>
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`${type}-widget-link`}
            aria-label={`View ${type} profile`}
          >
            {content}
          </a>
        ) : (
          <div className={`${type}-widget-link`}>
            {content}
          </div>
        )}
      </div>
    </div>
  );
};

export default BaseWidget;