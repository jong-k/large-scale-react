import { useState, useEffect } from "react";
import { movieInstance } from "../axios/customInstance.ts";

export default function Interceptor() {
  const [movies, setMovies] = useState([]);

  const fetchData = async () => {
    try {
      // 여기서 targetDt 를 추가하고 싶은데.. 기존 URL 뒤에 / 이 추가되어 버려서 안됨
      const res = await movieInstance.get(""); // url 넣으면 /url 형태로 붙음
      // console.log("여기는 axios"); // 여기 콘솔이 인터셉터보다 느림
      // @ts-ignore
      setMovies(res);
      // setMovies(data.boxOfficeResult.dailyBoxOfficeList); // 원래 이 형태가 맞는데, 응답인터셉터에서 걸러줌
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h2>230822 Movie</h2>
      <section>
        {movies.length ? (
          movies.map(({ movieNm, rank }) => (
            <p key={rank} className="mt-1">
              {rank}. {movieNm}
            </p>
          ))
        ) : (
          <h2>Loading...</h2>
        )}
      </section>
    </>
  );
}
