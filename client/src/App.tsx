import { ChangeEvent, useEffect, useState, useCallback } from "react";

import { getData } from "./api";
import { debounce } from "./utils";
import AutoComplete from "./components/AutoComplete";

export interface ResultType {
  sickCd: string;
  sickNm: string;
}

function App() {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);
  const [isFocus, setIsFocus] = useState(false);

  const MemoizedHandleChange = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    }, 200),
    [],
  );

  useEffect(() => {
    if (inputValue.trim() !== "") {
      const fetchData = async () => {
        const newData = await getData(inputValue);
        if (Array.isArray(newData)) setData(newData);
        console.info(
          "%ccalling api",
          "background: radial-gradient(red, green, blue); padding: 1px;",
        );
      };
      fetchData();
      return;
    }
    setData([]);
  }, [inputValue]);

  return (
    <main className="container">
      <h2 className="header">임상시험 관련 정보 검색</h2>
      <input
        className="search-bar"
        type="text"
        onChange={MemoizedHandleChange}
        placeholder="질환명을 입력해주세요"
        onFocus={() => {
          setIsFocus(true);
        }}
        onBlur={() => {
          setIsFocus(false);
        }}
      />
      {isFocus && <AutoComplete keyword={inputValue} data={data} />}
    </main>
  );
}

export default App;
