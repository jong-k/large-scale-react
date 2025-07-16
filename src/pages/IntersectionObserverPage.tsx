import { useState, useRef, Suspense, lazy } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

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

const Post = lazy(() => import("../components/Post"));

export default function IntersectionObserverPage() {
  const [shouldRenderPost, setShouldRenderPost] = useState(false);
  const postRef = useRef<HTMLDivElement>(null);

  const handleIntersect = () => {
    setShouldRenderPost(true);
  };

  useIntersectionObserver(postRef, handleIntersect, {
    threshold: 0.1, // 10% 정도가 뷰포트에 진입했을 때 콜백 실행
  });

  return (
    <div>
      <div
        style={{
          height: "1200px",
          width: "100%",
          border: "1px solid black",
        }}
      >
        아래로 스크롤
      </div>
      <div ref={postRef}>
        {shouldRenderPost ? (
          <Suspense fallback={<div>Loading...</div>}>
            <Post post={DUMMY_POST} />
          </Suspense>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
