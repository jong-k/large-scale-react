import { useState, useEffect } from "react";
import { dadJokeInstance } from "../axios/customInstance.ts";

export default function AxiosCustomInstance() {
  const [page, setPage] = useState(1);
  const [jokes, setJokes] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await dadJokeInstance.get(`/search?page=${page}`);
      setJokes(data.results);
    } catch (err) {
      console.log(err);
    }
  };

  const addPage = () => {
    if (page < 20) setPage(page + 1);
  };

  const minusPage = () => {
    if (page > 1) setPage(page - 1);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center">Axios Custom Instance</h1>
      <div className="flex gap-3">
        <button
          className="btn btn-block"
          onClick={minusPage}
          disabled={page === 1}
        >
          -
        </button>
        <span className="text-xl">{page}</span>
        <button
          className="btn btn-block"
          onClick={addPage}
          disabled={page === 20}
        >
          +
        </button>
      </div>
      <section>
        {jokes.length ? (
          jokes.map(({ id, joke }) => (
            <p key={id} className="mt-1">
              -. {joke}
            </p>
          ))
        ) : (
          <h2>데이터가 없습니다</h2>
        )}
      </section>
    </div>
  );
}
