import { useState, useEffect, useCallback } from "react";
import httpService from '../utils/httpService'

function useFetch(query, page) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);

  const sendByPage = useCallback(async () => {
    if (!query) {
      try {
        setError(false);
        setLoading(true);
        const res = await httpService.get(`?page=${page}`)
        setList((prev) => [
          ...new Set([...prev, ...res.data])
        ]);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err);
      }
    }
  }, [query, page]);

  const sendByQuery = useCallback(async () => {
    if (query) {
      try {
        setError(false);
        const res = await httpService.get(`?description=${query.desc}&location=${query.location}&full_time=${query.option}`)
        setList(res.data);
      } catch (err) {
        setError(err);
      }
    }
  }, [query]);

  useEffect(() => {
    sendByPage(page);
  }, [sendByPage, page]);

  useEffect(() => {
    sendByQuery(query);
  }, [sendByQuery, query]);

  return { loading, error, list };
}

export default useFetch;