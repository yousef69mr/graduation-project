import { useState, useEffect } from "react";
import axios from "axios";
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);
    const source = axios.CancelToken.source();
    axios
      .get(url, { cancelToken: source.token })
      .then((res) => {
        //checking for multiple responses for more flexibility
        //with the url we send in.
        res.data && setData(res.data);
        // console.log(res,res.data)
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setLoading(false));
    return () => {
      source.cancel();
    };
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
