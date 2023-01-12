import React from "react";
import { PropType } from "./AutoComplete";
import KeywordBlock from "./KeywordBlock";

// TODO: 키보드 입력 구현
// https://bobbyhadz.com/blog/react-onkeydown-div

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
