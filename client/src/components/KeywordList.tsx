import React from "react";
import { PropType } from "./AutoComplete";
import KeywordBlock from "./KeywordBlock";

const KeywordList = ({ keyword, data }: PropType) => {
  return (
    <div>
      <KeywordBlock mode="display" keyword={keyword} />
      <h2>추천 검색어</h2>
      {data.map((item) => {
        const { sickCd, sickNm } = item;
        return (
          <KeywordBlock
            key={sickCd}
            mode="basic"
            keyword={keyword}
            sickname={sickNm}
          />
        );
      })}
    </div>
  );
};

export default KeywordList;
