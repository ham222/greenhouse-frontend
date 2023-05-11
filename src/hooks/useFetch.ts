import { useState, useEffect } from "react";
import axios, { Method } from "axios";

function useFetch<Type>(
  url: string,
  method: Method,
  body?: any
): { loading: boolean; error: string | null; data: Type | null } {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Type | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios({
          url: url,
          method: method,
          data: body,
        });
        const data = response?.data;
        setData(data);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, body]);

  return { loading, error, data };
}

export { useFetch };
