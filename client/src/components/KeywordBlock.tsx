import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

interface PropType {
  mode: "display" | "basic";
  keyword?: string;
  sickname?: string;
}

interface BoldType {
  boldText: string;
  basicText: string;
}

const BoldedText = ({ boldText, basicText }: BoldType) => {
  const splittedArr = basicText.split(boldText);
  return (
    <span>
      {splittedArr.map((item, idx) => (
        <>
          {item}
          {idx !== splittedArr.length - 1 && <b>{boldText}</b>}
        </>
      ))}
    </span>
  );
};

const KeywordBlock = ({ mode, keyword, sickname }: PropType) => {
  return mode === "display" ? (
    <main className="keyword-container">
      <AiOutlineSearch />
      <b>{keyword}</b>
    </main>
  ) : (
    <main className="keyword-container">
      <AiOutlineSearch />
      <BoldedText boldText={keyword} basicText={sickname} />
    </main>
  );
};

export default KeywordBlock;
