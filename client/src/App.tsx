import { ChangeEvent, useState, useCallback } from "react";

import { debounce } from "./utils";
import { useFetch } from "./hooks/useFetch";
import AutoComplete from "./components/AutoComplete";

export interface ResultType {
  sickCd: string;
  sickNm: string;
}

function App() {
  const [inputValue, setInputValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const MemoizedHandleChange = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    }, 200),
    [],
  );

  const { status, data } = useFetch(inputValue);

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
      {isFocus && status === "fetching" ? (
        <h2>검색중</h2>
      ) : (
        <AutoComplete keyword={inputValue} data={data} />
      )}
    </main>
  );
}

export default App;
