import { useState, useEffect, useCallback } from 'react';

// Client-side cache for API responses
const clientCache = new Map();
const CACHE_TTL = 3 * 60 * 1000; // 3 minutes client-side cache

const useApiData = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetched, setLastFetched] = useState(null);

  const {
    refetchInterval = null,
    retryAttempts = 2,
    retryDelay = 2000,
    enableCache = true
  } = options;

  const getCachedData = useCallback((key) => {
    if (!enableCache) return null;
    const cached = clientCache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data;
    }
    return null;
  }, [enableCache]);

  const setCachedData = useCallback((key, data) => {
    if (!enableCache) return;
    clientCache.set(key, {
      data,
      timestamp: Date.now()
    });
  }, [enableCache]);

  const fetchData = useCallback(async (attempt = 0) => {
    try {
      // Check cache first
      const cachedData = getCachedData(endpoint);
      if (cachedData && attempt === 0) {
        setData(cachedData);
        setLoading(false);
        setError(null);
        setLastFetched(Date.now());
        return;
      }

      // Only show loading for initial fetch, not retries
      if (attempt === 0) {
        setLoading(true);
        setError(null);
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(endpoint, {
        signal: controller.signal,
        headers: {
          'Cache-Control': 'no-cache'
        }
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      // Handle API error responses
      if (result.error) {
        throw new Error(result.error);
      }

      setData(result);
      setError(null);
      setCachedData(endpoint, result);
      setLastFetched(Date.now());

    } catch (err) {
      console.error(`API fetch error for ${endpoint}:`, err);

      // Retry logic
      if (attempt < retryAttempts && err.name !== 'AbortError') {
        setTimeout(() => {
          fetchData(attempt + 1);
        }, retryDelay * Math.pow(2, attempt)); // Exponential backoff
        return;
      }

      // If all retries failed, set error
      setError(err.message || 'Failed to fetch data');

      // Keep existing data if available, otherwise set loading to false
      if (!data) {
        setLoading(false);
      }
    } finally {
      if (attempt === 0) {
        setLoading(false);
      }
    }
  }, [endpoint, data, retryAttempts, retryDelay, getCachedData, setCachedData]);

  // Refresh function for manual refetch
  const refresh = useCallback(() => {
    // Clear cache for this endpoint
    if (enableCache) {
      clientCache.delete(endpoint);
    }
    fetchData();
  }, [fetchData, endpoint, enableCache]);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Set up automatic refetch interval
  useEffect(() => {
    if (!refetchInterval) return;

    const interval = setInterval(() => {
      // Only refetch if data is stale
      if (lastFetched && Date.now() - lastFetched > refetchInterval) {
        fetchData();
      }
    }, refetchInterval);

    return () => clearInterval(interval);
  }, [refetchInterval, lastFetched, fetchData]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Clear any pending timeouts/intervals
    };
  }, []);

  return {
    data,
    loading,
    error,
    refresh,
    lastFetched
  };
};

export default useApiData;