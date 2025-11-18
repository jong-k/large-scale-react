import { Link } from "react-router";
import { useColorScheme } from "./hooks/useColorScheme";

export default function App() {
  const { colorScheme } = useColorScheme();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>사용자 디스플레이: {colorScheme}</div>
      <Link to="/interaction-import" style={{ width: "fit-content" }}>
        인터랙션으로 동적 임포트
      </Link>
      <Link to="/intersection-observer" style={{ width: "fit-content" }}>
        Intersection Observer 활용한 동적 임포트
      </Link>
      <Link to="context" style={{ width: "fit-content" }}>
        Context API (+useReducer)
      </Link>
      <Link to="rtl-text" style={{ width: "fit-content" }}>
        RTL 텍스트
      </Link>
      <Link to="ab-test" style={{ width: "fit-content" }}>
        A/B 테스트 (Statsig)
      </Link>
      <Link to="/counter" style={{ width: "fit-content" }}>
        카운터
      </Link>
      <Link to="/generic-component" style={{ width: "fit-content" }}>
        제네릭 컴포넌트
      </Link>
      <Link to="/transition" style={{ width: "fit-content" }}>
        useTransition 테스트
      </Link>
    </div>
  );
}
