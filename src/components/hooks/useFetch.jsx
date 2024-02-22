import { useEffect, useState } from "react";

const useFetch = (url, refetch = false) => {
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setPending(true);
    setTimeout(async () => {
      fetch(url, {
        method: "GET",
        // credentials: "include",
        // mode: "no-cors",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          if (!response.ok) {
            throw Error("could not fetch the data");
          }
          return response.json();
        })
        .then((data) => {
          setData(data);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => setPending(false));
    }, 1000);
    clearTimeout();
  }, [url, refetch]);

  return { data, pending, error };
};

export default useFetch;
