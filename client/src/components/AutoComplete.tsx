import React from "react";

import ResultType from "../App";
import KeywordList from "./KeywordList";

export interface PropType {
  keyword: string;
  data: Array<typeof ResultType>;
}

const AutoComplete = ({ keyword, data }: PropType) => {
  return (
    <main className="autoComplete">
      {keyword.trim() === "" ? (
        <p>검색어 없음</p>
      ) : (
        <KeywordList keyword={keyword} data={data} />
      )}
    </main>
  );
};

export default AutoComplete;
