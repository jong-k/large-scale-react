import { useEffect, useRef, useState } from "react";

export const useFetch = (query: string) => {
  const cache = useRef({});
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (query.trim() === "") return;
    let result = [];
    const fetchData = async () => {
      setStatus("fetching");
      if (cache[query]) {
        result = cache[query];
      } else {
        const res = await fetch(`http://localhost:4000/sick/?q=${query}`);
        result = await res.json();
        cache[query] = result;
        console.info(
          "%ccalling api",
          "background: radial-gradient(red, green, blue); padding: 1px;",
        );
      }
      setData(result);
      setStatus("fetched");
    };

    fetchData();
  }, [query]);

  return { status, data };
};
