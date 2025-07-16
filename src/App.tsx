import { useState } from "react";
import type { Post } from "./components/Post";

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
  const [PostComp, setPostComp] = useState<React.ComponentType<{
    post: Post;
  }> | null>(null);

  const handleClick = () => {
    import("./components/Post").then((module) => {
      setPostComp(() => module.default);
    });
  };

  return (
    <div>
      {PostComp ? (
        <PostComp post={DUMMY_POST} />
      ) : (
        <button onClick={handleClick}>Post 보기</button>
      )}
    </div>
  );
}
