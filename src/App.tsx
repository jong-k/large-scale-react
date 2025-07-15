import { useState } from "react";

const DUMMY_POST = {
  author: "김종한",
  title: "제목1",
  text: "내용1",
  date: "2025-07-15",
  profileUrl: "https://github.com/jong-k.png",
  numLikes: 4,
  numComments: 5,
  numShares: 6,
};

export default function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [Post, setPost] = useState<any>(null);

  const handleClick = () => {
    import("./components/Post").then((module) => {
      setPost(() => module.default);
    });
  };

  return (
    <div>
      {Post ? (
        <Post post={DUMMY_POST} />
      ) : (
        <button onClick={handleClick}>Post 보기</button>
      )}
    </div>
  );
}
