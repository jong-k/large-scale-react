import Post from "./components/Post";

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
  return (
    <div>
      <Post post={DUMMY_POST} />
    </div>
  );
}
