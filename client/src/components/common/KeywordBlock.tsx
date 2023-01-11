import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

interface PropType {
  mode: "display" | "basic";
  keyword?: string;
  sickname?: string;
}
// TODO: BOLD 처리
const KeywordBlock = ({ mode, keyword, sickname }: PropType) => {
  return mode === "display" ? (
    <main className="keyword-container">
      <AiOutlineSearch />
      <p>{keyword}</p>
    </main>
  ) : (
    <main className="keyword-container">
      <AiOutlineSearch />
      <p>{sickname}</p>
    </main>
  );
};

export default KeywordBlock;
