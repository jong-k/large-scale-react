import { Link } from "react-router";
import { useEffect, useState } from "react";

export default function App() {
  const [colorScheme, setColorScheme] = useState<string>("");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const updateColorScheme = () => {
      setColorScheme(mediaQuery.matches ? "dark" : "light");
    };

    updateColorScheme();
    mediaQuery.addEventListener("change", updateColorScheme);

    return () => mediaQuery.removeEventListener("change", updateColorScheme);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>사용자 디스플레이: {colorScheme}</div>
      <Link to="/interaction-import">인터랙션으로 동적 임포트</Link>
      <Link to="/intersection-observer">
        Intersection Observer 활용한 동적 임포트
      </Link>
      <Link to="context">Context API (+useReducer)</Link>
      <Link to="rtl-text">RTL 텍스트</Link>
    </div>
  );
}
