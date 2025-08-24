import { Link } from "react-router";
import { useColorScheme } from "./hooks/useColorScheme";

export default function App() {
  const { colorScheme } = useColorScheme();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>사용자 디스플레이: {colorScheme}</div>
      <Link to="/interaction-import">인터랙션으로 동적 임포트</Link>
      <Link to="/intersection-observer">Intersection Observer 활용한 동적 임포트</Link>
      <Link to="context">Context API (+useReducer)</Link>
      <Link to="rtl-text">RTL 텍스트</Link>
      <Link to="ab-test">A/B 테스트 (Statsig)</Link>
      <Link to="/counter">카운터</Link>
      <Link to="/generic-component">제네릭 컴포넌트</Link>
    </div>
  );
}
