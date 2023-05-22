import { useState, useEffect } from "react";
import axios, { AxiosError, Method } from "axios";
import { useNavigate } from "react-router-dom";

function useFetch<Type>(
  url: string,
  method: Method,
  body?: any,
  dependency?: any
): {
  loading: boolean;
  error: AxiosError | null;
  data: Type | null;
} {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Type | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const navigate = useNavigate();
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
        if ((error as AxiosError) !== undefined) {
          if (error.status() === 403) {
            navigate("/login");
          }
        }
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, body, navigate, dependency]);

  return { loading, error, data };
}

export { useFetch };
