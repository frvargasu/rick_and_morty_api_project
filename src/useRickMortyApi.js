import axios from 'axios';
import { useEffect, useState } from 'react';

export function useRickMortyApi(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get(`https://rickandmortyapi.com/api/${endpoint}`)
      .then(res => setData(res.data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [endpoint]);

  return { data, loading, error };
}
