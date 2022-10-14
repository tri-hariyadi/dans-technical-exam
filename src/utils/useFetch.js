import { useState, useEffect, useCallback } from "react";
import httpService from '../utils/httpService'

function useFetch(page) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);

  const sendQuery = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await httpService.get(`?page=${page}`)
      setList((prev) => [
        ...new Set([...prev, ...res.data])
      ]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  }, [page]);

  useEffect(() => {
    sendQuery(page);
  }, [sendQuery, page]);

  return { loading, error, list };
}

export default useFetch;