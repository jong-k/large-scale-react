import { Link } from "react-router";

export default function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Link to="/interaction-import">인터랙션으로 동적 임포트</Link>
      <Link to="/intersection-observer">
        Intersection Observer 활용한 동적 임포트
      </Link>
    </div>
  );
}
