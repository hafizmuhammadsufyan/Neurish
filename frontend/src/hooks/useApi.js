import { useState, useCallback } from 'react';

/**
 * Custom React hook for tracking API state (data, loading status, error bounds).
 * Exposes a wrapper function to execute async tasks cleanly.
 * 
 * @returns {Object} { data, loading, error, execute }
 */
export default function useApi(apiFunc) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFunc(...args);
      setData(response);
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.message || 'Something went wrong');
      setLoading(false);
      throw err;
    }
  }, [apiFunc]);

  return { data, loading, error, execute };
}
