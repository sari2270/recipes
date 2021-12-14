import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

const useFetch = (url, options, depends = []) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios(baseUrl + url, options);
        setData(res.data);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [...depends]);
  return { data, error, isLoading };
};

export default useFetch;
