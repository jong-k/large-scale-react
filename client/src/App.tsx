/*
TODO: src/components에 인풋에 포커스되면 만들 컴포넌트 만들기 

 */
import { ChangeEvent, useEffect, useState } from "react";

import { getData } from "./api";

interface ResultType {
  sickCd: string;
  sickNm: string;
}

function App() {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (inputValue.trim() !== "") {
      const fetchData = async () => {
        const newData = await getData(inputValue);
        setData(newData);
      };
      fetchData();
    }
    setData([]);
  }, [inputValue]);

  return (
    <main className="container">
      <h2 className="header">임상시험 관련 정보 검색</h2>
      <input
        className="search-bar"
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="질환명을 입력해주세요"
      />
      <h2>{inputValue}</h2>
      {data.map((result: ResultType) => {
        return (
          <div key={result.sickCd}>
            <h2>{result.sickCd}</h2>
            <h2>{result.sickNm}</h2>
          </div>
        );
      })}
    </main>
  );
}

export default App;
